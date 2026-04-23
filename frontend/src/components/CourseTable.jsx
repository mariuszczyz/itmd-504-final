function CourseTable({ courses, onEdit, onDelete }) {
  if (courses.length === 0) {
    return <p className="text-muted">No courses found.</p>;
  }

  return (
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Course #</th>
          <th>Title</th>
          <th>Credits</th>
          <th>Semester</th>
          <th>Grade</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td>{course.course_number}</td>
            <td>{course.course_title}</td>
            <td>{course.credit_hours}</td>
            <td>{course.semester}</td>
            <td>{course.grade || '—'}</td>
            <td>{course.status || 'Not Started'}</td>
            <td>
              <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(course)}>
                Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(course.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CourseTable;
