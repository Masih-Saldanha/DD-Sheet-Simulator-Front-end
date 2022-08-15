import axios from "axios";

function getAPIData(APILink) {
    return axios.get(`${APILink}`);
};

const APIService = {
    getAPIData,
};

export default APIService;