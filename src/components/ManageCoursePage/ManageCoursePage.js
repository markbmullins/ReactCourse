import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInput from "../TextInput";

class ManageCoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        id: null,
        title: "",
        category: "",
        slug: null,
        authorId: null
      }
    };
  }

  handleFormChange = event => {
    const course = { ...this.state.course };
    //computed property syntxa
    course[event.target.name] = event.target.value;
    this.setState({ course });
  };

  render() {
    return (
      <div>
        <h1>ManageCourse</h1>

        <form>
          <TextInput
            label="Title"
            id="title"
            name="title"
            onChange={this.handleFormChange}
            value={this.state.course.title}
          />
          <TextInput
            label="Category"
            id="category"
            name="category"
            onChange={this.handleFormChange}
            value={this.state.course.category}
          />
        </form>
      </div>
    );
  }
}

ManageCoursePage.propTypes = {};

export default ManageCoursePage;
