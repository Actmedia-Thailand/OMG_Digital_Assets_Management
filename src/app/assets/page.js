"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Loader2 from "@/components/loader2";
import Table6 from "@/components/table6";
import { useAssets } from "@/hook/useAssets";
import { useViews } from "@/hook/useViews";
import ProtectedRoute from "@/components/protectedRoute"; // Protect route if user don't have token
import Table7 from "@/components/table7";

const Assets = () => {
  const [showSidebarLeft, setShowSidebarLeft] = useState(false); // Left sidebar  สำหรับเก็บตัวส่ง prop ไปให้ Header and Table6
  const [showSidebarRight, setShowSidebarRight] = useState(true); // Right sidebar  สำหรับเก็บตัวส่ง prop ไปให้ Header and Table6
  const { data, isLoading, isError, error } = useAssets();
  const {
    data: dataView,
    isLoading: isLoadingView,
    isError: isErrorView,
    error: errorView,
  } = useViews();
  const [views, setViews] = useState(dataView);
  useEffect(() => {
    if (dataView) {
      setViews(dataView); // อัปเดต tableData เมื่อ assets เปลี่ยน
    }
  }, [dataView]);

  if (isLoading || isLoadingView) {
    return <Loader2 />;
  }

  if (isError) return <p>Error: {error.message}</p>;
  if (isErrorView) return <p>Error: {errorView.message}</p>;

  const storeSection = [
    "-",
    "Basket holder",
    "Category signage",
    "Chiller",
    "Control room - Video",
    "Food court",
    "HB",
    "HBA 9",
    "Kiosk",
    "LED - Entrance Aisle",
    "LED-Billboard",
    "Nine",
  ];

  const displayAspectRatio = ["1080x1920", "1344x768", "1920x1080", "1920x540"];

  const retailers = [
    "CJ More",
    "CJ Express",
    "FamilyMart",
    "Tesco",
    "Tops",
    "Big C",
    "Tesco Lotus",
    "Makro",
  ];

  const columns = [
    {
      accessorKey: "MACADDRESS",
      header: "MAC Address",
      muiEditTextFieldProps: {
        required: true,
        // ตรวจสอบการกรอกข้อมูลในขณะที่กรอก (onInput หรือ onChange)
        onInput: (event) => {
          const value = event.target.value;
          // แทนที่อักขระที่ไม่ใช่ A-Z หรือ 0-9
          const regex = /[^A-Z0-9]/g; // หาตัวอักษรที่ไม่ใช่ A-Z หรือ 0-9
          event.target.value = value.replace(regex, ""); // ลบตัวอักษรที่ไม่ต้องการ
        },
        // แสดงข้อความ error เมื่อมีการกรอกข้อมูลผิด
        error: false, // แค่บล็อกตัวอักษรผิดในระหว่างการกรอกข้อมูล
        helperText: "Please type only A-Z and 0-9",
      },
    },
    {
      accessorKey: "TimeStamp (Last)",
      header: "Last Timestamp",
      muiEditTextFieldProps: {
        required: true,
        onInput: (event) => {
          const value = event.target.value;
          const numericRegex = /[^0-9]/g;
          event.target.value = value.replace(numericRegex, ""); // ลบตัวอักษรที่ไม่ใช่ตัวเลข
        },
        onBlur: (event) => {
          const value = event.target.value;
          if (value.length < 13) {
            alert("Timestamp must be at least 13 digits long.");
          }
        },
        helperText: "Please type only numbers (0-9) with at least 13 digits",
      },
    },
    {
      accessorKey: "Playbox Label",
      header: "Playbox Label",
      muiEditTextFieldProps: { require: true },
    },
    {
      accessorKey: "Store Location",
      header: "Store Location",
      muiEditTextFieldProps: { require: true },
    },
    {
      accessorKey: "Store Section",
      header: "Store Section",
      filterVariant: "select",
      filterSelectOptions: storeSection, // predefined options
      editVariant: "select",
      editSelectOptions: storeSection,
      muiEditTextFieldProps: {
        select: true, // Use a select dropdown
      },
    },
    { accessorKey: "StoreCode", header: "Store Code" },
    { accessorKey: "RUNNO(Some)", header: "Run Number" },
    { accessorKey: "GroupID", header: "Group ID" },
    { accessorKey: "GroupName", header: "Group Name" },
    { accessorKey: "TimeStamp (Last Run)", header: "Last Run Timestamp" },
    { accessorKey: "Black Condition", header: "Black Condition" },
    {
      accessorKey: "Retailer",
      header: "Retailer",
      filterVariant: "select",
      filterSelectOptions: retailers, // predefined options
      editVariant: "select",
      editSelectOptions: retailers,
      muiEditTextFieldProps: {
        select: true, // Use a select dropdown
      },
    },
    { accessorKey: "Category", header: "Category" },
    {
      accessorKey: "DisplayConnected",
      header: "Display Connected",
      filterVariant: "range",
    },
    {
      accessorKey: "Display AspectRatio",
      header: "Display Aspect Ratio",
      size: 300,
      filterVariant: "select",
      filterSelectOptions: displayAspectRatio, // predefined options
      editVariant: "select",
      editSelectOptions: displayAspectRatio,
      muiEditTextFieldProps: {
        select: true, // Use a select dropdown
      },
    },
    { accessorKey: "Display Arrangement", header: "Display Arrangement" },
    { accessorKey: "Display Position", header: "Display Position" },
    { accessorKey: "ConnectVia", header: "Connect Via" },
    { accessorKey: "wifiSSID", header: "Wi-Fi SSID" },
    { accessorKey: "ProjectName", header: "Project Name" },
    {
      accessorKey: "screen Position Side",
      header: "Screen Position Side",
      size: 300,
    },
    { accessorKey: "setMacAddress", header: "Set MAC Address" },
    { accessorKey: "Phone", header: "Phone" },
    { accessorKey: "DongleWifi", header: "Dongle Wi-Fi" },
    {
      accessorKey: "createdOn",
      header: "Created On",
      filterVariant: "date-range",
    },
  ];

  // แสดงข้อมูลเมื่อโหลดสำเร็จ
  return (
    <>
      <ProtectedRoute>
        <div className="d-flex flex-column vh-100 overflow-hidden position-relative">
          <Header
            showSidebarLeft={showSidebarLeft}
            setShowSidebarLeft={setShowSidebarLeft}
            showSidebarRight={showSidebarRight}
            setShowSidebarRight={setShowSidebarRight}
          />
          <div
            className="flex-grow-1"
            style={{
              overflowX: "clip",
              width: "100%",
              marginTop: "135px",
              padding: "20px",
              position: "absolute",
              top: 0,
              bottom: "50px", // ให้เหลือพื้นที่สำหรับ Footer
              overflowY: "hidden",
            }}
          >
            <Table7
              data={data}
              columns={columns}
              views={views}
              setViews={setViews}
              showSidebarLeft={showSidebarLeft}
              setShowSidebarLeft={setShowSidebarLeft}
              showSidebarRight={showSidebarRight}
              setShowSidebarRight={setShowSidebarRight}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "50px", // ความสูงของ Footer
            }}
          >
            <Footer />
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Assets;
