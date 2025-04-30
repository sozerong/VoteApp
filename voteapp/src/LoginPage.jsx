import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function LoginPage({ onSuccess, onShowResults }) {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post(`${BACKEND_URL}/can_vote`, {
      student_id: studentId,
      name,
    });
    if (res.data.can_vote) {
      onSuccess({ student_id: studentId, name });
    } else {
      setError("❌ 이미 투표하셨습니다.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h2>학번과 이름을 입력해주세요</h2>
      <input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="학번" />
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <br />
      <button onClick={handleSubmit}>투표하기</button>
      <button onClick={onShowResults} style={{ marginLeft: "10px" }}>
        결과 보기
      </button>
      <div style={{ color: "red" }}>{error}</div>
    </div>
  );
}

export default LoginPage;
