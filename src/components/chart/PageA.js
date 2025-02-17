"use client"; 

import { Box, Typography } from "@mui/material";

export default function ComponentA() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "orange",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" color="white" fontWeight="bold">
        Component A
      </Typography>
    </Box>
  );
}
