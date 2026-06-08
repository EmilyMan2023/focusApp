from extensions import db
from datetime import datetime, timezone

class FocusSession(db.Model):
    __tablename__ = "focus_sessions"

    id = db.Column(db.Integer, primary_key=True)

    duration_minutes = db.Column(db.Integer)

    completed = db.Column(db.Boolean, default=False)

    start_time = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc)
    )

    end_time = db.Column(db.DateTime)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )
