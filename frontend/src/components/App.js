import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostsList from "./PostsList";
import PostsNav from "./PostsNav";

const defaultData = {
  posts: {
    "8xf0y6ziyjabvozdd253nd": {
      id: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1467166872634,
      title: "Udacity is the best place to learn React",
      body: "Everyone says so after all.",
      author: "thingtwo",
      category: "react",
      voteScore: 6,
      deleted: false,
      commentCount: 2,
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: "6ni6ok3ym7mf1p33lnez",
      timestamp: 1468479767190,
      title: "Learn Redux in 10 minutes!",
      body: "Just kidding. It takes more than 10 minutes to learn technology.",
      author: "thingone",
      category: "redux",
      voteScore: -5,
      deleted: false,
      commentCount: 0,
    },
  },
  comments: {
    "894tuq4ut84ut8v4t8wun89g": {
      id: "894tuq4ut84ut8v4t8wun89g",
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1468166872634,
      body: "Hi there! I am a COMMENT.",
      author: "thingtwo",
      voteScore: 6,
      deleted: false,
      parentDeleted: false,
    },
    "8tu4bsun805n8un48ve89": {
      id: "8tu4bsun805n8un48ve89",
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1469479767190,
      body: "Comments. Are. Cool.",
      author: "thingone",
      voteScore: -5,
      deleted: false,
      parentDeleted: false,
    },
  },
  categories: [
    {
      name: "react",
      path: "react",
    },
    {
      name: "redux",
      path: "redux",
    },
    {
      name: "udacity",
      path: "udacity",
    },
  ],
};

function getPosts(obj, category) {
  let posts = [];
  for (const prop in obj) {
    posts.push(obj[prop]);
  }
  return filterPosts(posts, category);
}

function filterPosts(posts, category) {
  if (!category) {
    return posts;
  }
  return posts.filter(post => post.category === category);
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <PostsNav categories={defaultData.categories} />
          <Route
            exact
            path="/"
            render={props => (
              <PostsList
                baseUrl={props.match.url}
                posts={getPosts(defaultData.posts)}
              />
            )}
          />
          <Route
            path="/:category"
            render={props => (
              <PostsList
                baseUrl={props.match.url}
                posts={getPosts(defaultData.posts, props.match.params.category)}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
