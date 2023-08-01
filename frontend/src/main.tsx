import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu.tsx";
import Topics from "./pages/Topics.tsx";
import Forum from "./pages/Forum.tsx";
import Levels from "./pages/Levels.tsx";
import Wiki from "./pages/Wiki.tsx";
import Game from "./pages/Game.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import CustomPuzzles from "./pages/CustomPuzzles.tsx";
import OnlineGame from "./pages/OnlineGame.tsx";
import { RequiresAuth } from "./components/Auth.tsx";
import Nav from "./components/Navbar.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <RequiresAuth>
                <Menu />
              </RequiresAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="topics"
            element={
              <RequiresAuth>
                <Topics />
              </RequiresAuth>
            }
          />
          <Route
            path="forum"
            element={
              <RequiresAuth>
                <Nav />
                <Forum />
              </RequiresAuth>
            }
          />
          <Route
            path="levels"
            element={
              <RequiresAuth>
                <Levels />
              </RequiresAuth>
            }
          />
          <Route
            path="wiki"
            element={
              <RequiresAuth>
                <Nav />
                <Wiki />
              </RequiresAuth>
            }
          />
          <Route
            path="game/:topic/:task"
            element={
              <RequiresAuth>
                <Game />
              </RequiresAuth>
            }
          />
          <Route
            path="online-game"
            element={
              <RequiresAuth>
                <Nav />
                <OnlineGame />
              </RequiresAuth>
            }
          />
          <Route
            path="custom-puzzles"
            element={
              <RequiresAuth>
                <Nav />
                <CustomPuzzles />
              </RequiresAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
