import axios from "axios";
import jwt_decode from "jwt-decode";

import { persistedToken } from "../contexts/AuthContext";

const REACT_APP_API_BASE_URL = "https://d-d-sheet-simulator.herokuapp.com"

function signUp(signUpData) {
    return axios.post(`${REACT_APP_API_BASE_URL}/signup`, signUpData);
};

function signIn(signInData) {
    return axios.post(`${REACT_APP_API_BASE_URL}/signin`, signInData);
};

const config = {
    headers: {
        Authorization: `Bearer ${persistedToken}`
    }
};

function returnDecodedToken() {
    if (!persistedToken) {
        return null;
    };
    return jwt_decode(persistedToken);
}

const authService = {
    signUp,
    signIn,
    config,
    returnDecodedToken,
    REACT_APP_API_BASE_URL,
};

export default authService;