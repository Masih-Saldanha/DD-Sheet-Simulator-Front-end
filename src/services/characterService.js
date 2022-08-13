import axios from "axios";

import authService from "./authService";

function getUserCharactersList() {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/characters/`, authService.config);
};

function createCharacter(characterData) {
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/characters/`, characterData, authService.config)
}

const characterService = {
    getUserCharactersList,
    createCharacter,
};

export default characterService;