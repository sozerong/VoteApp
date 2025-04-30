import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import VotePage from "./VotePage";
import ResultPage from "./ResultPage";
import ResultAdminPage from "./ResultAdminPage";

function App() {
  const [user, setUser] = useState(null); // ✅ 로그인한 사용자 정보

  return (
    <Router>
      <Routes>
        {/* ✅ 로그인 → onSuccess를 통해 user 설정 */}
        <Route path="/" element={<LoginPage onSuccess={setUser} />} />

        {/* ✅ user 상태가 있으면 투표 페이지로 이동 */}
        <Route
          path="/vote"
          element={
            user ? (
              <VotePage user={user} onLogout={() => setUser(null)} />
            ) : (
              <LoginPage onSuccess={setUser} />
            )
          }
        />

        {/* ✅ 결과 관련 페이지는 별도 */}
        <Route path="/result" element={<ResultPage />} />
        <Route path="/result-admin" element={<ResultAdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
