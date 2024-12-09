"use client";

// pages/register.js
import React from 'react';
import { useState,useEffect} from "react";
import Link from 'next/link';
import './permission.css';
import Image from 'next/image';  // รูปแบบ Next ทำให้โหลดเร็ว
// import { useRouter } from 'next/navigation'; // ใช้ next/navigation สำหรับ App Router
import axios from "axios";  // ใช้เรียก api
import Swal from 'sweetalert2'; // Import SweetAlert2

// import Header from '@/components/header';
import Footer from '@/components/footer';
import Topbar from '@/components/topbar';
import ProtectedRoute from '@/components/protectedRoute';
import Loader2 from '@/components/loader2';

const Permission = () => {
    // ใช้ useState เก็บข้อมูลจากฟอร์ม +++++++++++++++++++++++++++++++++++++
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [nameSecond, setNameSecond] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [level, setLevel] = useState('1');
    const [loading, setLoading] = useState(true); // สถานะสำหรับ Loading
    const [isEditable, setIsEditable] = useState(false); // ค่าเริ่มต้นคือ disabled
    const [usernameCheck, setUsernameCheck] = useState(null);
    const [usersData, setUsersData] = useState([]); // เก็บข้อมูล All user จาก api
    
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    // ทำงานแค่ครั้งเดียวเมื่อคอมโพเนนต์โหลด   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    useEffect(() => {

        // ตรวจสอบว่าโค้ดกำลังรันใน Client-side ************************
        if (typeof window !== "undefined") {
          const username = localStorage.getItem("username");
          setUsernameCheck(username);
        }

        // *************************************   Get Api >> Authorizer user ข้อมูลผู้ให้สิทธิ์  ********************************************************
        const user_id = localStorage.getItem('user_id');  // Get user_id ที่เก็บใน localstorage
        axios.get(`http://127.0.0.1:8000/users/${user_id}`)
        .then((response) => {
        //   console.log(response.data); //   ******* ข้อมูลจะอยู่ใน `response.data` ********
        //   setUsername(response.data.username); //เก็บข้อมูลจาก api เก็บลง UseState
        //   setName(response.data.name);  //เก็บข้อมูลจาก api เก็บลง UseState
        //   setNameSecond(response.data.name);  //เก็บข้อมูลจาก api เก็บลง UseState
        //   setDepartment(response.data.department);  //เก็บข้อมูลจาก api เก็บลง UseState
        //   setPosition(response.data.position);  //เก็บข้อมูลจาก api เก็บลง UseState
          setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
        })
        .catch((error) => {
          console.error(error); // จัดการข้อผิดพลาด
          setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
        });

        // ************************************   Get Api >> ALL USER  ผู้ใช้ทั้งหมด **************************************************
        axios.get(`http://127.0.0.1:8000/users`)
        .then((responseAllUser) => {
        //   console.log(responseAllUser.data); //   ******* ข้อมูลจะอยู่ใน `responseAllUser.data` ********
          setUsersData(responseAllUser.data)
          setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
        })
        .catch((AllUserError) => {
          console.error(AllUserError); // จัดการข้อผิดพลาด
          // router.push("/"); // ถ้าไม่มี Token ให้ Redirect ไปหน้า Login
          window.location.reload();
          setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
        });

        // const filtered = usersData.filter((user) => {
        //     return (
        //         (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        //         (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
        //         (user.department && user.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
        //         (user.position && user.position.toLowerCase().includes(searchQuery.toLowerCase()))
        //     );
        // });
        // setFilteredUsers(filtered);  // ตั้งค่าข้อมูลที่กรองแล้ว

    }, [searchQuery, usersData]);  // ทำงานเมื่อ searchQuery หรือ usersData เปลี่ยน

    console.log(usersData);// Debug เชคข้อมูล All user ที่ดึงมาจาก api เก็บใน useState >> usersData *****************

    // อัปเดต searchQuery ทันทีที่พิมพ์  ++++++++++++++++++++++++++++++++
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); 
    };

    //EDIT PROFILE FORM เมื่อ click save change button +-+-+-+-+-+-+-+-+-+-+-+--++--+-++-+-
    // const handleSaveChange = (e) => {
    //     e.preventDefault();

    //     // Validate ข้อมูลก่อนเรียก API
    //     if (!username.trim() || !name.trim() || !department.trim() || !position.trim()) {
    //       setErrorProfileForm('All fields are required.')
    //       return; // หยุดการทำงานถ้าข้อมูลไม่ครบ
    //     }else{
    //       setErrorProfileForm('')
    //       window.location.reload(); // reload หน้า หลังกด Save change
    //     }


    //     //เก็บข้อมูลจาก Form รวมเป็น Object
    //     const ProfileFormObj = { 
    //     username: username,
    //     name: name,
    //     department: department,
    //     position: position,
    //     level: Number(level)
    //     };


    //     // เรียก API ด้วย axios ++++++++++++++++++++++++++++++++++++++++++++++
    //     const user_id = localStorage.getItem('user_id');  // Get user_id ที่เก็บใน localstorage
    //     axios.put(`http://127.0.0.1:8000/users/${user_id}`, ProfileFormObj, {
    //       headers: {
    //           'Content-Type': 'application/json'
    //       }
    //     })

    //     .then((response) => {
    //     console.log("Edit Profile successful:", response.data);

    //     })
    //     .catch((error) => {
    //     console.error("Edit Profile failed:", error.response.data.detail);

    //       // Alert เตือนเมื่อเกิดข้อผิดพลาดในการ Edit Profile เช่น  Not found user
    //       Swal.fire({  // Library alert warning
    //           icon: 'warning', // Warning icon
    //           title: error.response.data.detail,
    //           confirmButtonText: 'OK', // Confirmation button
    //           customClass: {
    //           title: 'swal2-title',
    //           content: 'swal2-content',
    //           confirmButton: 'swal2-confirm',
    //           },
    //       });
    //     });
    // };


    // แสดง Loading ระหว่างโหลด
    if (loading) {
      return <div><Loader2/></div>;
    }


  return (
    <>
    <ProtectedRoute>
    <Topbar fixedTop="fixed-top"/>
    <div className="d-flex justify-content-center min-vh-100 bg-light  mt-5">
        <div className="container py-5">
            <h4 className="mb-4">Permission Management</h4>
            <div className="search-box d-flex justify-content-end">
                <div className="col-12 col-md-12 col-xl-4 mb-3">
                    {/* เพิ่ม onChange และ bind searchQuery */}
                    <input
                        type="text"
                        className="form-control form-control-sm"  // ใช้ form-control-sm เพื่อทำให้ input เล็กลง
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Data Table ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
            <div className="table-responsive table-container">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Dapartment</th>
                            <th>Position</th>
                            <th>Level</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='d-none'>
                        {usersData && usersData.length > 0 ? (
                            usersData.map((user,index) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.department}</td>
                                <td>{user.position}</td>
                                <td>
                                <select 
                                    className="form-select" 
                                    value={user.level} 
                                    onChange={(e) => handleLevelChange(e,user.id)} 
                                >
                                    <option value="1">User</option>
                                    <option value="2">User plus</option>
                                    <option value="3">General</option>
                                    <option value="4">Admin</option>
                                </select>
                                </td>
                                <td>
                                <button 
                                    className="btn btn-success btn-sm" 
                                    onClick={() => handleSave(user.id)}  
                                >
                                    Save
                                </button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    {/* แสดงข้อความ loading ที่มีการเคลื่อนไหว */}
                                    <span className="loading-text">Loading ...</span>
                                </td>
                            </tr>
                        )}
                    </tbody>

                    {/* test */}
                    <tbody className=''>
                        {filteredUsers && filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.department}</td>
                                    <td>{user.position}</td>
                                    <td>
                                        <select 
                                            className="form-select" 
                                            value={user.level} 
                                            onChange={(e) => handleLevelChange(e, user.id)} 
                                        >
                                            <option value="1">User</option>
                                            <option value="2">User plus</option>
                                            <option value="3">General</option>
                                            <option value="4">Admin</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-success btn-sm" 
                                            onClick={() => handleSave(user.id)}  
                                        >
                                            Save
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No results found</td>
                            </tr>
                        )}
                    </tbody>



                </table>
            </div>
            {/* End data table */}

        </div>
    </div>
    <Footer/>
    </ProtectedRoute>
    </>
  );
}

export default Permission;