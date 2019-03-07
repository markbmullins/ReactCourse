import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

// Action creator
function loadCoursesSuccess(courses) {
  // Action
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

function updateCourseSucess(course) {
  // Action
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

function createCourseSuccess(course) {
  // Action
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

//Thunk:
export function loadCourses() {
  return function(dispatch) {
    return courseApi.getCourses().then(courses => {
      //   debugger;
      dispatch(loadCoursesSuccess(courses));
    });
  };
}

//Thunk:
export function saveCourse(course) {
  return function(dispatch) {
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id
        ? dispatch(updateCourseSucess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    });
  };
}

//Thunk:
export function deleteCourse(course) {
  return function(dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  }; //TODO:  handle errors
}
