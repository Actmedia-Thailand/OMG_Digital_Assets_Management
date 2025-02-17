"use client";

// pages/register.js
import React from 'react';
import { useState,useEffect} from "react";
import Link from 'next/link';
import styles from './profile.module.css';  // css module แยกตาม component
import './profile.css';
import Image from 'next/image';  // รูปแบบ Next ทำให้โหลดเร็ว
// import { useRouter } from 'next/navigation'; // ใช้ next/navigation สำหรับ App Router
import axios from "axios";  // ใช้เรียก api
import Swal from 'sweetalert2'; // Import SweetAlert2

// import Header from '@/components/header';
import Footer from "@/components/footer";
import Topbar from "@/components/topbar";
import ProtectedRoute from "@/components/protectedRoute";
import Loader2 from "@/components/loader2";

const Profile = () => {
    // ใช้ useState เก็บข้อมูลจากฟอร์ม +++++++++++++++++++++++++++++++++++++
    const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nameSecond, setNameSecond] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetPassError, setResetPassError] = useState('');
    const [showModal, setShowModal] = useState(false); // ใช้ state ควบคุมการแสดง Modal
    const [loading, setLoading] = useState(true); // สถานะสำหรับ Loading
    // const router = useRouter(); //ใช้ redirect page
    const [isEditable, setIsEditable] = useState(false); // ค่าเริ่มต้นคือ disabled
    const [showPassword, setShowPassword] = useState(false); // สถานะการแสดงรหัสผ่าน
    const [usernameCheck, setUsernameCheck] = useState(null);
    const [errorProfileForm, setErrorProfileForm] = useState("");  // เตือน Error Profile Form 

    // Department array data  ++++++++++++++++++++++++++++++++++++++++++++++++++
    const departmentArr = [
      { name: "Digital", positions: ["Software Engineer", "Web Developer", "UI/UX Designer", "Digital Strategist"] },
      { name: "Media", positions: ["Content Creator", "Video Editor", "Social Media Manager"] },
      { name: "Operations", positions: ["Operations Manager", "Project Coordinator", "Logistics Specialist"] },
      { name: "Board", positions: ["CEO", "CFO", "COO"] },
    ];

    // ใช้ค้นหาข้อมูลใน array โดยจะส่งกลับค่า ตัวแรกที่ตรงเงื่อนไข ที่กำหนดใน callback function (หรือ undefined หากไม่พบ)
    const selectedDepartment = departmentArr.find((dept) => dept.name === department);
    console.log(selectedDepartment)


  // ++++++++++++++ Submit  Reset password  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const handleResetPass = (e) => {
    e.preventDefault();

    // Validation  Reset password Form  ****************************************
    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      // ตรวจสอบว่าฟิลด์ทั้งหมดไม่ว่าง
      setResetPassError("All fields are required!");
    } else if (newPassword.length < 6) {
      // ตรวจสอบความยาวขั้นต่ำ 6
      setResetPassError("New Password must be at least 6 characters long!");
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      // ตรวจสอบพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข อย่างน้อยอย่างละ 1 ตัว
      setResetPassError(
        "New Password must contain at least one lowercase letter, one uppercase letter, and one number!"
      );
    } else if (newPassword.trim() !== confirmPassword.trim()) {
      // ตรวจสอบว่ารหัสผ่านใหม่และยืนยันรหัสผ่านตรงกัน
      setResetPassError("New Password and Confirm Password do not match!");
    } else {
      setResetPassError(""); // set ให้ Error เป็นค่าว่างถ้าผ่านทุกเงื่อนไข
      setLoading(true); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ

      //เก็บข้อมูลจาก Form รวมเป็น Object *********************************
      const user_id = localStorage.getItem("user_id"); // Get user_id ที่เก็บใน localstorage
      const ResetPassFormObj = {
        user_id: user_id,
        old_password: oldPassword,
        new_password: newPassword,
      };

      // เรียก API ด้วย axios ****************************************
      axios
        .post("http://127.0.0.1:8000/users/reset_password", ResetPassFormObj, {
          headers: {
            "Content-Type": "application/json",
          },
        })

        .then((response) => {
          console.log(response); // Debug
          Swal.fire({
            // icon: 'info', // ไอคอนคำถาม (หรือเปลี่ยนเป็นไอคอนอื่นตามต้องการ)
            title: response.data.message, //แสดงข้อความจาก api >> response.data.message
            confirmButtonText: "OK",
            // showConfirmButton: false, // ปิดปุ่มยืนยัน
            // timer: 3000, // ตั้งเวลาให้แสดงแค่ 3 วินาที (3000 ms)
            // timerProgressBar: true, // เพิ่มแถบโปรเกรสให้ดูว่าเหลือเวลาเท่าไหร่
            customClass: {
              popup: "modern-swal-popup", // ปรับแต่งกล่องแจ้งเตือน
              title: "modern-swal-title", // ปรับแต่งหัวข้อ
              confirmButton: "modern-swal-button", // ปรับแต่งปุ่มยืนยัน
            },
          });
          setOldPassword(""); //set ค่าว่าง
          setNewPassword(""); //set ค่าว่าง
          setConfirmPassword(""); //set ค่าว่าง
          setShowModal(false); // ปิด Modal เปลี่ยนรหัสผ่าน
          setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
        })
        .catch((error) => {
          console.error("Password update  failed:", error);
          // Alert เตือนเมื่อเกิดข้อผิดพลาดในการ Register เช่น Username ซ้ำ
          Swal.fire({
            // Library alert warning
            icon: "warning", // Warning icon
            title: error.response.data.detail,
            confirmButtonText: "OK", // Confirmation button
            customClass: {
              title: "swal2-title",
              content: "swal2-content",
              confirmButton: "swal2-confirm",
            },
          });
          setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
        });
    }
  };

    // ++++++++++++++ Close ResetPassForm +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const closeResetPassForm = () => {
      setShowModal(false)
      setOldPassword(''); //set ค่าว่าง
      setNewPassword('');  //set ค่าว่าง
      setConfirmPassword('');  //set ค่าว่าง
      setResetPassError('')   //set ค่าว่าง
    }
    
    // ทำงานแค่ครั้งเดียวเมื่อคอมโพเนนต์โหลด   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    useEffect(() => {

        // ตรวจสอบว่าโค้ดกำลังรันใน Client-side ************************
        if (typeof window !== "undefined") {
          const username = localStorage.getItem("username");
          setUsernameCheck(username);
        }

        // +++++++++++   Get Api Data >> USER table ++++++++++++++++++++++++++++++++++++++++++
        const user_id = localStorage.getItem('user_id');  // Get user_id ที่เก็บใน localstorage
        axios.get(`http://127.0.0.1:8000/users/${user_id}`)
        .then((response) => {
          console.log(response.data); //   ******* ข้อมูลจะอยู่ใน `response.data` ********
          setUsername(response.data.username); //เก็บข้อมูลจาก api เก็บลง UseState
          setName(response.data.name);  //เก็บข้อมูลจาก api เก็บลง UseState
          setNameSecond(response.data.name);  //เก็บข้อมูลจาก api เก็บลง UseState
          setDepartment(response.data.department);  //เก็บข้อมูลจาก api เก็บลง UseState
          setPosition(response.data.position);  //เก็บข้อมูลจาก api เก็บลง UseState
          setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
        })
        .catch((error) => {
          console.error(error); // จัดการข้อผิดพลาด
          // router.push("/"); // ถ้าไม่มี Token ให้ Redirect ไปหน้า Login
          setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
        });
    }, []);  // [] หมายความว่า useEffect จะทำงานแค่ครั้งเดียวเมื่อคอมโพเนนต์โหลด

    //EDIT PROFILE FORM เมื่อ click save change button +-+-+-+-+-+-+-+-+-+-+-+--++--+-++-+-
    const handleSaveChange = (e) => {
        e.preventDefault();

        // Validate ข้อมูลก่อนเรียก API
        if (!username.trim() || !name.trim() || !department.trim() || !position.trim()) {
          setErrorProfileForm('All fields are required.')
          return; // หยุดการทำงานถ้าข้อมูลไม่ครบ
        }else{
          setErrorProfileForm('')
          window.location.reload(); // reload หน้า หลังกด Save change
        }

        //เก็บข้อมูลจาก Form รวมเป็น Object
        const ProfileFormObj = { 
        username: username,
        name: name,
        department: department,
        position: position,
        };

    // เรียก API ด้วย axios ++++++++++++++++++++++++++++++++++++++++++++++
    const user_id = localStorage.getItem("user_id"); // Get user_id ที่เก็บใน localstorage
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${user_id}`,
        ProfileFormObj,
        {
          headers: {
              'Content-Type': 'application/json'
          }
        })
        
        .then((response) => {
        console.log("Edit Profile successful:", response.data);

        })
        .catch((error) => {
        console.error("Edit Profile failed:", error.response.data.detail);

        // Alert เตือนเมื่อเกิดข้อผิดพลาดในการ Edit Profile เช่น  Not found user
        Swal.fire({
          // Library alert warning
          icon: "warning", // Warning icon
          title: error.response.data.detail,
          confirmButtonText: "OK", // Confirmation button
          customClass: {
            title: "swal2-title",
            content: "swal2-content",
            confirmButton: "swal2-confirm",
          },
        });
      });
  };

    // Click เปิด enable profile form +++++++++++++++++
    const handleEdit = () => {
      setIsEditable(true); // เปิดให้แก้ไข
    };
 
    // แสดง Loading ระหว่างโหลด
    if (loading) {
      return <div><Loader2/></div>;
    }


  return (
    <>
    <ProtectedRoute>
    <Topbar fixedTop="fixed-top"/>
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5 mt-5">
      <div className="card p-4" style={{ width: '400px' }}>
        <div className="text-center mb-4">
        <div className={`rounded-circle mx-auto d-flex align-items-center ${styles.boxLogoRegister}`} style={{ width: '130px', height: '130px'}}>
              <Image 
                src="/logo-actmedia-header.png" 
                alt="Logo Actmedia Thailand"
                className="img-fluid p-2" 
                width={500} 
                height={300}
                layout="responsive" // ใช้ layout แบบ responsive
                priority // ใช้ priority เพื่อ preload ภาพ
              />
          </div>
          <div className='profile-head d-flex justify-content-between align-items-center pt-4'>
            <h4 className="name_user mb-0">{nameSecond}</h4>  
            <button 
              className={`btn btn-sm custom-btn ${styles.customBtn}`} // ใช้ Bootstrap class สำหรับปุ่ม
              onClick={() => handleEdit()} // เพิ่มฟังก์ชัน handleEdit
            >
              <i className="bi bi-pencil-square"></i> Edit
            </button>
          </div>
        </div>

            <form onSubmit={handleSaveChange}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control rounded-pill"
                  placeholder="username"
                  value={username}
                  disabled={true} // ควบคุม disabled ด้วย state
                  onChange={(e) => setUsername(e.target.value)} // อัปเดตค่าของ username
                  required
                />
              </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              id="name" 
              className="form-control rounded-pill" 
              placeholder="name" 
              value={name} 
              disabled={!isEditable} // ควบคุม disabled ด้วย state
              onChange={(e) => setName(e.target.value)} // อัปเดตค่าของ name
            />
          </div>

          {/* ********* Department options *********** */}
          <div className="mb-3">
              <label htmlFor="department" className="form-label">Department</label>
              <select
                id="department"
                className="form-control rounded-pill"
                value={department}
                disabled={!isEditable} // ควบคุม disabled ด้วย state
                onChange={(e) => {
                  setDepartment(e.target.value); // อัปเดต department ที่เลือก
                  setPosition(""); // รีเซ็ต position เมื่อเปลี่ยน department
                }}
              >
                {/* <option value="">-- Select Department --</option> */}
                {departmentArr.map((dept) => (
                  <option key={dept.name} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
          </div>

          {/* *************** Position options ******************** */}
          <div className="mb-4">
              <label htmlFor="position" className="form-label">Position</label>
              <select
                id="position"
                className="form-control rounded-pill"
                value={position}
                onChange={(e) => setPosition(e.target.value)} // อัปเดตตำแหน่งงานที่เลือก
                disabled={!isEditable} // ควบคุม disabled ด้วย state
              >
                {!position && <option value="">-- Select Position --</option>} {/* แสดงเฉพาะเมื่อ position เป็นค่าว่าง */}
                {selectedDepartment &&
                  selectedDepartment.positions.map((pos, index) => ( // Loop จาก  Positions Array
                    <option key={index} value={pos}>
                      {pos}
                    </option>
                ))}
              </select>
          </div>

          {/* ********* แสดงข้อความแจ้งเตือนเมื่อมีข้อผิดพลาด !!!  ************* */}
          {errorProfileForm && (
            <div className="alert alert-danger mb-3" role="alert">
              {errorProfileForm}
            </div>
          )}

          {/********* Save change button ********* */}
          <button type="submit"   className={`w-100 mb-2  ${styles.registerBtn}`}>Save change</button>  
        </form>

        {/* ปุ่มเปิด Modal ++++++++++++++++ */}
        {!usernameCheck?.includes('@gmail') && (
          <div className="change-password pb-2">
            <button className="btn btn-secondary w-100" onClick={() => setShowModal(true)}>
              Change Password
            </button>
          </div> 
        )}
        <Link href="/assets" className={`btn btn-light w-100  ${styles.backBtn}`} >Back</Link>

            {/* Modal Change password ++++++++++++++++++++ */}
            {showModal && (
              <div
                className="modal d-block"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Change Password</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => closeResetPassForm()} // ปิด Modal
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body p-4">
                      <form onSubmit={handleResetPass}>
                        <span
                          className="position-absolute"
                          style={{
                            top: "7%",
                            right: "20px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#118DCE",
                          }}
                          onClick={() => setShowPassword(!showPassword)} // สลับสถานะการแสดงรหัสผ่าน
                        >
                          Show/Hide&nbsp;
                          {/* ใช้ Bootstrap Icons */}
                          {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                      </span>
                    <div className="mb-3">
                      <label htmlFor="currentPassword" className="form-label">
                        Old Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}  // เปลี่ยนเป็น text ถ้า showPassword เป็น true
                        className="form-control"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}  // เปลี่ยนเป็น text ถ้า showPassword เป็น true
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}  // เปลี่ยนเป็น text ถ้า showPassword เป็น true
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {resetPassError && (
                    <div className="alert alert-danger pb-3" role="alert">
                      {resetPassError}
                    </div>
                    )}
                    <button type="submit" className="btn btn-secondary w-100">
                      Save
                    </button>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
    
    <Footer/>
    </ProtectedRoute>
    </>
  );
};

export default Profile;
