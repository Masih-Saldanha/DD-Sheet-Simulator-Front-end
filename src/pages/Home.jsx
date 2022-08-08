import TopBar from "../components/TopBar";
import characterHook from "../hooks/characterHook";

export default function Home() {
  const { characterList, setCharacterList } = characterHook();

  return (
    <>
      <TopBar></TopBar>
      <h1>Home</h1>
    </>
  );
}
