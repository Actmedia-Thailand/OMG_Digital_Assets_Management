"use client";

// pages/register.js
import React from 'react';
import { useState,useEffect} from "react";
// import Link from 'next/link';
import './permission.css';
import { useRouter } from 'next/navigation'; // ใช้ next/navigation สำหรับ App Router
import axios from "axios";  // ใช้เรียก api
import Swal from 'sweetalert2'; // Import SweetAlert2

// import Header from '@/components/header';
import Footer from '@/components/footer';
import Topbar from '@/components/topbar';
import ProtectedRoute from '@/components/protectedRoute';
import Loader2 from '@/components/loader2';

const Permission = () => {
    const [level, setLevel] = useState({});
    const [levelAuthorizer, setLevelAuthorizer] = useState();
    const [loading, setLoading] = useState(true); // สถานะสำหรับ Loading
    const [usersData, setUsersData] = useState([]); // เก็บข้อมูล All user จาก api
    const [filteredUsers, setFilteredUsers] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter(); // Use redirect page

    // ทำงานแค่ครั้งเดียวเมื่อคอมโพเนนต์โหลด Get api ข้อมูลผู้ให้สิทธิ์ และ All user   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    useEffect(() => { 
        const user_level = localStorage.getItem("level"); // ดึง Token จาก localStorage
        const token = localStorage.getItem("access_token"); // ดึง Token จาก localStorage
        const username = localStorage.getItem("username"); // ดึง Token จาก localStorage
        // console.log(user_level);
        if(user_level === "1" || user_level === "2"){
            localStorage.removeItem("user_id");
            localStorage.removeItem("access_token");
            localStorage.removeItem("username");
            localStorage.removeItem("name");
            localStorage.removeItem("department");
            localStorage.removeItem("position");
            localStorage.removeItem("level");
            router.push("/"); // ถ้าไม่มี Token or  username ให้ Redirect ไปหน้า Login
        }else if ((!token) || (!username)) {
            router.push("/"); // ถ้าไม่มี Token or  username ให้ Redirect ไปหน้า Login
        }else{

            // *************************************   Get Api >> Authorizer user ข้อมูลผู้ให้สิทธิ์  ********************************************************
            const user_id = localStorage.getItem('user_id');  // Get user_id ที่เก็บใน localstorage
            axios.get(`http://127.0.0.1:8000/users/${user_id}`)
            .then((response) => {
            console.log(response.data); //   ******* ข้อมูลจะอยู่ใน `response.data` ********
            setLevelAuthorizer(response.data.level)
            //   setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
            })
            .catch((error) => {
            console.error(error); // จัดการข้อผิดพลาด
            setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
            });

            // ************************* Get Api >> ALL USER  ผู้ใช้ทั้งหมดที่อยู่ Department เดียวกับผู้ให้สิทธิ์ *************************
            const departmentAuthorizer = localStorage.getItem('department'); // ดึง department จาก localStorage
            const level = localStorage.getItem('level'); // ดึง level จาก localStorage       
            axios.get(`http://127.0.0.1:8000/users`)
            .then((responseAllUser) => {

                const allUsers = responseAllUser.data;
                // ***************** กรองข้อมูลตาม level ************************************
                if (level === "3") {
                    // หาก level = 3 กรองข้อมูลโดยเปรียบเทียบ department ของผู้ให้สิทธิ์ และไม่แสดง user ผู้ให้สิทธิ์ *************************************
                    const filteredByDepartment = allUsers.filter((user) => user.department === departmentAuthorizer && user.id != user_id);
                    setUsersData(filteredByDepartment); // ตั้งค่าข้อมูลที่กรองแล้ว
                    setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
                } else if (level === "4") { // Admin *************************************
                    // หาก level = 4 ให้แสดงข้อมูลทั้งหมด
                    setUsersData(allUsers); // ใช้ข้อมูลผู้ใช้ทั้งหมด
                    setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
                }else{
                    // หาก level ไม่เข้าเงื่อนไข  setUsersData ให้ว่าง ******************
                    setUsersData([]); // ใช้ข้อมูลผู้ใช้ทั้งหมด
                    setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
                }
                //   console.log(responseAllUser.data); //   ******* ข้อมูลจะอยู่ใน `responseAllUser.data` ********
                //   setUsersData(responseAllUser.data) // setUsersData กรณีดึงข้อมูล User มาแสดงทั้งหมด 
                // setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
            })
            .catch((AllUserError) => {
            console.error(AllUserError); // จัดการข้อผิดพลาด
            // router.push("/"); // ถ้าไม่มี Token ให้ Redirect ไปหน้า Login
            window.location.reload();
            setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
            });
        }
    }, []);
    // console.log("set"+levelAuthorizer);
    // console.log(usersData);// Debug เชคข้อมูล All user ที่ดึงมาจาก api เก็บใน useState >> usersData *****************

    // useEffect สำหรับการกรองข้อมูล Filter ++++++++++++++++++++++++++++++++++++++++++
    useEffect(() => {
        const filtered = usersData.filter((user) => {
            return (
                (typeof user.name === 'string' && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (typeof user.username === 'string' && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (typeof user.department === 'string' && user.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (typeof user.position === 'string' && user.position.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        });
        setFilteredUsers(filtered); // ตั้งค่าข้อมูลที่กรองแล้ว
    }, [searchQuery, usersData]); // ทำงานทุกครั้งที่ searchQuery หรือ usersData เปลี่ยน
  
    // อัปเดต searchQuery ทันทีที่พิมพ์  ++++++++++++++++++++++++++++++++
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); 
    };

    // ฟังก์ชันจัดการเมื่อเปลี่ยน Level
    const handleLevelChange = (e, userId) => {
        const newLevel = e.target.value;
        setLevel((prevLevels) => ({
            ...prevLevels,
            [userId]: newLevel, // อัปเดตค่าของ userId
        }));
        // console.log(`User ID: ${userId}, New Level: ${newLevel}`); // Debug
    };

    // ฟังก์ชันบันทึกข้อมูลให้สิทธิ์ User Level ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const handleSave = (id,name) => {
        const selectedLevel = Number(level[id]);  // แปลงเป็นจำนวนเต็ม
        const userId = id;  // เก็บ id ไว้ในตัวแปรแยก
        const userName = name;  // เก็บ  name ไว้ในตัวแปรแยก
        console.log("Saving user with ID:", id, "Level:", selectedLevel);
        // console.log(level)
        console.log(userName)

        // +-+-+-+-+-+-+-+-+-+-+- ส่ง API ที่นี่   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
        if (!selectedLevel) { //เชคค่าใน selectedLevel ว่าไม่ว่าง
            Swal.fire(
                'Warning!',
                'Please select a level before saving.',
                'warning'
            );
            return;  // หยุดการทำงานหากไม่มีค่าของ level
        }else{
            setLoading(true); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
            // ส่งข้อมูลไปยัง API  *******************************************************************
            // console.log(userId)
            axios.put(`http://127.0.0.1:8000/users/${userId}`,{ level:selectedLevel },{
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log("Level update successful:", response.data);
                setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
                Swal.fire({
                    title: 'Success!',
                    html: `Permissions assigned to <b>${userName}</b> successfully.`, // ใช้ <b> เพื่อทำให้ตัวแปรเป็นตัวหนา
                    icon: 'success',
                });
                
                

                // window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                // console.log("Level update failed:", error.message);
                Swal.fire(   // alert เตือนไม่สามารถให้สิทธิ์ได้
                    'Error!',
                    'Unable to assign permissions to the user.',
                    'error'
                );
                setLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
            });        
        }
    };
    
    // แสดง Loading ระหว่างโหลด
    if (loading) {
      return <div><Loader2/></div>;
    }


    return (
        <>
        {/* <ProtectedRoute> */}
        <Topbar fixedTop="fixed-top"/>
            <div className="d-flex justify-content-center min-vh-100 bg-light  mt-5">
                <div className="container py-5">
                    <h4 className="mb-4">Permission Management</h4>
                    {/* Search Box */}
                    <div className="search-box mb-4">
                        <div className="row justify-content-end">
                            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-search"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0 ps-0"
                                        placeholder="Search ..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        aria-label="Search"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End search box */}
                    {/* Data Table ++++++++++++++++++++++++++++++++++ */}
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
                            {/* filter new ******************** */}
                            <tbody>
                                {/* <p>{levelAuthorizer}</p> */}
                            
                                {filteredUsers && filteredUsers.length > 0 ? (
                                    filteredUsers.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>{user.department}</td>
                                            <td>{user.position}</td>
                                            <td>
                                                {
                                                    levelAuthorizer === 3 ? (
                                                    // ถ้า levelAuthorizer = 3 ให้แสดงตัวเลือกเฉพาะ User และ User plus
                                                    <select 
                                                        className="form-select" 
                                                        value={level[user.id] || user.level} // ถ้าไม่มีใน levels ให้ใช้ค่าเดิมจาก user.level
                                                        onChange={(e) => handleLevelChange(e, user.id)} 
                                                    >
                                                        <option value="1">User</option>
                                                        <option value="2">User plus</option>
                                                    </select>
                                                    ) : levelAuthorizer === 4 ? (
                                                    // ถ้า levelAuthorizer = 4 ให้แสดงตัวเลือกทั้งหมด
                                                    <select 
                                                        className="form-select" 
                                                        value={level[user.id] || user.level} // ถ้าไม่มีใน levels ให้ใช้ค่าเดิมจาก user.level
                                                        onChange={(e) => handleLevelChange(e, user.id)} 
                                                    >
                                                        <option value="1">User</option>
                                                        <option value="2">User plus</option>
                                                        <option value="3">General</option>
                                                        <option value="4">Admin</option>
                                                    </select>
                                                    ) : (
                                                    // กรณีอื่นๆ (ถ้า levelAuthorizer ไม่ใช่ 3 หรือ 4)
                                                    <select 
                                                        className="form-select" 
                                                        value={level[user.id] || user.level} // ถ้าไม่มีใน levels ให้ใช้ค่าเดิมจาก user.level
                                                        onChange={(e) => handleLevelChange(e, user.id)} 
                                                        disabled // เพิ่ม disabled เพื่อปิดการใช้งาน select
                                                    >
                                                        <option value="1">User</option>
                                                    </select>
                                                    )
                                                }
                         
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-success btn-sm" 
                                                    onClick={() => handleSave(user.id,user.name)} 
                                                >
                                                    Save
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) :  filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            {/* แสดงข้อความ "ไม่พบข้อมูลที่ตรงกับการค้นหา" เมื่อไม่มีข้อมูลที่กรอง */}
                                            <span>ไม่พบข้อมูล</span>
                                        </td>
                                    </tr>
                                ) : ( 
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            {/* แสดงข้อความ loading ที่มีการเคลื่อนไหว */}
                                            <span className="loading-text">Loading ...</span>
                                        </td>
                                    </tr>   
                                )}
                            </tbody>
                            {/* End tbody */}
                        </table>
                    </div>
                    {/* End data table +++++++++++++++++++++ */}
                </div>
            </div>
        <Footer/>
        {/* </ProtectedRoute> */}
        </>
    );
}

export default Permission;