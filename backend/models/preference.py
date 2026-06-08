from extensions import db

class Preference(db.Model):
    __tablename__ = "preferences"

    id = db.Column(db.Integer, primary_key=True)

    pomodoro_minutes = db.Column(db.Integer, default=25)

    break_minutes = db.Column(db.Integer, default=5)

    theme = db.Column(db.String(50), default="dark")

    notifications_enabled = db.Column(db.Boolean, default=True)

    selected_background = db.Column(db.String(100))

    selected_sound = db.Column(db.String(100))

    sound_volume = db.Column(db.Integer, default=50)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        unique=True,
        nullable=False
    )