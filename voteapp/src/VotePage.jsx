import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "./components/ConfirmModal";
import CompleteModal from "./components/CompleteModal"; // ✅ 추가

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GITHUB_IMAGE_BASE = "https://raw.githubusercontent.com/sozerong/VotePoster/main";

function VotePage({ user, onLogout }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 1단계
  const [showCompleteModal, setShowCompleteModal] = useState(false); // 2단계

  useEffect(() => {
    axios.get(`${BACKEND_URL}/teams`).then((res) => setTeams(res.data));
  }, []);

  const handleVoteClick = (teamId) => {
    setSelectedTeam(teams.find((t) => t.id === teamId));
    setShowConfirmModal(true);
  };

  const confirmVote = async () => {
    await axios.post(`${BACKEND_URL}/vote/${selectedTeam.id}`, user);
    setShowConfirmModal(false);
    setShowCompleteModal(true); // ✅ 2단계로 전환
  };

  const itemsPerRow = 5;
  const rows = Array.from({ length: Math.ceil(teams.length / itemsPerRow) }, (_, i) =>
    teams.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );



  return (
    <div style={{ textAlign: "center", padding: "40px", backgroundColor: "#f9f9f9", fontFamily: "Arial" }}>
      <h2>포스터를 클릭해 투표하세요!</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>
        {rows.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            {row.map((team) => (
              <div
                key={team.id}
                style={{
                  cursor: "pointer",
                  width: "200px",
                  textAlign: "center",
                  transition: "transform 0.3s ease",
                }}
                onClick={() => handleVoteClick(team.id)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={`${GITHUB_IMAGE_BASE}/poster${team.id}.png`}
                  alt={team.name}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                />
                <p style={{ marginTop: "8px", fontWeight: "bold", color: "#333" }}>{team.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ✅ 1단계 확인 모달 */}
      {showConfirmModal && selectedTeam && (
        <ConfirmModal
          title="투표 확인"
          message={`정말 '${selectedTeam.name}' 팀에 투표하시겠습니까?`}
          onConfirm={confirmVote}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      {/* ✅ 2단계 완료 모달 */}
      {showCompleteModal && (
        <CompleteModal
          message="투표가 완료되었습니다!"
          onClose={onLogout}
        />
      )}
    </div>
  );
}

export default VotePage;
