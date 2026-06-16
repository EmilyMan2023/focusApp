from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from extensions import db
from models.preference import Preference

preferences_bp = Blueprint("preferences", __name__)


@preferences_bp.route("/", methods=["GET"])
@jwt_required()
def get_preferences():
    user_id = int(get_jwt_identity())

    preference = Preference.query.filter_by(user_id=user_id).first()

    if not preference:
        return jsonify({
            "background": "default",
            "ambient_sound": "",
            "sound_volume": 50,
            "pomodoro_minutes": 25,
            "break_minutes": 5
        }), 200

    return jsonify({
        "background": preference.selected_background,
        "ambient_sound": preference.selected_sound,
        "sound_volume": preference.sound_volume,
        "pomodoro_minutes": preference.pomodoro_minutes,
        "break_minutes": preference.break_minutes
    }), 200


@preferences_bp.route("/", methods=["PUT"])
@jwt_required()
def update_preferences():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    preference = Preference.query.filter_by(user_id=user_id).first()

    if not preference:
        preference = Preference(user_id=user_id)
        db.session.add(preference)

    preference.selected_background = data.get("selected_background", preference.selected_background)
    preference.selected_sound = data.get("selected_sound", preference.selected_sound)
    preference.sound_volume = data.get("sound_volume", preference.sound_volume)
    preference.pomodoro_minutes = data.get("pomodoro_minutes", preference.pomodoro_minutes)
    preference.break_minutes = data.get("break_minutes", preference.break_minutes)

    db.session.commit()

    return jsonify({"message": "Preferences updated successfully"}), 200