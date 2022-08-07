import axios from "axios";

function signUp(signUpData) {
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`, signUpData);
};

function signIn(signInData) {
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/signin`, signInData);
};

const authRequest = {
    signUp,
    signIn,
};

export default authRequest;