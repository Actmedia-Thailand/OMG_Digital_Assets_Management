"use client"; // Required for Next.js 15 to use MUI in app directory

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ComponentA from "@/components/chart/PageA";
import ComponentB from "@/components/chart/PageB";
import ComponentC from "@/components/chart/PageC";

export default function SlidingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const components = [
    { component: <ComponentA />, key: "componentA" },
    { component: <ComponentB />, key: "componentB" },
    { component: <ComponentC />, key: "componentC" },
  ];

  // Change the component every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {components.map((item, index) => (
        <Box
          key={item.key}
          sx={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            left: 0,
            top: 0,
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          {item.component}
        </Box>
      ))}
    </Box>
  );
}