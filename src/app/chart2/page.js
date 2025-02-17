"use client";
import { useEffect } from "react";
import axios from "axios";

export default function ScreensPage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sending GET request to your API
        const response = await axios.get("/api/dashboard");

        // Logging the response data to the console
        console.log(response.data);
      } catch (error) {
        // Handling any errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Calling the function to fetch data when the component mounts
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return <div>Check the console for the data!</div>;
}
