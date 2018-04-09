import React, { Component } from "react";
import Post from "./Post";

class PostsLists extends Component {
  render() {
    const posts = this.props.posts;
    return (
      <div className="content">
        <h1>Posts</h1>
        <div>
          <a href="/posts/new" className="button small">
            New Post
          </a>
        </div>
        <ul>{posts.map(post => <Post post={post} />)}</ul>
      </div>
    );
  }
}

export default PostsLists;
