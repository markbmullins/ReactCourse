import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../HomePage";
import CoursesPage from "../CoursesPage";
import Nav from "../Nav";
import ManageCoursePage from "../ManageCoursePage";
import PageNotFound from "../PageNotFound/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCourses, deleteCourse } from "../../api/courseApi";

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
    //update state to contain new course
    const courses = [...this.state.courses, course];
    this.setState({ courses });
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
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer hideProgressBar />
      </div>
    );
  }
}

export default App;
