import { createContext, useState } from "react";

export const CharacterContext = createContext();

export function CharacterProvider({ children }) {
    const [characterList, setCharacterList] = useState([{ id: 0, charName: "LOADING..." }]);

    return (
        <CharacterContext.Provider value={{
            characterList,
            setCharacterList,
        }}>
            {children}
        </CharacterContext.Provider>
    );
};