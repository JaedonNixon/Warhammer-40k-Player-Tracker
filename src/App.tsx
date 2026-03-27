import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PlayersPage from "./pages/PlayersPage";
import PlayerDetailPage from "./pages/PlayerDetailPage";
import GameHistoryPage from "./pages/GameHistoryPage";
import GameDetailPage from "./pages/GameDetailPage";
import TournamentPage from "./pages/TournamentPage";
import ArmyBuilderPage from "./pages/ArmyBuilderPage";
import FactionsPage from "./pages/FactionsPage";
import UnitDetailPage from "./pages/UnitDetailPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import "./styles/App.css";

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app">
        <div className="app-background" />
        <div style={{ textAlign: "center", color: "#aaa", marginTop: "40vh" }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="app">
      <div className="app-background" />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/players/:id" element={<PlayerDetailPage />} />
          <Route path="/history" element={<GameHistoryPage />} />
          <Route path="/history/:id" element={<GameDetailPage />} />
          <Route path="/tournament" element={<TournamentPage />} />
          <Route path="/army-builder" element={<ArmyBuilderPage />} />
          <Route path="/factions" element={<FactionsPage />} />
          <Route path="/factions/:faction/:unitId" element={<UnitDetailPage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>⚙️ In the grim darkness of the far future, there is only war. ⚙️</p>
        <p className="footer-sub">Ham Tracker © 2026</p>
      </footer>
    </div>
  );
};

export default App;
