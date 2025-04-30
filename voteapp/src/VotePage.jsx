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
    onLogout(); // 다시 로그인 화면으로
  };

  // 5개씩 2줄로 나누기
  const rows = [teams.slice(0, 5), teams.slice(5, 10)];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>포스터를 클릭해 투표하세요</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", gap: "20px" }}>
            {row.map((team) => (
              <div key={team.id} style={{ textAlign: "center", width: "200px" }}>
                <img
                  src={`${GITHUB_IMAGE_BASE}/poster${team.id}.png`}
                  alt={team.name}
                  style={{ width: "100%", cursor: "pointer", borderRadius: "10px" }}
                  onClick={() => vote(team.id)}
                />
                <p>{team.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotePage;
