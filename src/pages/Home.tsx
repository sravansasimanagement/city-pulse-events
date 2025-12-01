import React from "react";
import { Container, Box, Typography, Grid, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import EventCard from "../components/EventCard";
import { useEvents } from "../common/hooks/useEvents";
import { useFavorites } from "../common/hooks/useFavorites";
import LanguageToggle from "../components/LanguageToggle";
import background from "../assets/background.png";
import AuthLayout from "../components/AuthHeader";

export default function Home() {
  const { events, loading, fetchEvents } = useEvents();
  const fav = useFavorites();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        py: 5,
      }}
    >
      <AuthLayout isHome />

      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center" textAlign="center" mt={4}>
          <Typography
            variant="h3"
            fontWeight={700}
            color="white"
            sx={{ textShadow: "0px 2px 8px rgba(0,0,0,0.3)" }}
          >
            City Pulse
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <LanguageToggle />

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
          </Stack>

          <Box width={{ xs: "90%", sm: "80%", md: "60%" }}>
            <Paper
              elevation={6}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 3,
                backdropFilter: "blur(4px)",
              }}
            >
              <SearchBar onSearch={(k, c) => fetchEvents(k, c)} />
            </Paper>
          </Box>
        </Stack>

        {loading && (
          <Typography
            mt={4}
            textAlign="center"
            color="white"
            sx={{ opacity: 0.9 }}
          >
            Loading events...
          </Typography>
        )}

        <Box mt={6} pb={5}>
          <Grid container spacing={5}>
            {events.map((e) => (
              <Grid
                item
                key={e.id}
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex" }}
              >
                <EventCard
                  event={e}
                  isFav={fav.isFav(e.id)}
                  onToggle={() => fav.toggle(e.id)}
                  sx={{ flexGrow: 1 }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
