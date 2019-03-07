import React, { useState, useEffect } from "react";
import CourseTable from "../CourseTable/";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { course } from "../../propTypes";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";

function CoursesPage(props) {
  const [redirectToAddCourse, setRedirectToAddCourse] = useState(false);

  //Empty dependency array means it's only called once
  useEffect(() => {
    // debugger;
    props.dispatch(courseActions.loadCourses());
  }, []);

  function handleClickAddCourse() {
    setRedirectToAddCourse(true);
  }

  return (
    <>
      {redirectToAddCourse && <Redirect to="/course" />}
      <h1>Courses</h1>
      <button onClick={handleClickAddCourse}>Add Course</button>
      {props.courses.length === 0 ? (
        <p>No courses to display.</p>
      ) : (
        <CourseTable courses={props.courses} onClickDelete={props.onDelete} />
      )}
    </>
  );
}

CoursesPage.propTypes = {
  courses: PropTypes.arrayOf(course).isRequired,
  onDelete: PropTypes.func.isRequired
};

//argument state is current state of redux store
//Go into store, pass to component as this.props.courses
function mapStateToProps(state) {
  // debugger;
  return {
    courses: state.courses
  };
}

//Connect this component to redux store and make the
//data we've speccified in mapStateToProps available via props
export default connect(mapStateToProps)(CoursesPage);
