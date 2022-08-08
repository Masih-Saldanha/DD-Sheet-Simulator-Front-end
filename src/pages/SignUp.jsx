import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import authService from "../services/authService";

export default function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    userPicture: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [loading, setLoading] = useState(false);

  function handleInputs(e, property) {
    setUserData({ ...userData, [property]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let metaUserData = {...userData};
    if (userData.userPicture.length < 1) {
        delete metaUserData.userPicture
    }
    authService
      .signUp(metaUserData)
      .then((response) => {
        alert("Account Created");
        setLoading(false);
        navigate("/");
      })
      .catch((e) => {
        alert(e.response.data);
        setLoading(false);
      });
  }

  return (
    <Container>
      <Title>
        <h1>DD Sheet Simulator</h1>
        <p>Sign Up Screen</p>
      </Title>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          value={userData.userName}
          onChange={(e) => handleInputs(e, "userName")}
          required
          disabled={loading}
        />
        <input
          type="url"
          placeholder="http://example.com/example.jpg"
          value={userData.userPicture}
          onChange={(e) => handleInputs(e, "userPicture")}
          disabled={loading}
        />
        <input
          type="email"
          placeholder="example@email.com"
          value={userData.email}
          onChange={(e) => handleInputs(e, "email")}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="abc123..."
          value={userData.password}
          onChange={(e) => handleInputs(e, "password")}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="abc123..."
          value={userData.repeatPassword}
          onChange={(e) => handleInputs(e, "repeatPassword")}
          required
          disabled={loading}
        />
        <button disabled={loading}>Sign Up</button>
        <p onClick={() => navigate("/")}>
          Already registered? Click here and Sign In
        </p>
      </form>
    </Container>
  );
}

const Container = styled.section`
  display: flex;

  form {
    width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input {
    width: 80%;
    height: 65px;
    background: #ffffff;
    border-radius: 6px;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #9f9f9f;
    padding-left: 10px;
    margin-bottom: 13px;
  }

  button {
    width: 80%;
    height: 65px;
    background: #1877f2;
    border-radius: 6px;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
    margin-bottom: 14px;
  }

  form p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #ffffff;
  }

  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;

    form {
      margin-top: 40px;
      width: 100%;
    }

    input {
      width: 330px;
      height: 55px;
    }

    button {
      width: 330px;
      height: 55px;
    }

    form p {
      font-size: 17px;
      line-height: 20px;
    }
  }
`;

const Title = styled.div`
  background-color: #151515;
  color: #ffffff;
  width: 60vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding-left: 144px;

  h1 {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
  }

  p {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }

  @media only screen and (max-width: 800px) {
    justify-content: start;
    height: fit-content;
    width: 100vw;
    padding-left: 0;
    text-align: center;
    padding-bottom: 27px;
    h1 {
      font-size: 76px;
      margin-bottom: -25px;
    }
    p {
      font-size: 23px;
      line-height: 32px;
    }
  }
`;
