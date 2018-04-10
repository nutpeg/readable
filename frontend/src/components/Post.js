import React from "react";

const Post = props => {
  const post = props.post;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Post;
