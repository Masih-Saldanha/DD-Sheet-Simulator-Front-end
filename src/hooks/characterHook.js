import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";


export default function characterHook() {
    const characterContext = useContext(CharacterContext);
    if (!characterContext) {
        throw new Error("characterHook must be used inside a CharacterContext Provider");
    };

    return characterContext;
};