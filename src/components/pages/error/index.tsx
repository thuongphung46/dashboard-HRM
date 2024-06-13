import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/model");
  };

  return (
    <div className="error-page">
      <h1 className="error-title">404 Not found</h1>
      <p className="error-message">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại.
      </p>
      <p
        style={{
          color: "#0077cc",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={goHome}
      >
        Quay về trang chủ
      </p>
    </div>
  );
};
