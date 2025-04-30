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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>포스터를 클릭해 투표하세요</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {teams.map((team) => (
          <div key={team.id} style={{ textAlign: "center", width: "200px" }}>
            <img
              src={`${GITHUB_IMAGE_BASE}/poster${team.id}.png`}
              alt={team.name}
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => vote(team.id)}
            />
            <p>{team.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotePage;
