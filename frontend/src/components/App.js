import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostsList from "./PostsList";
import PostsNav from "./PostsNav";
import PostsNew from "./PostsNew";
// import * as API from "../utils/api";
import { fetchCategories } from "../actions/categories";
import { fetchPosts } from "../actions/posts";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchPosts());
  }
  render() {
    const {
      posts,
      categories,
      isLoadingCategories,
      isLoadingPosts,
    } = this.props;
    return (
      <Router>
        <div className="main">
          {isLoadingCategories === true ? (
            <nav>Loading...</nav>
          ) : (
            <PostsNav categories={categories} />
          )}
          {isLoadingPosts === true ? (
            <div className="content">Loading...</div>
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                render={props => <PostsList {...props} posts={posts} />}
              />
              <Route path="/posts/new" component={PostsNew} />
              <Route
                path="/:category"
                render={props => (
                  <PostsList
                    {...props}
                    posts={posts.filter(
                      post => post.category === props.match.params.category,
                    )}
                  />
                )}
              />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    isLoadingCategories: state.categories.isLoadingCategories,
    posts: state.posts.posts,
    isLoadingPosts: state.posts.isLoadingPosts,
  };
}

export default connect(mapStateToProps)(App);
