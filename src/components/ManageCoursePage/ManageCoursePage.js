import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInput from "../TextInput";
import { saveCourse } from "../../api/courseApi";

class ManageCoursePage extends Component {
  state = {
    course: {
      id: null,
      title: "",
      category: "",
      slug: "",
      authorId: ""
    },
    errors: {}
  };

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  handleChange = event => {
    const course = { ...this.state.course };
    // computed property syntax
    course[event.target.name] = event.target.value;
    this.setState({ course });
  };

  handleSubmit = event => {
    const { course } = this.state;
    event.preventDefault();
    const errors = {};

    if (!course.title) errors.title = "Title is required.";
    if (!course.category) errors.category = "Category is required.";
    if (!course.authorId || isNaN(course.authorId))
      errors.authorId = "Author is required and must be a number.";

    // Is there at least one property on the errors object? If so, validation failed.
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const newCourse = {
      ...course,
      authorId: parseInt(course.authorId, 10)
    };
    saveCourse(newCourse).then(() => {
      this.props.history.push("/courses");
    });
  };

  render() {
    const { course, errors } = this.state;
    return (
      <div>
        <h1>Manage Course</h1>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            label="Title"
            id="title"
            name="title"
            onChange={this.handleChange}
            value={course.title}
            error={errors.title}
          />

          <TextInput
            label="Category"
            id="category"
            name="category"
            onChange={this.handleChange}
            value={course.category}
            error={errors.category}
          />

          <TextInput
            label="Author"
            id="author"
            name="authorId"
            onChange={this.handleChange}
            value={course.authorId}
            error={errors.authorId}
          />

          <button type="submit">Save Course</button>
        </form>
      </div>
    );
  }
}

export default ManageCoursePage;
