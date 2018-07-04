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
              {this.props.categories.map(category => (
                <option key={category.name} value={`${category.name}`}>
                  {category.name}
                </option>
              ))}
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
