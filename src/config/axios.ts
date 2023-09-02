import axios from "axios";

export default axios.create({
  baseURL: "https://api.football-data.org",
  headers: {
    "x-auth-token": "13fffbefd9064d119b0f6f7f78176bfc",
  },
});
