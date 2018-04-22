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
          <p>
            <label htmlFor="author">Author</label>
            <input type="text" name="author" placeholder="Author" />
          </p>
          <p>
            <label htmlFor="title">Post Title</label>
            <input type="text" name="title" placeholder="Title" />
          </p>
          <p>
            <label htmlFor="postBody">Post</label>
            <input type="text" name="postBody" placeholder="Your post" />
          </p>
          <p>
            <select name="category">
              <option value="value1">Category 1</option>
              <option value="value2">Category 2</option>
              <option value="value3">Category 3</option>
            </select>
          </p>
          <div>
            <button type="submit">Create</button>
            <button type="reset">Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default PostsNew;
