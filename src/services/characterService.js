import axios from "axios";

import authService from "./authService";

function getUserCharactersList(config) {
    return axios.get(`${authService.REACT_APP_API_BASE_URL}/characters/`, config);
};

function createCharacter(characterData, config) {
    return axios.post(`${authService.REACT_APP_API_BASE_URL}/characters/`, characterData, config)
};

function getCharacterData(charId, config) {
    return axios.get(`${authService.REACT_APP_API_BASE_URL}/characters/${charId}`, config);
};

const characterService = {
    getUserCharactersList,
    createCharacter,
    getCharacterData,
};

export default characterService;