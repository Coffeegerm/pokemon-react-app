import axios from "axios";

export const roledex = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = () => {
  return roledex.get("/posts").then((response) => response.data);
};

export const getSinglePost = (id) =>
  roledex.get(`/posts/${id}`).then((response) => response.data);

export const createPost = ({ title, body }) => {
  return roledex
    .post("/posts", {
      title,
      body,
      userId: 1,
    })
    .then((response) => response.data);
};

export const updatePost = ({ id, body, title }) => {
  return roledex
    .put(`/posts/${id}`, {
      id,
      title,
      body,
      userId: 1,
    })
    .then((response) => response.data);
};
