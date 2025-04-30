import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "./components/ConfirmModal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GITHUB_IMAGE_BASE = "https://raw.githubusercontent.com/sozerong/VotePoster/main";

function VotePage({ user, onLogout }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/teams`).then((res) => setTeams(res.data));
  }, []);

  const handleVoteClick = (teamId) => {
    setSelectedTeam(teams.find((t) => t.id === teamId)); // ✅ 팀 전체 정보 저장
    setShowModal(true);
  };

  const confirmVote = async () => {
    await axios.post(`${BACKEND_URL}/vote/${selectedTeam.id}`, user);
    setShowModal(false);
    onLogout();
  };

  const rows = [teams.slice(0, 5), teams.slice(5, 10)];

  return (
    <div style={{ textAlign: "center", padding: "40px", backgroundColor: "#f9f9f9", fontFamily: "Arial" }}>
      <h2>📢 포스터를 클릭해 투표하세요!</h2>

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
                  transition: "transform 0.3s ease", // ✅ 확대 효과
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

      {/* ✅ 선택한 팀 정보 안내 */}
      {selectedTeam && showModal && (
        <p style={{ marginTop: "20px", fontSize: "16px", color: "#666" }}>
          선택한 팀: <strong>{selectedTeam.name}</strong>
        </p>
      )}

      {/* ✅ 확인 모달 */}
      {showModal && (
        <ConfirmModal
          title="투표 확인"
          message="정말 이 팀에 투표하시겠습니까?"
          onConfirm={confirmVote}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default VotePage;
