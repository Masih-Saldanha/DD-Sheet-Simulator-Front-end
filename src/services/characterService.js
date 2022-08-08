import axios from "axios";

import authService from "./authService";

function getUserCharactersList() {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/character/${authService.decodedToken.id}`, authService.config);
};

const characterService = {
    getUserCharactersList,
};

export default characterService;