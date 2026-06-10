from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timezone

from extensions import db
from models.focus_session import FocusSession

focus_sessions_bp = Blueprint("focus_sessions", __name__)


@focus_sessions_bp.route("/", methods=["POST"])
@jwt_required()
def create_focus_session():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    session = FocusSession(
        duration_minutes=data["duration_minutes"],
        completed=data.get("completed", True),
        end_time=datetime.now(timezone.utc),
        user_id=user_id
    )

    db.session.add(session)
    db.session.commit()

    return jsonify({
        "message": "Focus session saved",
        "session": {
            "id": session.id,
            "duration_minutes": session.duration_minutes,
            "completed": session.completed,
            "start_time": session.start_time.isoformat() if session.start_time else None,
            "end_time": session.end_time.isoformat() if session.end_time else None
        }
    }), 201