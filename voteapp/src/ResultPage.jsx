import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function ResultPage({ onBack }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/results`).then((res) => setResults(res.data));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h2>📊 투표 결과</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {results.map((team, idx) => (
          <li key={idx} style={{ marginBottom: "10px", fontSize: "18px" }}>
            {idx + 1}위 - {team.name}: {team.votes}표
          </li>
        ))}
      </ul>
      <button onClick={onBack}>← 돌아가기</button>
    </div>
  );
}

export default ResultPage;
