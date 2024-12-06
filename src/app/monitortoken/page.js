"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // ใช้สำหรับอ่าน query string get token
import Loader2 from "@/components/loader2";
import { jwtDecode } from "jwt-decode";

function Monitortoken() {
  const searchParams = useSearchParams(); // ใช้สำหรับอ่าน query string
  const router = useRouter(); // ใช้สำหรับการนำทาง
  const token = searchParams.get("token"); // รับค่า 'token' จาก URL
  const username = searchParams.get("username"); // รับค่า 'token' จาก URL

  // ฟังก์ชัน validateToken
  const validateToken = (token) => {
    try {
      const decoded = jwtDecode(token); // ถอดรหัส (decode) token
      const userId = decoded.sub; // ดึง user ID

      if (!decoded.exp) {
        console.log("Token missing expiration (exp) field");
        return false;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      console.log(decoded.exp > currentTime);
      return decoded.exp > currentTime; // ตรวจสอบว่า token ยังไม่หมดอายุ
    } catch (error) {
      console.log("Invalid token format or decoding failed");
      return false; // ถอดรหัสไม่สำเร็จ
    }
  };

  // ฟังก์ชันสำหรับการทำงานหลักใน useEffect
  const handleTokenProcessing = () => {
    // console.log("token : " + token); // Debug get token
    const decoded = jwtDecode(token); // ถอดรหัส (decode) token
    const user_id = decoded.sub; // ดึง user ID

    if (token) {
      localStorage.setItem("access_token", token); // เก็บ token ใน localStorage
      localStorage.setItem("user_id", user_id); // เก็บ token ใน localStorage
      localStorage.setItem("username", username); // เก็บ token ใน localStorage
      router.replace("/monitortoken"); // ลบ token จาก URL

      // ถ้า token ถูกต้องจะเปลี่ยนหน้าไปที่ /assets
      if (validateToken(token)) {
        router.push("/assets");
      } else {
        console.log("Invalid token. Redirecting to home.");
      }
    } else {
      console.log("Token not found. Redirecting to home.");
    }
  };

  // เรียกใช้ handleTokenProcessing เมื่อ component ถูก mount
  useEffect(() => {
    handleTokenProcessing(); // เรียกใช้ฟังก์ชันนี้ใน useEffect
  }, []); 

  return (
    <div>
      <Loader2 />
    </div>
  );
}

export default Monitortoken;
