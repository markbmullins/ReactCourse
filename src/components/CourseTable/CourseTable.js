import React from "react";
import { PropTypes } from "prop-types";
import { course } from "../../propTypes";
import { Link } from "react-router-dom";

function CourseTable({ courses, onClickDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <tr key={course.id}>
            <td>
              <button onClick={event => onClickDelete(course)}>Delete</button>
            </td>
            <td>
              <Link to={"/course/" + course.slug}> {course.title}</Link>
            </td>
            <td>{course.authorId}</td>
            <td>{course.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CourseTable.propTypes = {
  courses: PropTypes.arrayOf(course).isRequired,
  onClickDelete: PropTypes.func.isRequired
};

export default CourseTable;
