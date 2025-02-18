"use client"; // Required for Next.js 15 to use MUI in the app directory

import { useState, useEffect, useMemo } from "react";
import { Box, Switch, FormControlLabel, ThemeProvider, createTheme } from "@mui/material";
import ComponentA from "@/components/chart/PageA";
import ComponentB from "@/components/chart/PageB";
import ComponentC from "@/components/chart/PageC";

export default function SlidingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(true); // Controls slide movement
  const [darkMode, setDarkMode] = useState(false); // Controls theme mode

  const components = [
    { component: <ComponentA />, key: "componentA" },
    { component: <ComponentB />, key: "componentB" },
    { component: <ComponentC />, key: "componentC" },
  ];

  // Create a dynamic theme based on darkMode state
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: darkMode ? "#121212" : "#ffffff",
            paper: darkMode ? "#1E1E1E" : "#f5f5f5",
          },
          text: {
            primary: darkMode ? "#ffffff" : "#000000",
          },
        },
      }),
    [darkMode]
  );

  // Slide component every 5 seconds when enabled
  useEffect(() => {
    let interval;
    if (isSliding) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isSliding]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "background.default",
          color: "text.primary",
          transition: "background-color 0.5s ease-in-out",
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

        {/* Switch Controls */}
        <Box sx={{ position: "absolute", top: "20px", right: "20px", zIndex: 2, display: "flex", gap: 2 }}>
          {/* Slide Control */}
          <FormControlLabel
            control={
              <Switch
                checked={isSliding}
                onChange={(e) => setIsSliding(e.target.checked)}
                color="primary"
              />
            }
            label={isSliding ? "Pause Slide" : "Play Slide"}
            sx={{ color: "text.primary" }}
          />

          {/* Theme Toggle Control */}
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                color="secondary"
              />
            }
            label={darkMode ? "Dark Mode" : "Light Mode"}
            sx={{ color: "text.primary" }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
