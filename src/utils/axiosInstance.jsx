import axios from "axios";

//const axios =require('axios')

const axiosInstance = axios.create({
  baseURL: "http://10.10.73.47:3600",
  timeout: 10000000,
  headers: {
    "Content-Type": "application/json",
    // Accept: "*/*",
    // Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwibmFtZSI6IktlcmltIiwiaWF0IjoxNjE2NDUwNjU3fQ.v8iyHYmwNlKVhLUA7LzxybICB8zzbVjRyXeFZbV7IPw'
  },
});

export default  /*BASE_URL,*/ axiosInstance ;