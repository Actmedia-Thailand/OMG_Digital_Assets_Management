// components/ProtectedRoute.js
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader2 from "@/components/loader2";
import axios from "axios";  // ใช้เรียก api

const ProtectedRoute = ({ children }) => {
  const router = useRouter(); // Use redirect page
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {

    const token = localStorage.getItem("access_token"); // ดึง Token จาก localStorage
    const username = localStorage.getItem("username"); // ดึง Token จาก localStorage

    if ((!token) || (!username)) {
      router.push("/"); // ถ้าไม่มี Token or  username ให้ Redirect ไปหน้า Login
    } 
    else {
      setIsAuthorized(true); // อนุญาตการเข้าถึง page
    }

    // ++++++++++++++ Get api for check user have เชคว่า user มีอยู่มั๊ย? ++++++++++++++++++++++++++++++++++
    const user_id = localStorage.getItem('user_id');  // Get user_id ที่เก็บใน localstorage
    axios.get(`http://127.0.0.1:8000/users/${user_id}`)
    .then((response) => {
      // console.log(response.data); //   ******* ข้อมูลจะอยู่ใน `response.data` ********
    })
    .catch((error) => {
      console.error(error); // จัดการข้อผิดพลาด
      router.push("/"); //  ให้ Redirect ไปหน้า Login
    });


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
