import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "./components/ConfirmModal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GITHUB_IMAGE_BASE = "https://raw.githubusercontent.com/sozerong/VotePoster/main";

function VotePage({ user, onLogout }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null); // ✅ 선택된 팀 ID
  const [showModal, setShowModal] = useState(false); // ✅ 모달 표시 여부

  useEffect(() => {
    axios.get(`${BACKEND_URL}/teams`).then((res) => setTeams(res.data));
  }, []);

  const handleVoteClick = (teamId) => {
    setSelectedTeam(teamId);
    setShowModal(true);
  };

  const confirmVote = async () => {
    await axios.post(`${BACKEND_URL}/vote/${selectedTeam}`, user);
    setShowModal(false);
    alert("✅ 투표가 완료되었습니다!");
    onLogout();
  };

  const rows = [teams.slice(0, 5), teams.slice(5, 10)];

  return (
    <div style={{ textAlign: "center", padding: "40px", backgroundColor: "#f9f9f9" }}>
      <h2>📢 포스터를 클릭해 투표하세요!</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>
        {rows.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: "20px" }}>
            {row.map((team) => (
              <div
                key={team.id}
                style={{ cursor: "pointer", width: "200px", textAlign: "center" }}
                onClick={() => handleVoteClick(team.id)}
              >
                <img
                  src={`${GITHUB_IMAGE_BASE}/poster${team.id}.png`}
                  alt={team.name}
                  style={{ width: "100%", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
                />
                <p>{team.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

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
