import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function LoginPage({ onSuccess }) {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔄 제출 핸들러
  const handleSubmit = async () => {
    setError("");
    if (!studentId || !name) {
      setError("학번과 이름을 모두 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/can_vote`, {
        student_id: studentId,
        name,
      });

      console.log("✅ 서버 응답:", res.data);

      if (res?.data?.can_vote) {
        onSuccess({ student_id: studentId, name }); // 투표 화면으로 이동
        navigate("/vote");  // ✅ 여기서 화면 전환 발생
      } else if (res?.data?.can_vote === false) {
        setError("❌ 이미 투표하셨습니다.");
      } else {
        setError("⚠️ 서버 응답이 예상과 다릅니다.");
      }
    } catch (err) {
      console.error("❌ 서버 오류:", err);
      setError("서버와의 연결에 실패했습니다.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          width: "320px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "30px", color: "#333" }}>🎓 학번과 이름을 입력해주세요</h2>

        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="학번"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#aaa" : "#007BFF",
            color: "#fff",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "확인 중..." : "✅ 투표하기"}
        </button>

        {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      </div>
    </div>
  );
}

export default LoginPage;
