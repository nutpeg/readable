import axios from "axios";

const API_BASE_URL = "http://localhost:3001";
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: "whatever-you-want",
    "Content-Type": "application/json",
  },
});

export function getCategories() {
  return client
    .get("/categories")
    .then(resp => resp.data.categories)
    .catch(error => console.error(error));
}

export function getPosts() {
  return client
    .get("/posts")
    .then(resp => {
      console.log("Posts: ", resp);
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
