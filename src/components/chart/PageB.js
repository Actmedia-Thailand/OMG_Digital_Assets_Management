"use client"; 

import { Box, Typography } from "@mui/material";

export default function ComponentB() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" color="white" fontWeight="bold">
        Component B
      </Typography>
    </Box>
  );
}
