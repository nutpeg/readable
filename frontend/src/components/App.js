import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostsList from './PostsList';
import PostsNav from './PostsNav';
import PostsNew from './PostsNew';
// import * as API from "../utils/api";
import { fetchCategories } from '../actions/categories';
import {
  fetchPosts,
  vote,
  sortPosts,
  deletePost,
  // editPost,
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
      onDownVote,
      onUpVote,
      onSortPosts,
      sortOrder,
      onDeletePost,
      onEditPost,
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
                    onSortPosts={onSortPosts}
                    sortOrder={sortOrder}
                    onDownVote={onDownVote}
                    onUpVote={onUpVote}
                    onDeletePost={onDeletePost}
                    onEditPost={onEditPost}
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
                    onSortPosts={onSortPosts}
                    sortOrder={sortOrder}
                    onDownVote={onDownVote}
                    onUpVote={onUpVote}
                    onDeletePost={onDeletePost}
                    onEditPost={onEditPost}
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
  onUpVote(id) {
    dispatch(vote(id, 'upVote'));
  },
  onDownVote(id) {
    dispatch(vote(id, 'downVote'));
  },
  fetchAllPosts(sortOrder) {
    dispatch(fetchPosts());
  },
  fetchAllCategories() {
    dispatch(fetchCategories());
  },
  onSortPosts(sortOrder) {
    dispatch(sortPosts(sortOrder));
  },
  onDeletePost(id) {
    dispatch(deletePost(id));
  },
  // onEditPost(post) {
  //   dispatch(editPost(post));
  // },
  onCreatePost(post) {
    dispatch(createPost(post));
  },
});

const mapStateToProps = state => ({
  categories: state.categories.categories,
  isLoadingCategories: state.categories.isLoadingCategories,
  posts: getSortedPosts(state.posts.posts.slice(), state.posts.sortOrder),
  isLoadingPosts: state.posts.isLoadingPosts,
  sortOrder: state.posts.sortOrder,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
