import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostsList from './PostsList';
import PostsNav from './PostsNav';
import PostsNew from './PostsNew';
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
          {isLoadingCategories === true ? (
            <nav>
              <CircularProgress />
            </nav>
          ) : (
            <PostsNav categories={categories} />
          )}
          {isLoading === true ? (
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
              <Route
                path="/posts/new"
                render={props => (
                  <PostsNew
                    categories={categories}
                    onCreatePost={onCreatePost}
                  />
                )}
              />
              <Route path="/:category/:id" component={Post} />
              <Route
                path="/:category"
                render={props => (
                  <PostsList
                    {...props}
                    categories={categories}
                    posts={posts.filter(
                      post => post.category === props.match.params.category,
                    )}
                    error={error}
                    onCreatePost={onCreatePost}
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
