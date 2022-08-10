import axios from "axios";

import authService from "./authService";

function getUserCharactersList() {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/characters/`, authService.config);
};

const characterService = {
    getUserCharactersList,
};

export default characterService;