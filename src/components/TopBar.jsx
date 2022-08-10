import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";

import characterHook from "../hooks/characterHook";
import authService from "../services/authService";
import characterService from "../services/characterService";

export default function TopBar() {
  const navigate = useNavigate();
  const { characterList, setCharacterList } = characterHook();
  let decodedToken = authService.returnDecodedToken();

  useEffect(() => {
    characterService
      .getUserCharactersList()
      .then((response) => {
        setCharacterList(response.data);
      })
      .catch((e) => {
        alert(e.response.data.error || e.response.data);
        console.log("deu ruim");
      });
  }, []);

  function handleOption(e) {
    console.log(e.target.value);
    navigate(`/char/${e.target.value}`);
  }

  return (
    <Menu>
      <select
        onChange={handleOption}
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
      <h1>Data</h1>
      <section>
        <h1>{decodedToken.userName}</h1>
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
