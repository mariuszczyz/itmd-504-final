import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app, origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")])

REQUIRED_FIELDS = ["course_number", "course_title", "credit_hours", "semester"]

def get_db():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
    )

@app.route("/api/courses", methods=["GET"])
def get_courses():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM courses ORDER BY id DESC")
        return jsonify(cursor.fetchall()), 200
    finally:
        cursor.close()
        db.close()

@app.route("/api/courses", methods=["POST"])
def add_course():
    data = request.get_json()
    if not all(field in data for field in REQUIRED_FIELDS):
        return jsonify({"error": "Missing required fields"}), 400

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute(
            "INSERT INTO courses (course_number, course_title, credit_hours, semester, grade, status) VALUES (%s, %s, %s, %s, %s, %s)",
            (data["course_number"], data["course_title"], data["credit_hours"], data["semester"],
             data.get("grade", ""), data.get("status", "Not Started")),
        )
        db.commit()
        return jsonify({"id": cursor.lastrowid, "message": "Course added"}), 201
    finally:
        cursor.close()
        db.close()

@app.route("/api/courses/<int:course_id>", methods=["PUT"])
def update_course(course_id):
    data = request.get_json()
    if not all(field in data for field in REQUIRED_FIELDS):
        return jsonify({"error": "Missing required fields"}), 400

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute(
            "UPDATE courses SET course_number=%s, course_title=%s, credit_hours=%s, semester=%s, grade=%s, status=%s WHERE id=%s",
            (data["course_number"], data["course_title"], data["credit_hours"], data["semester"],
             data.get("grade", ""), data.get("status", "Not Started"), course_id),
        )
        db.commit()
        return jsonify({"message": "Course updated"}), 200
    finally:
        cursor.close()
        db.close()

@app.route("/api/courses/<int:course_id>", methods=["DELETE"])
def delete_course(course_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM courses WHERE id=%s", (course_id,))
        db.commit()
        return jsonify({"message": "Course deleted"}), 200
    finally:
        cursor.close()
        db.close()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
