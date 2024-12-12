"use client";

// pages/register.js
import React from 'react';
import { useState, useEffect} from "react";
import Link from 'next/link';
import styles from './register.module.css';  // css module แยกตาม component
import './register.css';
import Image from 'next/image';  // รูปแบบ Next ทำให้โหลดเร็ว
import { useRouter } from 'next/navigation'; // ใช้ next/navigation สำหรับ App Router
import axios from "axios";  // ใช้เรียก api
import Swal from 'sweetalert2'; // Import SweetAlert2
import Loader2 from '@/components/loader2';

const Register = () => {

    // ใช้ useState เก็บข้อมูลจากฟอร์ม ++++++++++++++++++++++++++++
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // สถานะการแสดงรหัสผ่าน
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [level, setLevel] = useState('1');
    const [errorRegisterForm, setErrorRegisterForm] = useState("");  // เตือน Error Profile Form 
    const [loading, setLoading] = useState(true); // สถานะสำหรับ Loading


    // Department array data +++++++++++++++++++++++++++++++++++
    const departmentArr = [
      { name: "Digital", positions: ["Software Engineer", "Web Developer", "UI/UX Designer", "Digital Strategist"] },
      { name: "Media", positions: ["Content Creator", "Video Editor", "Social Media Manager"] },
      { name: "Operations", positions: ["Operations Manager", "Project Coordinator", "Logistics Specialist"] },
      { name: "Board", positions: ["CEO", "CFO", "COO"] },
    ];

    // ใช้ค้นหาข้อมูลใน array โดยจะส่งกลับค่า ตัวแรกที่ตรงเงื่อนไข ที่กำหนดใน callback function (หรือ undefined หากไม่พบ)
    const selectedDepartment = departmentArr.find((dept) => dept.name === department);
    // console.log(selectedDepartment)


    useEffect(() => {
      setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
    }, []); // useEffect จะทำงานเมื่อหน้าโหลดครั้งแรก

    //ใช้ redirect page 
    const router = useRouter(); 

    // ปุ่ม Register +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const handleRegister = (e) => {
      e.preventDefault();

      // Validate ข้อมูลก่อนเรียก API ***********************************************************
      if (!username.trim() || !password.trim() ||  !name.trim()  || !department.trim() || !position.trim()) {
          setErrorRegisterForm('All fields are required.')
          return; // หยุดการทำงานถ้าข้อมูลไม่ครบ
      }else if (password.length < 6) {   // ตรวจสอบความยาวรหัสผ่านขั้นต่ำ 6 ตัวอักษร
        setErrorRegisterForm('Password must be at least 6 characters long.');
        return;
      }else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {  // ตรวจสอบว่ารหัสผ่านต้องประกอบด้วยตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ และตัวเลขอย่างน้อย 1 ตัว
        setErrorRegisterForm('Password must contain at least one lowercase letter, one uppercase letter, and one number.');
        return;
      } 
      else{
        setErrorRegisterForm('') //set ค่าว่างให้ข้อความ Error
        setLoading(true); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
      }

      //เก็บข้อมูลจาก Form รวมเป็น Object
      const registerFormObj = { 
        username: username,
        password: password,
        name: name,
        department: department,
        position: position,
        level: Number(level)
      };


      // เรียก API ด้วย axios ++++++++++++++++++++++++++++++++++++++++++++++
      axios.post('http://127.0.0.1:8000/users/register', registerFormObj, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then((response) => {
        // Alert Register สำเร็จ **********************
        Swal.fire({ 
          icon: 'success', // ใช้ไอคอน 'success'
          title: response.data.message,
          confirmButtonText: 'OK', // Confirmation button
            customClass: {
              title: 'swal2-title',
              content: 'swal2-content',
              confirmButton: 'swal2-confirm',
            },
        });
        setLoading(false); // ให้หยุด Loading
        console.log("Registration successful:", response.data); //debug
        router.push('/'); // Redirect ไปหน้า Login
      })
      .catch((error) => {
        console.error("Registration failed:", error);

        // Alert เตือนเมื่อเกิดข้อผิดพลาดในการ Register เช่น Username ซ้ำ **********************
        Swal.fire({  // Library alert warning
          icon: 'warning', // Warning icon
          title: error.response.data.detail,
          confirmButtonText: 'OK', // Confirmation button
          customClass: {
            title: 'swal2-title',
            content: 'swal2-content',
            confirmButton: 'swal2-confirm',
          },
        });
        setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
      });

    };

    // แสดง Loading ระหว่างโหลด +++++++++++++++++++++++++++++++++++++++
    if (loading) {
      return <div><Loader2/></div>;
    }


    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
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
            <h3 className="mt-3">Register</h3>
          </div>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input 
                type="text" 
                id="username" 
                className="form-control rounded-pill" 
                placeholder="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} // อัปเดตค่าของ username
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="position-relative">
                <input 
                  type={showPassword ? 'text' : 'password'}  // เปลี่ยนเป็น text ถ้า showPassword เป็น true
                  id="password" 
                  className="form-control rounded-pill" 
                  placeholder="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} // อัปเดตค่าของ password
                  style={{ paddingRight: '30px' }} // เพิ่ม padding ด้านขวาเพื่อหลีกเลี่ยงการทับกัน
                />
                <span 
                  className="position-absolute" 
                  style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                  onClick={() => setShowPassword(!showPassword)}  // สลับสถานะการแสดงรหัสผ่าน 
                >
                    {/* ใช้ Bootstrap Icons */}
                    {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                id="name" 
                className="form-control rounded-pill" 
                placeholder="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} // อัปเดตค่าของ name
              />
            </div>

            {/* ********* Department option *********** */}
            <div className="mb-3">
              <label htmlFor="department" className="form-label">Department</label>
              <select
                id="department"
                className="form-control rounded-pill department-select"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value); // อัปเดต department ที่เลือก
                  setPosition(""); // รีเซ็ต position เมื่อเปลี่ยน department
                }}
              >
                <option value="">-- Select Department --</option>
                {departmentArr.map((dept) => (
                  <option key={dept.name} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* *************** Position ******************** */}
            <div className="mb-4">
              <label htmlFor="position" className="form-label">Position</label>
              <select
                id="position"
                className="form-control rounded-pill"
                value={position}
                onChange={(e) => setPosition(e.target.value)} // อัปเดตตำแหน่งงานที่เลือก
                disabled={!department} // ปิดการใช้งานหากยังไม่ได้เลือก department
              >
                <option value="">-- Select Position --</option>
                {selectedDepartment &&
                  selectedDepartment.positions.map((pos, index) => ( // Loop จาก  Positions Array
                    <option key={index} value={pos}>
                      {pos}
                    </option>
                ))}
              </select>
            </div>

            

            {/* Alert Error !! */}
            {errorRegisterForm && (
                <div className="alert alert-danger pb-3" role="alert">
                  {errorRegisterForm}
                </div>
            )}
            <button type="submit" className={`w-100 mb-2 ${styles.registerBtn}`}>Register now</button>
            <Link href="/" className={`btn btn-light w-100  ${styles.backBtn}`} >Back</Link>
          </form>
        </div>
      </div>
    );
}

export default Register;