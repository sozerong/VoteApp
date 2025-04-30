import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "./components/ConfirmModal"; // ✅ 모달 import

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function ResultAdminPage() {
  const [teams, setTeams] = useState([]);
  const [voters, setVoters] = useState([]);
  const [showResetModal, setShowResetModal] = useState(false); // ✅ 모달 상태

  useEffect(() => {
    axios.get(`${BACKEND_URL}/results_full`).then((res) => {
      setTeams(res.data.teams);
      setVoters(res.data.voters);
    });
  }, []);

  const handleReset = async () => {
    await axios.post(`${BACKEND_URL}/reset`);
    alert("✅ 초기화가 완료되었습니다.");
    window.location.reload();
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <h2 style={{ color: "#333" }}>📊 전체 투표 결과 (관리자용)</h2>

      <div style={{ marginTop: "30px" }}>
        <h3>✅ 팀별 투표 수</h3>
        <ul style={{ lineHeight: "1.8" }}>
          {teams.map((team, idx) => (
            <li key={idx}>
              <strong>{team.name}</strong>: {team.votes}표
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>👤 참여자 목록</h3>
        <ul style={{ lineHeight: "1.8" }}>
          {voters.map((voter, idx) => (
            <li key={idx}>
              {voter.student_id} - {voter.name}
            </li>
          ))}
        </ul>
      </div>

      <hr style={{ margin: "40px 0" }} />

      <button
        onClick={() => setShowResetModal(true)}
        style={{
          padding: "12px 24px",
          background: "#d9534f",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        🔄 전체 초기화
      </button>

      {showResetModal && (
        <ConfirmModal
          title="초기화 확인"
          message="정말로 모든 투표 결과를 초기화하시겠습니까?"
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
        />
      )}
    </div>
  );
}

export default ResultAdminPage;
