import React from "react";
import Post from "./Post";
import { Link } from "react-router-dom";

const PostsLists = props => {
  return (
    <div className="content">
      <h1>Posts</h1>
      <div>
        <Link to="/posts/new" className="button small">
          New Post
        </Link>
      </div>
      <ul>
        {props.posts.map(post => (
          <li className="post-item" key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsLists;
