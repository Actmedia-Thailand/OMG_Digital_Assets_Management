"use client";

import React, { useState, useEffect, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import './style/header.css';
import { useRouter } from 'next/navigation'; // ใช้ next/navigation สำหรับ App Router
import Topbar from "./topbar";

 
const Header = ({ showSidebarLeft, setShowSidebarLeft, showSidebarRight, setShowSidebarRight }) => {

    // test
    const [showAccount, setShowAccount] = useState(false);
    const [showNavbarItems, setShowNavbarItems] = useState(true); // สถานะการแสดง Navbar Items
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992); // ตรวจสอบขนาดหน้าจอ
    const dropdownRef = useRef(null);

    const toggleAccount = () => setShowAccount((prev) => !prev); // ฟังก์ชันสำหรับเปลี่ยนสถานะ
    const toggleNavbarItems = () => setShowNavbarItems((prev) => !prev); // ฟังก์ชันสำหรับเปลี่ยนสถานะ menu mobile/ ipad screen

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowAccount(false);
        }
    };

    const handleResize = () => {
        const isDesktopNow = window.innerWidth >= 992;
        setIsDesktop(isDesktopNow);
    
        // เมื่อเป็นจอ Desktop ให้แสดง Navbar Items เสมอ
        if (isDesktopNow) {
          setShowNavbarItems(true);
        }
    };

    const router = useRouter();   // คำสั่งสำหรับ redirect page   
    const handleLogout = () => {
        // ลบข้อมูลทั้งหมดใน localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("name");
        localStorage.removeItem("department");
        localStorage.removeItem("position");
        // เปลี่ยนเส้นทางกลับไป login
         router.push('/');
    };


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


    // View Sidebar toggle ปุ่ม เปิด/ปิด sidebar view ซ้าย ++++++++++++++++++++
    const viewSidebar = () => {
        setShowSidebarLeft(!showSidebarLeft); // การสลับสถานะของ Sidebar
        console.log(showSidebarLeft)
    };

    // Filter Sidebar toggle ปุ่ม เปิด/ปิด sidebar filter ขวา ++++++++++++++++++++
    const filterSidebar = () => {
        setShowSidebarRight(!showSidebarRight); // การสลับสถานะของ Sidebar
        console.log(showSidebarRight)
    };
    

    return (
        <div>

            <div className="fixed-top">

                {/*++++++++++++++++ Navbar top +++++++++++++++++++++++++++++++++ */}
                <Navbar className="d-none" expand="lg" style={{ backgroundColor: "#39CAFF", color: "white" }}>
                    <Container fluid className="d-flex justify-content-between align-items-center customJustifyTopHead">
                        <Navbar.Brand href="/assets" style={{ color: "#081E26", fontWeight: "500" }}>
                            <i className="bi bi-display pe-3"></i> OMG Digital - Asset Management
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
                            <div className="position-relative" ref={dropdownRef}>
                                <div className="boxIconHead" onClick={toggleAccount} style={{ cursor: "pointer" }}>
                                    <i className="bi bi-person" style={{ fontSize: "20px", color: "#0F68A2" }} />
                                </div>
                                {showAccount && (
                                    <div
                                        className="dropdown-menu dropdown-menu-end"
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
                                        <Link href="/profile" className="dropdown-item"><i className="bi bi-person"></i> Profile</Link>
                                        <Link href="/permission" className="dropdown-item"><i className="bi bi-person-check"></i> Permission</Link>
                                        <Link href="/" className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Logout</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Container>
                </Navbar>
                <Topbar/>


                {/*++++++++++++++++++++++ Menu bar page ++++++++++++++++++++++++++++++++*/}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">

                        {/* Hamburger Menu with Bootstrap Icon */}
                        <button onClick={viewSidebar} className="btn btn-link text-decoration-none btn btn-outline-secondary border border-secondary text-dark me-3">
                            <i className="bi bi-list" style={{ fontSize: "20px", color: "#000",  textDecoration: "none"}}></i> View
                        </button>

                        {/*  Filter for Small Screens */}
                        <div className="d-lg-none d-flex align-items-center ms-auto mx-2">
                            <button  onClick={filterSidebar}  className="btn btn-outline-secondary">
                                <i className="bi bi-funnel fs-5"></i>
                            </button>
                            <button className="btn btn-outline-secondary d-lg-none mx-2" onClick={toggleNavbarItems}>
                                <i className="bi bi-list fs-5"></i> {/* Icon Hamburger */}
                            </button>
                        </div>

                        {/* Navbar Items */}
                        {showNavbarItems && (
                        <div className="navbar-collapse mt-3 mt-md-3 mt-lg-0" id="navbarNav">
                            <ul
                                className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-nowrap"
                                style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
                            >
                                <li className="nav-item">
                                <Link href="/assets" className="nav-link active">
                                    Assets
                                </Link>
                                </li>
                                <li className="nav-item">
                                <Link href="#" className="nav-link">
                                    Stock
                                </Link>
                                </li>
                                <li className="nav-item">
                                <Link href="#" className="nav-link">
                                    Stock Player
                                </Link>
                                </li>
                                <li className="nav-item">
                                <Link href="#" className="nav-link">
                                    Store Locations
                                </Link>
                                </li>
                                <li className="nav-item">
                                <Link href="#" className="nav-link">
                                    Monitored Players
                                </Link>
                                </li>
                            </ul>

                            {/* Filter Buttons for Large Screens */}
                            <div className="d-none d-lg-flex">
                                <button  onClick={filterSidebar} className="btn btn-outline-secondary">
                                    <i className="bi bi-filter"></i> Filter
                                </button>
                            </div>
                        </div>
                        )}    {/*+++++++++++  End เปิด-ปิด เมนู +++++++++++++ */}

                    </div> {/* End Navbar Items */}
                </nav>
            </div>

        </div>
    );
};

export default Header;
 