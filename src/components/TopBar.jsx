import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";

import characterHook from "../hooks/characterHook";
import authService from "../services/authService";
import characterService from "../services/characterService";
import authHook from "../hooks/authHook";

export default function TopBar() {
  const navigate = useNavigate();
  const { signOut, token } = authHook();
  const { characterList, setCharacterList } = characterHook();
  let decodedToken = authService.returnDecodedToken(token);
  if (!decodedToken) decodedToken = { userName: "", userPicture: "" };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [userData, setUserData] = useState({ userName: "", userPicture: "" });
  // console.log("teste");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      setUserData(decodedToken);
      // console.log(token);
      // console.log(decodedToken);
      characterService
        .getUserCharactersList(config)
        .then((response) => {
          setCharacterList(response.data);
          // console.log(response.data);
        })
        .catch((e) => {
          alert(e.response.data.error || e.response.data);
          console.log(e.response.data.error || e.response.data);
        });
    }
  }, []);

  function handleCharacter(e) {
    // console.log(e.target.value);
    navigate(`/char/${e.target.value}`);
  }

  // TODO: FAZER ROTA PARA DADOS
  function handleData(e) {
    // console.log(e.target.value);
    navigate(`/data/${e.target.value}`);
  }

  function handleSignOut(e) {
    // console.log(e.target.value);
    signOut();
    navigate("/");
  }

  return (
    <Menu>
      <h1 onClick={() => navigate("/home")}>New char</h1>
      <select
        onChange={handleCharacter}
        name="Your Characters"
        id="Your Characters"
      >
        <option hidden value="default">
          Your char
        </option>
        {characterList.map((char) => {
          const { id, charName } = char;
          return (
            <option key={id} value={id}>
              {charName}
            </option>
          );
        })}
      </select>

      <select onChange={handleData} name="Data" id="Data">
        <option hidden value="default">
          Data
        </option>
        <option value="races">Races</option>
        <option value="classes">Classes</option>
        <option value="magics">Magics</option>
      </select>

      <section>
        <select onChange={handleSignOut} name="Data" id="Data">
          <option hidden value="default">
            {userData.userName}
          </option>
          <option value="signout">Signout</option>
        </select>
        {/* <h1>{decodedToken.userName}</h1> */}
        {userData.userPicture ? (
          <img src={userData.userPicture} />
        ) : (
          <BiUserCircle color="#FFFFFF" size={50} />
        )}
      </section>
    </Menu>
  );
}

const Menu = styled.menu`
  /* border: 1px solid #ffffff; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  select {
    width: 80px;
    margin-left: 10px;
  }
  section {
    /* border: 1px solid #ffffff; */
    display: flex;
    align-items: center;
    select {
      margin-right: 10px;
    }
  }
`;
