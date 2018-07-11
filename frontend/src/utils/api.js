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

export function getPosts() {
  return client
    .get('/posts')
    .then(resp => {
      return resp.data;
    })
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

export function vote(id, direction) {
  return client
    .post(`/posts/${id}`, {
      option: direction,
    })
    .catch(error => console.error(error));
}

export function deletePost(id) {
  return client.delete(`/posts/${id}`).catch(error => console.log(error));
}

export function createPost(post) {
  return client
    .post('/posts', post)
    .then(resp => {
      return resp.data;
    })
    .catch(error => console.log(error));
}
