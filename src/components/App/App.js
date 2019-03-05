import React from "react";
import { Route } from "react-router-dom";
import HomePage from "../HomePage";
import CoursesPage from "../CoursesPage";
import Nav from "../Nav";
import ManageCoursePage from "../ManageCoursePage";

const App = () => {
  return (
    <div>
      <Nav />
      <Route path="/" component={HomePage} exact />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/course" component={ManageCoursePage} />
    </div>
  );
};

export default App;
