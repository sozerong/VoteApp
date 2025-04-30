import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function ResultAdminPage() {
  const [teams, setTeams] = useState([]);
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/results_full`).then((res) => {
      setTeams(res.data.teams);
      setVoters(res.data.voters);
    });
  }, []);

  const reset = async () => {
    if (window.confirm("정말로 초기화하시겠습니까?")) {
      await axios.post(`${BACKEND_URL}/reset`);
      alert("초기화 완료");
      window.location.reload();
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>📊 전체 투표 결과 (관리자용)</h2>

      <h3>✅ 팀별 투표 수</h3>
      <ul>
        {teams.map((team, idx) => (
          <li key={idx}>
            {team.name}: {team.votes}표
          </li>
        ))}
      </ul>

      <h3>👤 참여자 목록</h3>
      <ul>
        {voters.map((voter, idx) => (
          <li key={idx}>
            {voter.student_id} - {voter.name}
          </li>
        ))}
      </ul>

      <hr />
      <button onClick={reset} style={{ marginTop: "20px", background: "red", color: "white" }}>
        🔄 전체 초기화
      </button>
    </div>
  );
}

export default ResultAdminPage;
