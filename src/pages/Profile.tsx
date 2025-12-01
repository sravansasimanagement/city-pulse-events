import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Divider,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";

import { useFavorites } from "../common/hooks/useFavorites";
import { getEventById } from "../common/api";
import AuthLayout from "../components/AuthHeader";
import background from "../assets/background.png";

export default function Profile() {
  const fav = useFavorites();
  const [favEvents, setFavEvents] = useState<any[]>([]);
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const fullName =
    userData?.user?.displayName ||
    userData?.user?.providerData?.[0]?.displayName ||
    "Guest User";
  const phoneNumber =
    userData?.user?.phoneNumber ||
    userData?.user?.providerData?.[0]?.phoneNumber ||
    "Not Provided";

  useEffect(() => {
    async function loadEvents() {
      const results = [];

      for (const id of fav.items) {
        try {
          const res = await getEventById(id);
          results.push(res);
        } catch (e) {
          console.log("Error loading event:", id);
        }
      }

      setFavEvents(results);
    }

    loadEvents();
  }, [fav.items]);

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
      <AuthLayout />

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              mx: "auto",
              mb: 2,
              bgcolor: "primary.main",
            }}
          >
            {fullName.charAt(0).toUpperCase()}
          </Avatar>

          <Typography variant="h4" fontWeight={700}>
            {fullName}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Welcome to the Event App
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Name: {fullName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Phone: {phoneNumber}
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <FavoriteIcon color="error" />
            <Typography variant="h5" fontWeight={600}>
              Favorite Events ({fav.items.length})
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {fav.items.length === 0 ? (
            <Typography textAlign="center" color="text.secondary" py={3}>
              You have no favorite events yet.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {favEvents.map((event) => {
                const venue = event?._embedded?.venues?.[0];
                const date = event?.dates?.start?.localDate;

                return (
                  <Grid item xs={12} sm={6} md={4} key={event.id}>
                    <Card
                      elevation={2}
                      sx={{
                        borderRadius: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "0.2s",
                        "&:hover": { transform: "scale(1.02)" },
                      }}
                    >
                      <CardHeader
                        title={event.name}
                        titleTypographyProps={{
                          variant: "h6",
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                        sx={{ pb: 0 }}
                      />

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Stack spacing={1} mt={1}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <EventIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                            <Typography variant="body2">{date}</Typography>
                          </Box>

                          <Box display="flex" alignItems="center" gap={1}>
                            <LocationOnIcon
                              sx={{ fontSize: 18, opacity: 0.7 }}
                            />
                            <Typography variant="body2">
                              {venue?.name || "Unknown Venue"}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>

                      <Box textAlign="center" pb={2}>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => fav.toggle(event.id)}
                          sx={{ borderRadius: 2 }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
