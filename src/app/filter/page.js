"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component

import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Table6 from "@/components/table6";
import { useAssets } from "@/hook/useAssets";
import { useViews } from "@/hook/useViews";

const InventoryPage = () => {
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

  // กรณีข้อมูลยังไม่ถูกโหลด
  if (isLoading || isLoadingView) {
    return <Loader />;
  }

  if (isError) return <p>Error: {error.message}</p>;
  if (isErrorView) return <p>Error: {errorView.message}</p>;

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    {
      accessorKey: "gender",
      header: "Gender",
      filterFn: "equals",
      filterSelectOptions: ["Male", "Female", "Other"],
      filterVariant: "select",
    },
    { accessorKey: "age", header: "Age", filterVariant: "range" },
    { accessorKey: "job_title", header: "Job Title" },
    { accessorKey: "salary", header: "Salary", filterVariant: "range" },
    { accessorKey: "start_date", header: "Start Date" },
    { accessorKey: "end_date", header: "End Date" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "country", header: "Country" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone_number", header: "Phone Number" },
    {
      accessorKey: "createdOn",
      header: "Created At",
      filterVariant: "date-range",
    },
  ];

  // แสดงข้อมูลเมื่อโหลดสำเร็จ
  return (
    <div className="d-flex flex-column">
      <div style={{ height: "100px" }}></div> {/* สำหรับความสูงเต็มหน้าจอ */}
      <Table6 data={data} columns={columns} views={views} setViews={setViews} />
    </div>
  );
};

export default InventoryPage;
