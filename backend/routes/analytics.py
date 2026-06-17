from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import date, timedelta

from models.focus_session import FocusSession

analytics_bp = Blueprint("analytics", __name__)


@analytics_bp.route("/streak", methods=["GET"])
@jwt_required()
def get_streak():
    user_id = int(get_jwt_identity())

    sessions = FocusSession.query.filter_by(
        user_id=user_id,
        completed=True
    ).all()

    focus_dates = {
        session.end_time.date()
        for session in sessions
        if session.end_time
    }

    today = date.today()
    streak = 0
    current_day = today

    while current_day in focus_dates:
        streak += 1
        current_day -= timedelta(days=1)

    print("Sessions found:", len(sessions))

    for s in sessions:
            print(
                s.id,
                s.completed,
                s.end_time
            )

    return jsonify({
        "current_streak": streak,
        "completed_today": today in focus_dates
    }), 200