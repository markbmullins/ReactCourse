import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../HomePage";
import CoursesPage from "../CoursesPage";
import Nav from "../Nav";
import ManageCoursePage from "../ManageCoursePage";
import PageNotFound from "../PageNotFound/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCourses, deleteCourse, saveCourse } from "../../api/courseApi";

class App extends React.Component {
  state = {
    courses: []
  };

  //IDEA: Do API Calls in Courses Page and Manage Course Page
  //But set courses stae in App component
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

  handleSave = course => {
    saveCourse(course).then(savedCourse => {
      let courses;
      if (course.id) {
        courses = this.state.courses.map(c => {
          //The course that was jusr saved
          if (c.id === course.id) {
            return savedCourse;
          } else {
            return c;
          }
        });
      } else {
        //update state to contain new course
        courses = [...this.state.courses, savedCourse];
      }

      this.setState({ courses });
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route
            path="/courses"
            render={props => (
              <CoursesPage
                {...props}
                courses={this.state.courses}
                onDelete={this.handleDelete}
              />
            )}
          />
          <Route
            path="/course/:slug"
            render={props => (
              <ManageCoursePage
                {...props}
                courses={this.state.courses}
                onSave={this.handleSave}
              />
            )}
          />
          <Route
            path="/course"
            render={props => (
              <ManageCoursePage
                {...props}
                courses={this.state.courses}
                onSave={this.handleSave}
              />
            )}
          />
          <Route path="/404" component={PageNotFound} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer hideProgressBar />
      </div>
    );
  }
}

export default App;
