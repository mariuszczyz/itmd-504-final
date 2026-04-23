import { useState } from 'react';

function CourseForm({ course, onSave, onClose }) {
  const [form, setForm] = useState(course ? { ...course } : {
    course_number: '',
    course_title: '',
    credit_hours: '',
    semester: '',
    grade: '',
    status: 'Not Started',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...form, credit_hours: parseInt(form.credit_hours, 10) });
  }

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{course ? 'Edit Course' : 'Add Course'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Course Number</label>
                <input
                  name="course_number"
                  className="form-control"
                  value={form.course_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Course Title</label>
                <input
                  name="course_title"
                  className="form-control"
                  value={form.course_title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Credit Hours</label>
                <input
                  name="credit_hours"
                  type="number"
                  min="1"
                  max="6"
                  className="form-control"
                  value={form.credit_hours}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Semester</label>
                <input
                  name="semester"
                  className="form-control"
                  placeholder="e.g. Spring 2026"
                  value={form.semester}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Grade (optional)</label>
                <input
                  name="grade"
                  className="form-control"
                  placeholder="e.g. A, B+"
                  value={form.grade}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" value={form.status} onChange={handleChange}>
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {course ? 'Save Changes' : 'Add Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourseForm;
