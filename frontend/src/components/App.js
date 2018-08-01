import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostsList from './PostsList';
import PostsNav from './PostsNav';
import NoMatch from './NoMatch';
import Post from './Post';
import { fetchCategories } from '../actions/categories';
import { fetchPosts, createPost } from '../actions/posts';
import { getSortedPosts } from '../reducers/posts';
import { getCapitalizedCategories } from '../reducers/categories';

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
      isLoading,
      onCreatePost,
      error,
    } = this.props;
    return (
      <Router>
        <div className="main">
          {isLoadingCategories ? (
            <nav>
              <CircularProgress />
            </nav>
          ) : (
            <PostsNav categories={categories} />
          )}
          {isLoading ? (
            <div className="content">
              <CircularProgress />
            </div>
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <PostsList
                    {...props}
                    categories={categories}
                    posts={posts}
                    error={error}
                    onCreatePost={onCreatePost}
                  />
                )}
              />
              <Route path="/:category/:id" component={Post} />
              <Route path="/pageNotFound" component={NoMatch} />
              <Route
                path="/:category"
                render={props => (
                  <PostsList
                    {...props}
                    category={props.match.params.category}
                    categories={categories}
                    posts={posts.filter(
                      post => post.category === props.match.params.category,
                    )}
                    error={error}
                    onCreatePost={onCreatePost}
                  />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllPosts() {
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
  categories: getCapitalizedCategories(state.categories.categories),
  isLoadingCategories: state.categories.isLoadingCategories,
  posts: getSortedPosts(state.posts.posts, state.posts.sortOrder),
  isLoadingPosts: state.posts.isLoadingPosts,
  error: state.posts.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
