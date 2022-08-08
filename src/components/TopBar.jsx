import authService from "../services/authService";
import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";

export default function TopBar() {
  let image = authService.decodedToken.userPicture;

  return (
    <Menu>
      <h1>Your Characters</h1>
      <h1>Data</h1>
      <section>
        <h1>{authService.decodedToken.userName}</h1>
        {image ? (
          <img src={image} />
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
