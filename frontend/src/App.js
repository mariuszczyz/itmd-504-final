import { useState, useEffect } from "react";
import CourseTable from "./components/CourseTable";
import CourseForm from "./components/CourseForm";

const API = "/api/courses";

function App() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  function fetchCourses() {
    fetch(API)
      .then((res) => res.json())
      .then(setCourses)
      .catch(console.error);
  }

  function openAddModal() {
    setEditingCourse(null);
    setShowModal(true);
  }

  function openEditModal(course) {
    setEditingCourse(course);
    setShowModal(true);
  }

  function handleSave(formData) {
    const isEdit = editingCourse !== null;
    fetch(`${API}${isEdit ? `/${editingCourse.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setShowModal(false);
        fetchCourses();
      })
      .catch(console.error);
  }

  function handleDelete(id) {
    if (!window.confirm("Are you sure?")) return;
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error())))
      .then(fetchCourses)
      .catch(console.error);
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Course Tracker</h1>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={openAddModal}>
          + Add Course
        </button>
      </div>

      <CourseTable
        courses={courses}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {showModal && (
        <CourseForm
          course={editingCourse}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;
