// components/ProtectedRoute.js
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader2 from "@/components/loader2";

const ProtectedRoute = ({ children }) => {
  const router = useRouter(); // Use redirect page
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {

    const token = localStorage.getItem("access_token"); // ดึง Token จาก localStorage
    const username = localStorage.getItem("username"); // ดึง Token จาก localStorage

    if ((!token) || (!username)) {
      router.push("/"); // ถ้าไม่มี Token ให้ Redirect ไปหน้า Login
    } 
    else {
      setIsAuthorized(true); // อนุญาตการเข้าถึง page
    }

    // setIsLoading(false); // ปิดสถานะ Loading
    setTimeout(() => setIsLoading(false)); // จำลองการโหลดข้อมูล
  }, [router]);

  if (isLoading) {  // show loading ขณะเช็ค token
    return <Loader2 />;
  }
  

  if (!isAuthorized) {
    return null; // ถ้าไม่ได้รับอนุญาต ไม่แสดงเนื้อหาใดๆ
  }

  return <>{children}</>; // แสดงเนื้อหาของ Component ที่ห่อด้วย ProtectedRoute
};

export default ProtectedRoute;
