import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInput from "../TextInput";
import { saveCourse } from "../../api/courseApi";

class ManageCoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        id: null,
        title: "",
        category: "",
        slug: "",
        authorId: ""
      },
      errors: {}
    };
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  handleFormChange = event => {
    const course = { ...this.state.course };
    //computed property syntxa
    course[event.target.name] = event.target.value;
    this.setState({ course });
  };

  handleSubmit = event => {
    event.preventDefault();
    const errors = {};
    if (!this.state.course.title) errors.title = "Title is required";
    if (!this.state.course.category) errors.category = "Category is required";
    if (!this.state.course.authorId) errors.authorId = "Author is required";

    if (Object.keys(errors)) {
      this.setState({ errors });
      return;
    }
    debugger;
    saveCourse(this.state.course).then(() => {
      this.props.history.push("/courses");
    });
  };

  render() {
    return (
      <div>
        <h1>ManageCourse</h1>

        <form onSubmit={this.handleSubmit}>
          <TextInput
            label="Title"
            id="title"
            name="title"
            onChange={this.handleFormChange}
            value={this.state.course.title}
            error={this.state.errors.title}
          />
          <TextInput
            label="Category"
            id="category"
            name="category"
            onChange={this.handleFormChange}
            value={this.state.course.category}
            error={this.state.errors.category}
          />
          <TextInput
            label="Author"
            id="author"
            name="authorId"
            onChange={this.handleFormChange}
            value={this.state.course.authorId}
            error={this.state.errors.authorId}
          />
          <button type="submit">Save Course</button>
        </form>
      </div>
    );
  }
}

export default ManageCoursePage;
