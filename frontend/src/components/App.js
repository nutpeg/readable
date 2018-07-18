import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostsList from './PostsList';
import PostsNav from './PostsNav';
import PostsNew from './PostsNew';
import { fetchCategories } from '../actions/categories';
import {
  fetchPosts,
  createPost,
} from '../actions/posts';
import { getSortedPosts } from '../reducers/posts'

class App extends Component {
  componentDidMount() {
    this.props.fetchAllCategories();
    this.props.fetchAllPosts();
  }

  render() {
    const {
      posts,
      categories,
      isLoadingCategories,
      isLoadingPosts,
      onCreatePost,
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
                render={props => (
                  <PostsList
                    {...props}
                    posts={posts}
                  />
                )}
              />
              <Route
                path="/posts/new"
                render={props => (
                  <PostsNew
                    categories={categories}
                    onCreatePost={onCreatePost}
                  />
                )}
              />
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

const mapDispatchToProps = dispatch => ({
  fetchAllPosts(sortOrder) {
    dispatch(fetchPosts());
  },
  fetchAllCategories() {
    dispatch(fetchCategories());
  },
  onCreatePost(post) {
    dispatch(createPost(post));
  },
});

const mapStateToProps = state => ({
  categories: state.categories.categories,
  isLoadingCategories: state.categories.isLoadingCategories,
  posts: getSortedPosts(state.posts.posts, state.posts.sortOrder),
  isLoadingPosts: state.posts.isLoadingPosts,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
