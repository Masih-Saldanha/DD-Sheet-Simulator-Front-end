import axios from "axios";
import URL from "./apiUrl";

function signUp(signUpData) {
    return axios.post(`${URL}/signup`, signUpData);
};

function signIn(signInData) {
    return axios.post(`${URL}/signin`, signInData);
};

const authRequest = {
    signUp,
    signIn,
};

export default authRequest;