import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import characterService from "../services/characterService";

import TopBar from "../components/TopBar";
import styled from "styled-components";
import APIService from "../services/APIService";
import authHook from "../hooks/authHook";

export default function CharSheet() {
  const { id } = useParams();
  const { token } = authHook();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [characterData, setCharacterData] = useState({
    id: 0,
    charName: "",
    charPicture: "",
    userId: 0,
    statsId: 0,
    raceId: 0,
    backgroundId: 0,
    biosId: 0,
    stats: {
      id: 0,
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    races: {
      id: 0,
      raceName: "",
      raceAPI: "",
    },
    backgrounds: {
      id: 0,
      backgroundName: "",
      backgroundAPI: "",
    },
    bios: {
      id: 0,
      heigth: 0,
      weigth: 0,
      age: 0,
      description: "",
    },
    charactersClasses: [
      {
        id: 0,
        classLevel: 0,
        classId: 0,
        characterId: 0,
        classes: {
          id: 0,
          className: "",
          classAPI: "",
        },
      },
    ],
  });

  const raceAbilityBonus = [
    { ability: "str", bonus: 0 },
    { ability: "dex", bonus: 0 },
    { ability: "con", bonus: 0 },
    { ability: "int", bonus: 0 },
    { ability: "wis", bonus: 0 },
    { ability: "cha", bonus: 0 },
  ];
  const [racialAbilityBonus, setRacialAbilityBonus] =
    useState(raceAbilityBonus);

  const [raceData, setRaceData] = useState({
    languages: [{ name: "" }],
    size: "",
    speed: 0,
    traits: [{ index: "", name: "", url: "" }],
    starting_proficiencies: [{ index: "", name: "", url: "" }],
  });

  const [backgroundData, setBackgroundData] = useState({
    feature: {
      desc: [""],
      name: "",
    },
    starting_equipment: [{ equipment: { index: "", name: "", url: "" } }],
    starting_proficiencies: [{ index: "", name: "", url: "" }],
  });

  const [classesData, setClassesData] = useState([]);

  const [charMaxHP, setCharMaxHP] = useState(0);
  const [charTotalLevel, setCharTotalLevel] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await characterService.getCharacterData(id, config);
        setCharacterData(response.data);

        const { data: raceAPIData } = await APIService.getAPIData(
          response.data.races.raceAPI
        );
        setRaceData(raceAPIData);
        // console.log(raceAPIData);

        const { data: backgroundAPIData } = await APIService.getAPIData(
          response.data.backgrounds.backgroundAPI
        );
        setBackgroundData(backgroundAPIData);
        // console.log(backgroundAPIData);

        raceAPIData.ability_bonuses.forEach((ability) => {
          raceAbilityBonus.forEach((registeredAbility) => {
            if (ability.ability_score.index === registeredAbility.ability) {
              registeredAbility.bonus = ability.bonus;
            }
          });
        });
        setRacialAbilityBonus(raceAbilityBonus);
        // console.log(raceAbilityBonus);

        const classesAPI = [];
        let level = 0;
        response.data.charactersClasses.forEach((actualClass) => {
          classesAPI.push({
            url_API: `${actualClass.classes.classAPI}/levels`,
            classLevel: actualClass.classLevel,
          });
          level += actualClass.classLevel;
          setCharTotalLevel(level);
        });

        classesAPI.forEach(async (actualClass) => {
          for (let i = 1; i <= actualClass.classLevel; i++) {
            const { data: classAPI } = await APIService.getAPIData(
              `${actualClass.url_API}/${i}`
            );
            // console.log(classAPI);
          }
        });
        // console.log(classesAPI);
      } catch (e) {
        alert(e.response.data.error || e.response.data);
        console.log(e.response.data.error || e.response.data);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <TopBar></TopBar>
      <DataBlock>
        <h1>Character General Data:</h1>
        {characterData.charPicture ? (
          <img src={characterData.charPicture} />
        ) : (
          <h1>No Character Picture</h1>
        )}
        <h1>Character Name: {characterData.charName}</h1>
        <h1>Race: {characterData.races.raceName}</h1>
        <h1>Background: {characterData.backgrounds.backgroundName}</h1>

        {characterData.bios.heigth ? (
          <h1>Heigth: {characterData.bios.heigth}</h1>
        ) : (
          <h1>Heigth: Unknown</h1>
        )}
        {characterData.bios.weigth ? (
          <h1>Weigth: {characterData.bios.weigth}</h1>
        ) : (
          <h1>Weigth: Unknown</h1>
        )}
        {characterData.bios.age ? (
          <h1>Age: {characterData.bios.age}</h1>
        ) : (
          <h1>Age: Unknown</h1>
        )}
        {characterData.bios.description ? (
          <h1>Description: {characterData.bios.description}</h1>
        ) : (
          <h1>Description: Unknown</h1>
        )}
      </DataBlock>

      <DataBlock>
        <h1>Languages Known:</h1>
        {raceData.languages.map((language, index) => {
          return <h1 key={index}>- {language.name}</h1>;
        })}
      </DataBlock>

      <DataBlock>
        <h1>Movimentation:</h1>
        <h1>Size: {raceData.size}</h1>
        <h1>Speed: {raceData.speed}</h1>
      </DataBlock>

      <DataBlock>
        <h1>Racial Traits:</h1>
        {raceData.traits.map((trait, index) => {
          return <h1 key={index}>{trait.name}</h1>;
        })}
      </DataBlock>

      <DataBlock>
        <h1>Background Features:</h1>
        <h1>{backgroundData.feature.name}</h1>
        {backgroundData.feature.desc.map((feat, index) => {
          return <h1 key={index}>{feat}</h1>;
        })}
      </DataBlock>

      <DataBlock>
        <h1>Starting Equipments:</h1>
        {backgroundData.starting_equipment.map((equipment, index) => {
          return <h1 key={index}>{equipment.equipment.name}</h1>;
        })}
      </DataBlock>

      <DataBlock>
        <h1>Proficiencies:</h1>
        {raceData.starting_proficiencies.map((proficiency, index) => {
          return <h1 key={index}>{proficiency.name}</h1>;
        })}

        {backgroundData.starting_proficiencies.map((proficiency, index) => {
          return <h1 key={index}>{proficiency.name}</h1>;
        })}
      </DataBlock>

      <DataBlock>
        <h1>Character Classes:</h1>
        {characterData.charactersClasses.map((actualClass, index) => {
          return (
            <h1 key={index}>
              Class Name/Level: {actualClass.classes.className}/
              {actualClass.classLevel}
            </h1>
          );
        })}
      </DataBlock>

      <DataBlock>
        <h1>Character Abilities | Modifiers:</h1>
        <h1>
          Strength: {characterData.stats.strength + racialAbilityBonus[0].bonus}{" "}
          |{" "}
          {Math.floor(
            (characterData.stats.strength + racialAbilityBonus[0].bonus - 10) /
              2
          )}
        </h1>
        <h1>
          Dexterity:{" "}
          {characterData.stats.dexterity + racialAbilityBonus[1].bonus} |{" "}
          {Math.floor(
            (characterData.stats.dexterity + racialAbilityBonus[1].bonus - 10) /
              2
          )}
        </h1>
        <h1>
          Constitution:{" "}
          {characterData.stats.constitution + racialAbilityBonus[2].bonus} |{" "}
          {Math.floor(
            (characterData.stats.constitution +
              racialAbilityBonus[2].bonus -
              10) /
              2
          )}
        </h1>
        <h1>
          Intelligence:{" "}
          {characterData.stats.intelligence + racialAbilityBonus[3].bonus} |{" "}
          {Math.floor(
            (characterData.stats.intelligence +
              racialAbilityBonus[3].bonus -
              10) /
              2
          )}
        </h1>
        <h1>
          Wisdom: {characterData.stats.wisdom + racialAbilityBonus[4].bonus} |{" "}
          {Math.floor(
            (characterData.stats.wisdom + racialAbilityBonus[4].bonus - 10) / 2
          )}
        </h1>
        <h1>
          Charisma: {characterData.stats.charisma + racialAbilityBonus[5].bonus}{" "}
          |{" "}
          {Math.floor(
            (characterData.stats.charisma + racialAbilityBonus[5].bonus - 10) /
              2
          )}
        </h1>
      </DataBlock>

      <DataBlock>
        <h1>Total Level: {charTotalLevel}</h1>
        {/* <h1>Max HP: {charMaxHP}</h1> */}
      </DataBlock>
    </>
  );
}

const DataBlock = styled.section`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: blue;
`;
