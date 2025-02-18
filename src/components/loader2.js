"use client";
import React from 'react';
import './style/loader.css';

const Loader2 = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundColor: "#fff", // พื้นหลังสีอ่อน
        flexDirection: "column",
      }}
    >
      {/* ใช้ spinner-border ของ Bootstrap */}
      <div className="spinner-border" role="status" style={{ width: '50px', height: '50px', color: '#007bff' }}>
      </div>
      <p style={{ marginTop: "15px", color: "#333", fontSize: "16px" }}>
        Loading ...
      </p>
    </div>
  );
}

export default Loader2;
