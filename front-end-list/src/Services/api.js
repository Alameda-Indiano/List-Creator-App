import axios from "axios";

export default axios.create({
    baseURL: "https://project-list-back-end.herokuapp.com"
});