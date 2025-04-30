import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import VotePage from "./VotePage";
import ResultPage from "./ResultPage";
import ResultAdminPage from "./ResultAdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/vote" element={<VotePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/result-admin" element={<ResultAdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
