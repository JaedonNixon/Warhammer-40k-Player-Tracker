import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PlayersPage from "./pages/PlayersPage";
import PlayerDetailPage from "./pages/PlayerDetailPage";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app-background" />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/players/:id" element={<PlayerDetailPage />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>⚙️ In the grim darkness of the far future, there is only war. ⚙️</p>
        <p className="footer-sub">Warhammer 40K Game Tracker © 2026</p>
      </footer>
    </div>
  );
};

export default App;
