import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/home"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        flexDirection: "column",
        textAlign: "center",
        color: "#ffffff",
        textShadow: "0px 2px 8px rgba(0,0,0,0.7)",
      }}
    >
      <Typography
        variant="h2"
        fontWeight={700}
        sx={{
          color: "black",
          textShadow: "0 0 8px rgba(255, 235, 59, 0.7)",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      >
        City Pulse
      </Typography>

      <Typography
        variant="h6"
        mt={1}
        sx={{
          color: "#ffffff",
          textShadow: "0 0 6px rgba(0,0,0,0.6)",
          animation: "fadeInUp 1.5s ease forwards",
          opacity: 0,
        }}
      >
        Local Events Explorer
      </Typography>
      <style>
        {`
          @keyframes pulse {
            0% { text-shadow: 0 0 5px rgba(255,235,59,0.5); }
            50% { text-shadow: 0 0 20px rgba(255,235,59,1); }
            100% { text-shadow: 0 0 5px rgba(255,235,59,0.5); }
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default Splash;
