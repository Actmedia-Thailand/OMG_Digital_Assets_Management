// app/chart2/page.js
"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

// Create a theme with your color palette
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#333",
    },
    secondary: {
      main: "#f50057",
    },
    online: {
      main: "#009688",
      contrastText: "#fff",
    },
    offline: {
      main: "#f44336",
      contrastText: "#fff",
    },
    background: {
      default: "#222",
      paper: "#333",
    },
  },
});

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Process your data
    const fetchData = () => {
      const rawData = [
        {
          TV: 62,
          Online: 59,
          "Offline (1-7 day)": 1,
          "Offline (7+ day)": 2,
          Displays: 836,
          Store: 33,
        },
        {
          Kiosk: 35,
          Online: 31,
          "Offline (1-7 day)": 4,
          "Offline (7+ day)": 0,
          Displays: 35,
          Store: 35,
        },
        {
          Signage: 161,
          Online: 154,
          "Offline (1-7 day)": 7,
          "Offline (7+ day)": 0,
          Displays: 580,
          Store: 67,
        },
        {
          Unknown: 0,
          Online: 0,
          "Offline (1-7 day)": 0,
          "Offline (7+ day)": 0,
          Displays: 0,
          Store: 0,
        },
      ];

      // Transform the data for the dashboard
      const processedData = processData(rawData);
      setData(processedData);
      setIsLoading(false);
    };

    fetchData();

    // Set current date and time
    const date = new Date();
    const formattedDate = `${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}, ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
    setCurrentDate(formattedDate);
  }, []);

  const processData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];

    // Create TV signage data
    const tvSignage = {
      category: "TV signage",
      stores: apiData[0].Store || 0,
      displays: apiData[0].Displays || 0,
      online: apiData[0].Online || 0,
      offline:
        (apiData[0]["Offline (1-7 day)"] || 0) +
        (apiData[0]["Offline (7+ day)"] || 0),
      tvBoxes: apiData[0].TV || 0,
    };

    // Create Kiosks data
    const kiosks = {
      category: "Kiosks",
      stores: apiData[1].Store || 0,
      displays: 0, // No displays for kiosks
      online: apiData[1].Online || 0,
      offline:
        (apiData[1]["Offline (1-7 day)"] || 0) +
        (apiData[1]["Offline (7+ day)"] || 0),
      tvBoxes: apiData[1].Kiosk || 0,
      kiosks: apiData[1].Kiosk || 0,
    };

    // Create Category signage data
    const categorySignage = {
      category: "Category signage",
      stores: apiData[2].Store || 0,
      displays: apiData[2].Displays || 0,
      online: apiData[2].Online || 0,
      offline:
        (apiData[2]["Offline (1-7 day)"] || 0) +
        (apiData[2]["Offline (7+ day)"] || 0),
      tvBoxes: apiData[2].Signage || 0,
    };

    // Calculate totals
    const totalData = {
      category: "Big C - Total",
      stores: Math.max(tvSignage.stores, kiosks.stores, categorySignage.stores),
      displays: tvSignage.displays + categorySignage.displays,
      online: tvSignage.online + kiosks.online + categorySignage.online,
      offline: tvSignage.offline + kiosks.offline + categorySignage.offline,
      tvBoxes: tvSignage.tvBoxes + kiosks.tvBoxes + categorySignage.tvBoxes,
    };

    return [tvSignage, categorySignage, kiosks, totalData];
  };

  const StatCard = ({ label, value, subStats }) => (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        bgcolor: "#424242",
        color: "white",
        borderRadius: 1,
      }}
    >
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ mb: 1, color: "rgba(255,255,255,0.8)" }}
      >
        {label}
      </Typography>
      <Typography
        variant="h2"
        component="div"
        sx={{ mb: 1, fontWeight: "light" }}
      >
        {value}
      </Typography>
      {subStats && (
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box
            sx={{
              bgcolor: theme.palette.online.main,
              flex: 1,
              py: 1,
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="body2">Online</Typography>
            <Typography variant="h6">{subStats.online}</Typography>
          </Box>
          <Box
            sx={{
              bgcolor: theme.palette.offline.main,
              flex: 1,
              py: 1,
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="body2">Offline</Typography>
            <Typography variant="h6">{subStats.offline}</Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );

  const CategorySection = ({ data }) => (
    <Grid item xs={12} md={6} lg={3}>
      <Card sx={{ bgcolor: "#333", color: "white", height: "100%" }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            {data.category}
          </Typography>

          <StatCard label="Stores" value={data.stores} />

          {data.category === "Kiosks" ? (
            <StatCard
              label="Kiosks"
              value={data.kiosks}
              subStats={{ online: data.online, offline: data.offline }}
            />
          ) : (
            <StatCard
              label="Displays"
              value={data.displays}
              subStats={{ online: data.online, offline: data.offline }}
            />
          )}

          <StatCard label="TV boxes" value={data.tvBoxes} />
        </CardContent>
      </Card>
    </Grid>
  );

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                sx={{ mr: 1, fontWeight: "bold", color: "red" }}
              >
                OMG!
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                DIGITAL
              </Typography>
            </Box>
            <Box sx={{ borderLeft: "1px solid #555", pl: 2, ml: 2 }}>
              <Typography variant="h6">
                Big C Thailand - Network status
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Last updated: {currentDate}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              component="img"
              src="/big-c-logo.png"
              alt="Big C Logo"
              sx={{ height: 40 }}
            />
          </Toolbar>
        </AppBar>

        <Box sx={{ bgcolor: "#222", flexGrow: 1, p: 3 }}>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              {data.map((item, index) => (
                <CategorySection key={index} data={item} />
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
