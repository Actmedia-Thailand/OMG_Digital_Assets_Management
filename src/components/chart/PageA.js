"use client";

import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Box, Stack } from "@mui/material";
import { Label } from "@mui/icons-material";

const data = [
  { value: 30, color: "#1ce500" },
  { value: 10, color: "red" },
  { value: 1, color: "darkred" }, // Black-red color
];

const size = {
  width: 400,
  height: 600,
};

export default function PieArcLabel() {
  return (
    <Stack direction="column" spacing={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          fontSize: "1.5rem",
          fontWeight: "bold",
          border: "2px solid black",
          borderRadius: "8px",
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
          mt: 1,
        }}
      >
        Big C
      </Box>

      <Box sx={{ width: "100%", height: "100%", background: "yellow" }}>
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.value}`, // Only show the value
              arcLabelMinAngle: 45,
              innerRadius: 40,
              outerRadius: 120,
              paddingAngle: 5,
              cornerRadius: 5,
              data,
              colors: data.map((item) => item.color), // Apply colors
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontWeight: "bold",
              fontSize: "20px", // Make numbers larger and more visible
            },
          }}
          {...size}
        />
      </Box>
    </Stack>
  );
}
