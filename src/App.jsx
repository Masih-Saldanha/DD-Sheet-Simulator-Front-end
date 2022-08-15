import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CharacterProvider } from "./contexts/CharacterContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import CharSheet from "./pages/CharSheet";

export default function App() {
  return (
    <AuthProvider>
      <CharacterProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<SignIn />}></Route>
            <Route exact path="/signup" element={<SignUp />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
            {/* TODO: CRIAR PAGE QUE RENDERIZA DADOS A PARTIR DO :id */}
            <Route exact path="/char/:id" element={<CharSheet />}></Route>
          </Routes>
        </BrowserRouter>
      </CharacterProvider>
    </AuthProvider>
  );
}
