import axios from "axios";
import jwt_decode from "jwt-decode";

import { persistedToken } from "../contexts/AuthContext";

function signUp(signUpData) {
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`, signUpData);
};

function signIn(signInData) {
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/signin`, signInData);
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
};

export default authService;