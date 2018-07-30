import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: 'whatever-you-want',
    'Content-Type': 'application/json',
  },
});

export function getCategories() {
  return client
    .get('/categories')
    .then(resp => resp.data.categories)
    .catch(error => console.error(error));
}

export function getInitialData() {
  return Promise.all([getCategories(), getPosts()]).then(
    ([categories, posts]) => ({
      categories,
      posts,
    }),
  );
}

export function getPost(id) {
  return client
    .get(`/posts/${id}`)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
}

export function createPost(post) {
  return client
    .post('/posts', post)
    .then(resp => {
      return resp.data;
    })
    .catch(error => console.log(error));
}

export function deletePost(id) {
  return client.delete(`/posts/${id}`).catch(error => console.log(error));
}

export function editPost(id, post) {
  return client
    .put(`/posts/${id}`, post)
    .then(resp => {
      return resp.data;
    })
    .catch(error => console.log(error));
}

export function getComments(id) {
  return client
    .get(`/posts/${id}/comments`)
    .then(resp => {
      return resp.data;
      // throw new Error('TEST: Comments error!');
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
}

export function getPosts() {
  return client
    .get('/posts')
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
}

export function vote(id, direction) {
  return client
    .post(`/posts/${id}`, {
      option: direction,
    })
    .catch(error => console.error(error));
}

export function commentVote(id, direction) {
  return client
    .post(`/comments/${id}`, {
      option: direction,
    })
    .catch(error => console.error(error));
}

export function createComment(comment) {
  return client
    .post('/comments', comment)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

export function deleteComment(id) {
  return client.delete(`/comments/${id}`).catch(error => {
    console.log(error);
    throw new Error(error);
  });
}
