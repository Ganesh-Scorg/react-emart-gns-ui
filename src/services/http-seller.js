import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/emart/product",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Headers": "Content-type",
    "Access-Control-Allow-Methods": "GET, DELETE, POST, PUT"
  }
});