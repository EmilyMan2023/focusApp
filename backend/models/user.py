from extensions import db
from datetime import datetime, timezone

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(255), unique=True, nullable=False)

    password_hash = db.Column(db.String(255), nullable=False)

    display_name = db.Column(db.String(100), nullable=False)

    created_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc)
    )

    tasks = db.relationship("Task", backref="user", lazy=True)
    focus_sessions = db.relationship("FocusSession", backref="user", lazy=True)
    preference = db.relationship("Preference", backref="user", uselist=False)