import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";
const GITHUB_IMAGE_BASE = "https://raw.githubusercontent.com/sozerong/VotePoster/main";

function App() {
  const [teams, setTeams] = useState([]);
  const [votedTeamId, setVotedTeamId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchTeams = async () => {
    const res = await axios.get(`${BACKEND_URL}/teams`);
    setTeams(res.data);
  };

  const vote = async (teamId) => {
    await axios.post(`${BACKEND_URL}/vote/${teamId}`);
    setVotedTeamId(teamId);
    setShowConfirmation(true);
    fetchTeams();
    setTimeout(() => {
      setVotedTeamId(null);
      setShowConfirmation(false);
    }, 1000);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", background: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>
        🗳️ 마음에 드는 팀 포스터에 투표하세요!
      </h2>

      {showConfirmation && (
        <div style={{
          backgroundColor: "#00C851",
          color: "#fff",
          padding: "15px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          borderRadius: "8px",
          marginBottom: "30px",
          transition: "opacity 0.5s ease-in-out"
        }}>
          ✅ 투표 완료!
        </div>
      )}

      {/* ✅ 2줄로 쪼개기: 5개씩 나눠서 row 2줄 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "30px", alignItems: "center" }}>
        {[0, 1].map((row) => (
          <div key={row} style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
            {teams.slice(row * 5, row * 5 + 5).map((team) => (
              <div
                key={team.id}
                style={{
                  textAlign: "center",
                  width: "200px",
                  padding: "15px",
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease-in-out"
                }}
              >
                <img
                  src={`${GITHUB_IMAGE_BASE}/poster${team.id}.png`}
                  alt={team.name}
                  style={{
                    width: "100%",
                    height: "280px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    objectFit: "cover",
                    transition: "transform 0.2s",
                  }}
                  onClick={() => vote(team.id)}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>
                  {team.name}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
