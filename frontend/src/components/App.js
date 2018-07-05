import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostsList from './PostsList';
import PostsNav from './PostsNav';
import PostsNew from './PostsNew';
// import * as API from "../utils/api";
import { fetchCategories } from '../actions/categories';
import { fetchPosts, vote, sortPosts } from '../actions/posts';

class App extends Component {
  componentDidMount() {
    this.props.fetchAllCategories();
    this.props.fetchAllPosts(this.props.sortOrder);
    // this.props.onSortPosts(this.props.sortOrder);
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
                  />
                )}
              />
              <Route
                path="/posts/new"
                render={props => <PostsNew categories={categories} />}
              />
              <Route
                path="/:category"
                render={props => (
                  <PostsList
                    {...props}
                    posts={posts.filter(
                      post => post.category === props.match.params.category,
                    )}
                    sortPosts={onSortPosts}
                    sortOrder={sortOrder}
                    onDownVote={onDownVote}
                    onUpVote={onUpVote}
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
  fetchAllPosts(sortByValue) {
    dispatch(fetchPosts(sortByValue));
  },
  fetchAllCategories() {
    dispatch(fetchCategories());
  },
  onSortPosts(sortOrder) {
    dispatch(sortPosts(sortOrder));
  },
});

const mapStateToProps = state => ({
  categories: state.categories.categories,
  isLoadingCategories: state.categories.isLoadingCategories,
  posts: state.posts.posts,
  isLoadingPosts: state.posts.isLoadingPosts,
  sortOrder: state.posts.sortOrder,
  // sortPosts: this.sortPosts,
  // onDownVote: this.props.onDownVote,
  // onUpVote: this.props.onUpVote
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
