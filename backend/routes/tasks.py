from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from extensions import db
from models.task import Task

tasks_bp = Blueprint("tasks", __name__)


@tasks_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():
    user_id = int(get_jwt_identity())

    tasks = Task.query.filter_by(user_id=user_id).all()

    return jsonify([
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "completed": task.completed,
            "priority": task.priority,
            "created_at": task.created_at.isoformat() if task.created_at else None
        }
        for task in tasks
    ]), 200


@tasks_bp.route("/", methods=["POST"])
@jwt_required()
def create_task():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    task = Task(
        title=data["title"],
        description=data.get("description"),
        priority=data.get("priority"),
        user_id=user_id
    )

    db.session.add(task)
    db.session.commit()

    return jsonify({
        "message": "Task created successfully",
        "task": {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "completed": task.completed,
            "priority": task.priority,
            "created_at": task.created_at.isoformat() if task.created_at else None
        }
    }), 201


@tasks_bp.route("/<int:task_id>", methods=["PATCH"])
@jwt_required()
def update_task(task_id):
    user_id = int(get_jwt_identity())

    task = Task.query.filter_by(
        id=task_id,
        user_id=user_id
    ).first()

    if not task:
        return jsonify({"message": "Task not found"}), 404

    data = request.get_json()

    if "title" in data:
        task.title = data["title"]

    if "description" in data:
        task.description = data["description"]

    if "completed" in data:
        task.completed = data["completed"]

    if "priority" in data:
        task.priority = data["priority"]

    db.session.commit()

    return jsonify({"message": "Task updated successfully"}), 200


@tasks_bp.route("/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    user_id = int(get_jwt_identity())

    task = Task.query.filter_by(
        id=task_id,
        user_id=user_id
    ).first()

    if not task:
        return jsonify({"message": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully"}), 200