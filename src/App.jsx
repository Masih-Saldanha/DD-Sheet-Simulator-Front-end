import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CharacterProvider } from "./contexts/CharacterContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

export default function App() {
  return (
    <AuthProvider>
      <CharacterProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<SignIn />}></Route>
            <Route exact path="/signup" element={<SignUp />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </CharacterProvider>
    </AuthProvider>
  );
}
