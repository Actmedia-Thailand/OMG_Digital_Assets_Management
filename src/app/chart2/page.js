// /chart2/page.js
"use client";

import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Container,
  AppBar,
  Toolbar,
  ThemeProvider,
  createTheme,
  Stack,
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

// Network status data
const networkData = [
  {
    title: "TV signage",
    stores: 33,
    displays: 836,
    displayStatus: {
      online: 836,
      offlineHour: 0,
      offlineDay: 0,
    },
    tvBoxes: 62,
    tvBoxStatus: {
      online: 59,
      offlineHour: 0,
      offlineDay: 3,
    },
  },
  {
    title: "Category signage",
    stores: 67,
    displays: 580,
    displayStatus: {
      online: 556,
      offlineHour: 6,
      offlineDay: 18,
    },
    tvBoxes: 161,
    tvBoxStatus: {
      online: 153,
      offlineHour: 2,
      offlineDay: 6,
    },
  },
  {
    title: "Kiosks",
    stores: 35,
    displays: 35,
    displayStatus: {
      online: 30,
      offlineHour: 2,
      offlineDay: 3,
    },
    tvBoxes: 35,
    tvBoxStatus: {
      online: 30,
      offlineHour: 2,
      offlineDay: 3,
    },
  },
  {
    title: "Big C - Total",
    stores: 71,
    displays: 1451,
    displayStatus: {
      online: 1422,
      offlineHour: 8,
      offlineDay: 21,
    },
    tvBoxes: 258,
    tvBoxStatus: {
      online: 242,
      offlineHour: 4,
      offlineDay: 12,
    },
  },
];

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
              src="/big-c-logo.png"
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
          <Grid container spacing={3}>
            {networkData.map((section, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <StatusSection data={section} />
              </Grid>
            ))}
          </Grid>

          {/* Footer Navigation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 4,
              color: "text.secondary",
            }}
          >
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
