import axios from "axios";

import authService from "./authService";

function getUserCharactersList() {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/characters/`, authService.config);
};

function createCharacter(characterData) {
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/characters/`, characterData, authService.config)
};

function getCharacterData(charId) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/characters/${charId}`, authService.config);
};

const characterService = {
    getUserCharactersList,
    createCharacter,
    getCharacterData,
};

export default characterService;