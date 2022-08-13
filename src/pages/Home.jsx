import { useState } from "react";
import styled from "styled-components";

import TopBar from "../components/TopBar";
import characterHook from "../hooks/characterHook";
import characterService from "../services/characterService";
// import characterHook from "../hooks/characterHook";

export default function Home() {
  const { characterList, setCharacterList } = characterHook();

  const classes = [
    { classId: 1, className: "Barbarian", class: "barbarian" },
    { classId: 2, className: "Bard", class: "bard" },
    { classId: 3, className: "Cleric", class: "cleric" },
    { classId: 4, className: "Druid", class: "druid" },
    { classId: 5, className: "Fighter", class: "fighter" },
    { classId: 6, className: "Monk", class: "monk" },
    { classId: 7, className: "Paladin", class: "paladin" },
    { classId: 8, className: "Ranger", class: "ranger" },
    { classId: 9, className: "Rogue", class: "rogue" },
    { classId: 10, className: "Sorcerer", class: "sorcerer" },
    { classId: 11, className: "Warlock", class: "warlock" },
    { classId: 12, className: "Wizard", class: "wizard" },
  ];
  const races = [
    { raceId: 1, raceName: "Dragonborn" },
    { raceId: 2, raceName: "Dwarf" },
    { raceId: 3, raceName: "Elf" },
    { raceId: 4, raceName: "Gnome" },
    { raceId: 5, raceName: "Half-elf" },
    { raceId: 6, raceName: "Half-orc" },
    { raceId: 7, raceName: "Halfling" },
    { raceId: 8, raceName: "Human" },
    { raceId: 9, raceName: "Tiefling" },
  ];
  const backgrounds = [{ backgroundId: 1, backgroundName: "Acolyte" }];
  const stats = [
    { statsId: 1, statsName: "Strength", stats: "strength" },
    { statsId: 2, statsName: "Dexterity", stats: "dexterity" },
    { statsId: 3, statsName: "Constitution", stats: "constitution" },
    { statsId: 4, statsName: "Intelligence", stats: "intelligence" },
    { statsId: 5, statsName: "Wisdom", stats: "wisdom" },
    { statsId: 6, statsName: "Charisma", stats: "charisma" },
  ];

  const [charNameAndPicture, setCharNameAndPicture] = useState({
    name: "",
    picture: "",
  });
  const [charRace, setCharRace] = useState(races[0]);
  const [charBackgrounds, setCharBackgrounds] = useState(backgrounds[0]);
  const [classLevels, setClassLevels] = useState({
    barbarian: "0",
    bard: "0",
    cleric: "0",
    druid: "0",
    fighter: "0",
    monk: "0",
    paladin: "0",
    ranger: "0",
    rogue: "0",
    sorcerer: "0",
    warlock: "0",
    wizard: "0",
  });
  const [charStats, setCharStats] = useState({
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    charisma: "",
  });
  const [charBios, setCharBios] = useState({
    heigth: "",
    weigth: "",
    age: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  function handleInputs(e, inputType, property) {
    if (inputType === "nameAndPicture") {
      setCharNameAndPicture({
        ...charNameAndPicture,
        [property]: e.target.value,
      });
      // console.log({
      //   ...charNameAndPicture,
      //   [property]: e.target.value,
      // });
    } else if (inputType === "classes") {
      setClassLevels({ ...classLevels, [property]: e.target.value });
      // console.log({ ...classLevels, [property]: e.target.value });
    } else if (inputType === "bios") {
      setCharBios({ ...charBios, [property]: e.target.value });
      // console.log({ ...charBios, [property]: e.target.value });
    } else if (inputType === "stats") {
      setCharStats({ ...charStats, [property]: e.target.value });
      // console.log({ ...charStats, [property]: e.target.value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const newClassList = Object.entries(classLevels);
    const charactersClasses = [];
    for (let i = 0; i < newClassList.length; i++) {
      const element = newClassList[i];
      if (element[1] && parseInt(element[1]) > 0) {
        charactersClasses.push({
          classId: classes[i].classId,
          classLevel: parseInt(element[1]),
        });
      }
    }
    if (charactersClasses.length === 0) {
      alert("You need at least to have one class at level 1");
      setLoading(false);
      return;
    }

    const dataToSend = {
      charName: charNameAndPicture.name,
      charPicture: charNameAndPicture.picture,
      raceId: charRace.raceId,
      backgroundId: charBackgrounds.backgroundId,
      stats: {
        strength: parseInt(charStats.strength),
        dexterity: parseInt(charStats.dexterity),
        constitution: parseInt(charStats.constitution),
        intelligence: parseInt(charStats.intelligence),
        wisdom: parseInt(charStats.wisdom),
        charisma: parseInt(charStats.charisma),
      },
      bios: {
        heigth: parseFloat(charBios.heigth),
        weigth: parseFloat(charBios.weigth),
        age: parseInt(charBios.age),
        description: charBios.description,
      },
      charactersClasses,
    };

    if (!dataToSend.charPicture) {
      delete dataToSend.charPicture;
    }
    if (!dataToSend.bios.heigth) {
      delete dataToSend.bios.heigth;
    }
    if (!dataToSend.bios.weigth) {
      delete dataToSend.bios.weigth;
    }
    if (!dataToSend.bios.age) {
      delete dataToSend.bios.age;
    }
    if (!dataToSend.bios.description) {
      delete dataToSend.bios.description;
    }

    characterService
      .createCharacter(dataToSend)
      .then((response) => {
        setLoading(false);
        setCharacterList([
          ...characterList,
          { id: response.data.id, charName: response.data.charName },
        ]);
        alert("Character created!");
      })
      .catch((e) => {
        setLoading(false);
        alert(e.response.data.error || e.response.data);
      });
  }

  return (
    <>
      <TopBar></TopBar>
      <Main>
        <h1>Welcome to the D&D 5e Character Sheet Simulator</h1>
        <h2>
          Choose your character characteristics or navigate trought the top bar
        </h2>
        <Border>
          <h3>Choose your race: </h3>
          <MenuButtons>
            {races.map((race, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setCharRace(races[index]);
                    // console.log(races[index]);
                  }}
                  disabled={loading}
                >
                  {race.raceName}
                </button>
              );
            })}
          </MenuButtons>
          <h4>Actual choosen race: {charRace.raceName}</h4>
        </Border>
        <Border>
          <h3>Choose your background: </h3>
          <MenuButtons>
            {backgrounds.map((background, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setCharBackgrounds(backgrounds[index]);
                    // console.log(backgrounds[index]);
                  }}
                  disabled={loading}
                >
                  {background.backgroundName}
                </button>
              );
            })}
          </MenuButtons>
          <h4>Actual choosen background: {charBackgrounds.backgroundName}</h4>
        </Border>
        <form onSubmit={handleSubmit}>
          <Border>
            <h3>Write your character data: </h3>
            <MenuInputs>
              <label>
                Name:
                <input
                  type="text"
                  placeholder="Some Name"
                  value={charNameAndPicture.name}
                  onChange={(e) => handleInputs(e, "nameAndPicture", "name")}
                  required
                  disabled={loading}
                />
              </label>
              <label>
                Picture (Opt.):
                <input
                  type="url"
                  placeholder="http://..."
                  value={charNameAndPicture.picture}
                  onChange={(e) => handleInputs(e, "nameAndPicture", "picture")}
                  disabled={loading}
                />
              </label>
              <label>
                Heigth (Opt.):
                <input
                  type="number"
                  placeholder="1.89"
                  value={charBios.heigth}
                  onChange={(e) => handleInputs(e, "bios", "heigth")}
                  disabled={loading}
                />
              </label>
              <label>
                Weigth (Opt.):
                <input
                  type="number"
                  placeholder="63.28"
                  value={charBios.weigth}
                  onChange={(e) => handleInputs(e, "bios", "weigth")}
                  disabled={loading}
                />
              </label>
              <label>
                Age (Opt.):
                <input
                  type="number"
                  placeholder="32"
                  value={charBios.age}
                  onChange={(e) => handleInputs(e, "bios", "age")}
                  disabled={loading}
                />
              </label>
              <label>
                Description (Opt.):
                <input
                  type="text"
                  placeholder="Long hair, brown eyes..."
                  value={charBios.description}
                  onChange={(e) => handleInputs(e, "bios", "description")}
                  disabled={loading}
                />
              </label>
            </MenuInputs>
          </Border>
          <Border>
            <h3>Choose your classes and levels: </h3>
            <MenuInputs>
              {classes.map((charClass, index) => {
                return (
                  <label>
                    {charClass.className}
                    <input
                      key={index}
                      type="number"
                      placeholder="0-20"
                      value={classLevels[charClass.class]}
                      onChange={(e) =>
                        handleInputs(e, "classes", charClass.class)
                      }
                      disabled={loading}
                    ></input>
                  </label>
                );
              })}
            </MenuInputs>
          </Border>
          <Border>
            <h3>Choose your stats: </h3>
            <MenuInputs>
              {stats.map((stat, index) => {
                return (
                  <label>
                    {stat.statsName}
                    <input
                      key={index}
                      type="number"
                      placeholder="0-20"
                      value={classLevels[stat.stats]}
                      onChange={(e) => handleInputs(e, "stats", stat.stats)}
                      required
                      disabled={loading}
                    ></input>
                  </label>
                );
              })}
            </MenuInputs>
          </Border>
          <button type="submit" disabled={loading}>
            Send Character Data
          </button>
        </form>
      </Main>
    </>
  );
}

const Main = styled.main`
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  h1 {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  h2 {
    margin-bottom: 20px;
  }
  h3 {
    color: cyan;
    margin-bottom: 10px;
  }
  h4 {
    color: whitesmoke;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  button {
    margin: 10px;
  }
`;

const Border = styled.div`
  padding-top: 20px;
  border: 1px solid black;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const MenuButtons = styled.menu`
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  button {
    margin: 5px;
  }
`;

const MenuInputs = styled.menu`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: baseline;
  label {
    margin: 5px;
  }
  input {
    margin: 5px;
  }
`;
