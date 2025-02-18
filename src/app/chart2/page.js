// /chart2/page.js
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  ThemeProvider,
  createTheme,
  Stack,
  CircularProgress,
} from "@mui/material";

// Custom theme to match the dark interface
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2c2c2c",
    },
    secondary: {
      main: "#1e88e5",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

// Helper function to transform API data to the required structure
const transformApiData = (apiData) => {
  if (!apiData || apiData.length === 0) return [];

  // Extract and map the data from API format to our component structure
  const sections = [
    {
      title: "TV signage",
      stores: apiData[0]["Store"] || 0,
      displays: apiData[0]["Displays"] || 0,
      displayStatus: {
        online: apiData[0]["Displays-Online"] || 0,
        offlineHour: apiData[0]["Displays-Offline (1+ hour)"] || 0,
        offlineDay: apiData[0]["Displays-Offline (1+ day)"] || 0,
      },
      tvBoxes: apiData[0]["TV"] || 0,
      tvBoxStatus: {
        online: apiData[0]["Online"] || 0,
        offlineHour: apiData[0]["Offline (1+ hour)"] || 0,
        offlineDay: apiData[0]["Offline (1+ day)"] || 0,
      },
    },
    {
      title: "Category signage",
      stores: apiData[2]["Store"] || 0,
      displays: apiData[2]["Displays"] || 0,
      displayStatus: {
        online: apiData[2]["Displays-Online"] || 0,
        offlineHour: apiData[2]["Displays-Offline (1+ hour)"] || 0,
        offlineDay: apiData[2]["Displays-Offline (1+ day)"] || 0,
      },
      tvBoxes: apiData[2]["Signage"] || 0,
      tvBoxStatus: {
        online: apiData[2]["Online"] || 0,
        offlineHour: apiData[2]["Offline (1+ hour)"] || 0,
        offlineDay: apiData[2]["Offline (1+ day)"] || 0,
      },
    },
    {
      title: "Kiosks",
      stores: apiData[1]["Store"] || 0,
      displays: apiData[1]["Displays"] || 0,
      displayStatus: {
        online: apiData[1]["Displays-Online"] || 0,
        offlineHour: apiData[1]["Displays-Offline (1+ hour)"] || 0,
        offlineDay: apiData[1]["Displays-Offline (1+ day)"] || 0,
      },
      tvBoxes: apiData[1]["Kiosk"] || 0,
      tvBoxStatus: {
        online: apiData[1]["Online"] || 0,
        offlineHour: apiData[1]["Offline (1+ hour)"] || 0,
        offlineDay: apiData[1]["Offline (1+ day)"] || 0,
      },
    },
    {
      title: "Big C - Total",
      stores: apiData[4]["Total Store"] || 0,
      displays: apiData[4]["Displays"] || 0,
      displayStatus: {
        online: apiData[4]["Displays-Online"] || 0,
        offlineHour: apiData[4]["Displays-Offline (1+ hour)"] || 0,
        offlineDay: apiData[4]["Displays-Offline (1+ day)"] || 0,
      },
      tvBoxes: apiData[4]["TV boxes"] || 0,
      tvBoxStatus: {
        online: apiData[4]["TV boxes-Online"] || 0,
        offlineHour: apiData[4]["TV boxes-Offline (1+ hour)"] || 0,
        offlineDay: apiData[4]["TV boxes-Offline (1+ day)"] || 0,
      },
    },
  ];

  return sections;
};

// Status Card Component
const StatusCard = ({ label, value, statusData }) => {
  const { online, offlineHour, offlineDay } = statusData || {};
  const totalOffline = (offlineHour || 0) + (offlineDay || 0);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          bgcolor: "rgba(0,0,0,0.4)",
          p: 2,
          borderRadius: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="h2" component="div" sx={{ fontWeight: "light" }}>
          {value}
        </Typography>
      </Paper>

      {statusData && (
        <Stack direction="row" spacing={0} sx={{ mt: 1 }}>
          <Box
            sx={{
              bgcolor: "#008080",
              flex: 1,
              p: 1,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "white" }}>
              Online
            </Typography>
            <Typography variant="h5" sx={{ color: "white" }}>
              {online}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "#FF6347",
              flex: 1,
              p: 1,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "white" }}>
              Offline
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              (1+ hour)
            </Typography>
            <Typography variant="h5" sx={{ color: "white" }}>
              {offlineHour || 0}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "#DC143C",
              flex: 1,
              p: 1,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "white" }}>
              Offline
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              (1+ day)
            </Typography>
            <Typography variant="h5" sx={{ color: "white" }}>
              {offlineDay || 0}
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

// Section Component
const StatusSection = ({ data }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "rgba(255,255,255,0.05)",
        height: "100%",
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {data.title}
      </Typography>

      <StatusCard label="Stores" value={data.stores} />

      <StatusCard
        label="Displays"
        value={data.displays}
        statusData={data.displayStatus}
      />

      <StatusCard
        label="TV boxes"
        value={data.tvBoxes}
        statusData={data.tvBoxStatus}
      />
    </Paper>
  );
};

// Main Dashboard Component
export default function NetworkStatus() {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        const transformedData = transformApiData(data);
        setDashboardData(transformedData);

        // Set last updated timestamp
        const now = new Date();
        setLastUpdated(now.toLocaleString());
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          color: "text.primary",
        }}
      >
        {/* Header */}
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: "bold", color: "#ff3d00" }}
              >
                OMG!
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{ ml: 0.5, color: "#ff3d00" }}
              >
                DIGITAL
              </Typography>
            </Box>
            <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
              <Typography variant="h6" component="div">
                Big C Thailand - Network status
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              component="img"
              src="/big-c-logo.webp"
              alt="Big C Logo"
              sx={{
                height: 40,
                width: 40,
                borderRadius: 1,
              }}
            />
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "error.dark",
                color: "white",
                textAlign: "center",
              }}
            >
              <Typography variant="h6">Error loading dashboard data</Typography>
              <Typography variant="body1">{error}</Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {dashboardData.map((section, index) => (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <StatusSection data={section} />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Footer Navigation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 4,
              color: "text.secondary",
            }}
          ></Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
