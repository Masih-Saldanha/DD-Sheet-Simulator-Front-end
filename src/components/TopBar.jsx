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
  let decodedToken = authService.returnDecodedToken();
  if (!decodedToken) decodedToken = { userName: "", userPicture: "" };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      characterService
        .getUserCharactersList()
        .then((response) => {
          setCharacterList(response.data);
        })
        .catch((e) => {
          alert(e.response.data.error || e.response.data);
          console.log("deu ruim");
        });
    }
  }, []);

  function handleCharacter(e) {
    console.log(e.target.value);
    navigate(`/char/${e.target.value}`);
  }

  // TODO: FAZER ROTA PARA DADOS
  function handleData(e) {
    console.log(e.target.value);
    navigate(`/data/${e.target.value}`);
  }

  function handleSignOut(e) {
    console.log(e.target.value);
    signOut();
    navigate("/");
  }

  return (
    <Menu>
      <select
        onChange={handleCharacter}
        name="Your Characters"
        id="Your Characters"
      >
        <option hidden value="default">
          Your Characters
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
            {decodedToken.userName}
          </option>
          <option value="signout">Signout</option>
        </select>
        {/* <h1>{decodedToken.userName}</h1> */}
        {decodedToken.userPicture ? (
          <img src={decodedToken.userPicture} />
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
  section {
    /* border: 1px solid #ffffff; */
    display: flex;
    align-items: center;
    h1 {
      padding-right: 10px;
    }
  }
`;
