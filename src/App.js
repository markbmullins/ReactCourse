import React from "react";
import { getCourses, deleteCourse } from "./api/courseApi";
import CourseTable from "./CourseTable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
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
  render() {
    return (
      <>
        <h1>App</h1>
        <h2>Courses</h2>
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

export default App;
