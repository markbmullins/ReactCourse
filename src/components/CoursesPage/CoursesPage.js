import React from "react";
import CourseTable from "../CourseTable/";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { course } from "../../propTypes";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToAddCourse: false
    };
    //bind in constructor
    //this.handleDelete = this.handleDelete.bind(this);
  }

  handleClickAddCourse = () => {
    this.setState({ redirectToAddCourse: true });
  };
  render() {
    return (
      <>
        {this.state.redirectToAddCourse && <Redirect to="/course" />}
        <h1>Courses</h1>
        <button onClick={this.handleClickAddCourse}>Add Course</button>
        {this.props.courses.length === 0 ? (
          <p>No courses to display.</p>
        ) : (
          <CourseTable
            courses={this.props.courses}
            onClickDelete={this.props.onDelete}
          />
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.arrayOf(course).isRequired,
  onDelete: PropTypes.func.isRequired
};
export default CoursesPage;
