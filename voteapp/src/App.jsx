import React, { useState } from "react";
import LoginPage from "./LoginPage";
import VotePage from "./VotePage";
import ResultPage from "./ResultPage";

function App() {
  const [user, setUser] = useState(null);
  const [showResults, setShowResults] = useState(false);

  if (showResults) return <ResultPage onBack={() => setShowResults(false)} />;
  if (!user) return <LoginPage onSuccess={setUser} onShowResults={() => setShowResults(true)} />;
  return <VotePage user={user} onLogout={() => setUser(null)} />;
}

export default App;
