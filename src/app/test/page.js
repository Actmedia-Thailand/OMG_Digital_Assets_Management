"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

// ฟังก์ชันสำหรับสร้างข้อมูลจำลอง
const createData = (name, age) => {
  return { name, age };
};

const MyTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const data = [];
      for (let i = 0; i < 100; i++) {
        data.push(
          createData(`Name ${i + 1}`, Math.floor(Math.random() * 60) + 18)
        );
      }
      return data;
    };

    const fetchData = async () => {
      const generatedData = generateData();
      setData(generatedData);
    };

    fetchData();
  }, []);

  const columns = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
    },
    {
      id: "age",
      header: "Age",
      accessorKey: "age",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnResizing
        initialState={{
          hiddenColumns: [],
        }}
        // Key configuration for table scrolling
        muiTableContainerProps={{
          sx: {
            maxHeight: "calc(80vh - 120px)", // Adjust height to leave space for bottom sections
            overflow: "auto", // Enable scrolling
          },
        }}
        // Ensure bottom toolbar is sticky
        enableBottomToolbar
        positionBottomToolbar="sticky"
        renderBottomToolbarCustomActions={() => (
          <Box
            sx={{
              padding: 1,
              background: "#f5f5f5",
              display: "flex",
              justifyContent: "space-between",
              position: "sticky",
              bottom: 0,
              zIndex: 10,
            }}
          >
            <Typography variant="body2">Rows: {data.length}</Typography>
          </Box>
        )}
      />

      {/* Optional: Fixed Bottom Area */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          background: "#fff",
          padding: 2,
          boxShadow: 1,
          zIndex: 20, // Ensure it's above other elements
        }}
      >
        <Typography variant="body2">Fixed Bottom Area</Typography>
      </Box>
    </Box>
  );
};

export default function Home() {
  return (
    <div>
      <MyTable />
    </div>
  );
}
