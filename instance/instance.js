import axios from "axios";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://employ-management-system.vercel.app";
const instance = axios.create({
  baseURL: baseUrl,
});

export { instance };

