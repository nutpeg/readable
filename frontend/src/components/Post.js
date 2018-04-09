import React, { Component } from "react";

class Post extends Component {
  render() {
    const post = this.props.post;
    return (
      <li className="post-item" key={post.id}>
        <h4>{post.title}</h4>
        <p>{post.author}</p>
        <div className="post-item--footer">
          <div className="post-item--footer-comments">
            <span>{post.commentCount}</span>
          </div>
          <div className="post-item--footer-votes">
            <button className="button small">+</button>
            <span className="votes">{post.voteScore}</span>
            <button className="button small">-</button>
          </div>
          <div className="post-item--footer-controls">
            <button className="button small">edit</button>
            <button className="button small">delete</button>
          </div>
        </div>
      </li>
    );
  }
}

export default Post;
