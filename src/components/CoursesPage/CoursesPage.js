import React from "react";
import { getCourses, deleteCourse } from "../../api/courseApi";
import CourseTable from "../CourseTable/";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      redirectToAddCourse: false
    };
    //bind in constructor
    //this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    getCourses().then(courses => {
      this.setState({ courses });
    });
  }
  handleDelete = courseId => {
    deleteCourse(courseId).then(() => {
      const courses = this.state.courses.filter(
        course => course.id !== courseId
      );
      this.setState({ courses });
    });
  };
  handleClickAddCourse = () => {
    this.setState({ redirectToAddCourse: true });
  };
  render() {
    return (
      <>
        {this.state.redirectToAddCourse && <Redirect to="/course" />}
        <h1>Courses</h1>
        <button onClick={this.handleClickAddCourse}>Add Course</button>
        {this.state.courses.length === 0 ? (
          <p>No courses to display.</p>
        ) : (
          <CourseTable
            courses={this.state.courses}
            onClickDelete={this.handleDelete}
          />
        )}
      </>
    );
  }
}

export default CoursesPage;
