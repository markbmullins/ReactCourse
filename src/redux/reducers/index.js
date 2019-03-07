import { combineReducers } from "redux";
import courses from "./courseReducer";

const rootReducer = combineReducers({
  //This property name determine how you access
  //the data in mapStateToProps & the object name in the redux store
  courses: courses
});

export default rootReducer;
