import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import { getAuth, signOut } from "firebase/auth";

interface AuthHeaderProps {
  isHome?: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isHome = false }) => {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = "/login";
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
        px: 3,
        py: 2,
      }}
    >
      <LanguageToggle />
      {isHome ? (
        <Link
          to="/profile"
          style={{
            color: "white",
            fontSize: 18,
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Profile
        </Link>
      ) : (
        <Link
          to="/home"
          style={{
            color: "white",
            fontSize: 18,
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Home
        </Link>
      )}

      {/* Sign Out */}
      <button
        onClick={handleLogout}
        style={{
          border: "none",
          padding: "6px 14px",
          borderRadius: "8px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Sign Out
      </button>
    </Box>
  );
};

export default AuthHeader;
