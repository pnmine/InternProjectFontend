import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5104/api", // URL ของ API ของคุณ
});

export default axios;