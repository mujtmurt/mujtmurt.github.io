import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-create.firebaseio.com/",
});

export default instance;
