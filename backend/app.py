# from flask import Flask
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# @app.route("/")
# def home():
#     return {"message": "Backend is running"}

# @app.route("/api/test")
# def test():
#     return {"message": "Hello from Flask"}

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, migrate, jwt

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db.init_app(app)
migrate.init_app(app, db)
jwt.init_app(app)

from models.user import User
from models.task import Task
from models.preference import Preference
from models.focus_session import FocusSession

from routes.auth import auth_bp
from routes.tasks import tasks_bp
from routes.focus_sessions import focus_sessions_bp
from routes.preferences import preferences_bp
from routes.analytics import analytics_bp

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(tasks_bp, url_prefix="/api/tasks")
app.register_blueprint(
    focus_sessions_bp,
    url_prefix="/api/focus-sessions"
)
app.register_blueprint(
    preferences_bp,
    url_prefix="/api/preferences"
)

app.register_blueprint(
    analytics_bp,
    url_prefix="/api/analytics"
)

@app.route("/api/test")
def test():
    return {"message": "Backend connected to PostgreSQL setup"}

if __name__ == "__main__":
    app.run(debug=True)