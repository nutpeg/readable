import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostsList from "./PostsList";
import PostsNav from "./PostsNav";
import PostsNew from "./PostsNew";
import * as API from "../utils/api";

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
  componentDidMount() {
    API.getInitialData();
  }
  render() {
    return (
      <Router>
        <div className="main">
          <PostsNav categories={this.props.categories} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <PostsList {...props} posts={getPosts(this.props.posts)} />
              )}
            />
            <Route path="/posts/new" component={PostsNew} />
            <Route
              path="/:category"
              render={props => (
                <PostsList
                  {...props}
                  posts={getPosts(
                    this.props.posts,
                    props.match.params.category,
                  )}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts: state.posts,
  };
}
export default connect(mapStateToProps)(App);
