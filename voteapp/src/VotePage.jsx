import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const GITHUB_IMAGE_BASE = "https://raw.githubusercontent.com/sozerong/VotePoster/main";

function VotePage({ user, onLogout }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/teams`).then((res) => setTeams(res.data));
  }, []);

  const vote = async (teamId) => {
    await axios.post(`${BACKEND_URL}/vote/${teamId}`, user);
    alert("✅ 투표가 완료되었습니다!");
    onLogout(); // 로그인 화면으로 돌아감
  };

  const rows = [teams.slice(0, 5), teams.slice(5, 10)];

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ fontSize: "28px", marginBottom: "40px", color: "#333" }}>
        📢 포스터를 클릭해 투표하세요!
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
            {row.map((team) => (
              <div
                key={team.id}
                style={{
                  width: "200px",
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  padding: "15px",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
                onClick={() => vote(team.id)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={`${GITHUB_IMAGE_BASE}/poster${team.id}.png`}
                  alt={team.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <p style={{ fontSize: "18px", color: "#333", fontWeight: "bold" }}>{team.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotePage;
