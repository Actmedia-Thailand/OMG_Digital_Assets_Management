"use client";

import React, { useState, useEffect, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import './style/header.css';
import { useRouter } from 'next/navigation'; // ใช้ next/navigation สำหรับ App Router

function Topbar({fixedTop}) {

    const [showAccount, setShowAccount] = useState(false);
    const dropdownRef = useRef(null);
    const toggleAccount = () => setShowAccount((prev) => !prev); // ฟังก์ชันสำหรับเปลี่ยนสถานะ
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992); // ตรวจสอบขนาดหน้าจอ
    const [levelAuthorizer, setLevelAuthorizer] = useState();
    const [name, setName] = useState();
    const [username, setUsername] = useState();

    //กรณีกด dropdown icon user แล้วไปกดพื้นที่อื่น จะ hide dropdown auto  ++++++++++++++++++++++++++++++
    const handleClickOutside = (event) => {  
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowAccount(false);
        }
    };

    const handleResize = () => {
        const isDesktopNow = window.innerWidth >= 992;
        setIsDesktop(isDesktopNow);
    };


    const router = useRouter();   // คำสั่งสำหรับ redirect page   ++++++++++++++++++++++++++++++++
    const handleLogout = () => {
        // ลบข้อมูลทั้งหมดใน LocalStorage หลัง Click Logout
        localStorage.removeItem("user_id");
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("name");
        localStorage.removeItem("department");
        localStorage.removeItem("position");
        localStorage.removeItem("level");
        router.push('/');  // เปลี่ยนเส้นทางกลับไป login
    };

    useEffect(() => {
        const level = localStorage.getItem('level'); // ดึง level จาก localStorage 
        const name = localStorage.getItem('name'); // ดึง level จาก localStorage 
        const username = localStorage.getItem('username'); // ดึง level จาก localStorage 
        setLevelAuthorizer(level);
        setName(name);
        setUsername(username);
    }, []); // ทำงานใหม่เมื่อ `showAccount` เปลี่ยน
    // console.log(levelAuthorizer)

    useEffect(() => {
        const handleEvents = () => {
            // ตรวจสอบและจัดการการเปลี่ยนขนาดหน้าจอ
            handleResize();
        };
    
        if (showAccount) {
            // ถ้าสถานะ `showAccount` เป็นจริง ให้ฟังเหตุการณ์ `mousedown`
            document.addEventListener("mousedown", handleClickOutside);
        }
    
        // ฟังเหตุการณ์ `resize` เสมอ
        window.addEventListener("resize", handleEvents);
    
        // Cleanup: ลบ Event Listeners เมื่อ Component ถูก Unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleEvents);
        };
    }, [showAccount]); // ทำงานใหม่เมื่อ `showAccount` เปลี่ยน



  return (
    <div>
            {/*++++++++++++++++ Navbar top +++++++++++++++++++++++++++++++++ */}
            <Navbar className={fixedTop} expand="lg" style={{ backgroundColor: "#118DCE", color: "white" }}>
                <Container fluid className="d-flex justify-content-between align-items-center customJustifyTopHead">
                    <Navbar.Brand href="/assets" style={{ color: "#fff", fontWeight: "500" }}>
                        <i className="bi bi-display pe-3"></i> OMG Digital - Asset Management
                        {/* <p>{levelAuthorizer}</p> */}
                    </Navbar.Brand>
                    <div className="d-flex gap-3 align-items-center py-3 py-md-0 py-lg-0">
                        <Link href="#">
                            <div className="boxIconHead">
                                <i className="bi bi-share" style={{ fontSize: "20px", color: "#0F68A2" }} />
                            </div>
                        </Link>
                        <Link href="#">
                            <div className="boxIconHead">
                                <i className="bi bi-bell" style={{ fontSize: "20px", color: "#0F68A2" }} />
                            </div>
                        </Link>

                        {/* Dropdown user +++++++++++++++++ */}
                            <div className="position-relative" ref={dropdownRef}>
                                <div className="boxIconHead" onClick={toggleAccount} style={{ cursor: "pointer" }}>
                                    <i className="bi bi-person" style={{ fontSize: "20px", color: "#0F68A2" }} />
                                </div>
                                {showAccount && (
                                    <div
                                            className="dropdown-menu dropdown-menu-end custom-dropdown"
                                            style={{
                                                display: "block",
                                                position: "absolute",
                                                top: "38px",
                                                right: "0",
                                                backgroundColor: "white",
                                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                                borderRadius: "5px",
                                            }}
                                    >
                                            <p className="dropdown-user-info">
                                                <i className="bi bi-person-circle"></i>
                                                {name||username}
                                            </p>
                                            <Link href="/profile" className="dropdown-item"><i className="bi bi-person"></i> Profile</Link>
                                            {/* <Link href="/permission" className="dropdown-item"><i className="bi bi-person-check"></i> Permission</Link> */}
                                            {parseInt(levelAuthorizer) === 3 || parseInt(levelAuthorizer) === 4 ? (
                                                <Link href="/permission" className="dropdown-item">
                                                    <i className="bi bi-person-check"></i> Permission
                                                </Link>
                                            ) : null}
                                            <Link href="/" className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Logout</Link>
                                    </div>
                                )}
                            </div>
                    </div>
                </Container>
            </Navbar>
       
    </div>
  )
}

export default Topbar;