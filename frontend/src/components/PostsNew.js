import React, { Component } from "react";

class PostsNew extends Component {
  state = {
    title: "",
    author: "",
    body: "",
    category: "",
  };
  render() {
    return (
      <div className="content">
        <h1>New Post</h1>
        <form action="">
          <div>
            <input type="text" name="title" placeholder="Title" />
          </div>
          <div>
            <input type="text" name="author" placeholder="Author" />
          </div>
          <div>
            <input type="text" name="postBody" placeholder="Your post" />
          </div>
          <select name="category">
            <option value="value1">Category 1</option>
            <option value="value2">Category 2</option>
            <option value="value3">Category 3</option>
          </select>
          <button type="submit">Create</button>
          <button type="reset">Cancel</button>
        </form>
      </div>
    );
  }
}

export default PostsNew;
