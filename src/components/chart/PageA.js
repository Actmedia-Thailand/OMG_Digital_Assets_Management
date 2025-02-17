"use client";

import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Box, Stack } from "@mui/material";

const data = [
  { value: 5, label: "A" },
  { value: 10, label: "B" },
  { value: 15, label: "C" },
  { value: 20, label: "D" },
];

const size = {
  width: 400,
  height: 200,
};

export default function PieArcLabel() {
  return (
    <Stack direction="column" spacing={2}>
<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px", fontSize: "1.5rem", fontWeight: "bold", border: "2px solid black", borderRadius: "8px", boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)", mt: 1 }}>
  Big C
</Box>

      <Box>
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.label} (${item.value})`,
              arcLabelMinAngle: 45,
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              data,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontWeight: "bold",
            },
          }}
          {...size}
        />
      </Box>
    </Stack>
  );
}
