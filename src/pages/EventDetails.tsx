import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import MapPreview from "../components/MapPreview";
import ImageSlider from "../components/ImageSlider";
import background from "../assets/background.png";
import AuthLayout from "../components/AuthHeader";
import { getEventById } from "../common/api";
import { useFavorites } from "../common/hooks/useFavorites";

export default function EventDetails() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fav = useFavorites();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getEventById(id)
      .then((r) => setData(r))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  if (!data)
    return (
      <Typography textAlign="center" mt={5}>
        No event details found
      </Typography>
    );

  const venue = data._embedded?.venues?.[0];
  const lat = venue?.location?.latitude;
  const lon = venue?.location?.longitude;

  const images = data.images?.map((i) => i.url) || [];

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
        py: 4,
      }}
    >
      <AuthLayout />

      <Container
        maxWidth="md"
        sx={{
          py: 3,
        }}
      >
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" fontWeight={700}>
              {data.name}
            </Typography>

            <IconButton
              onClick={() => fav.toggle(data.id)}
              color={fav.isFav(data.id) ? "error" : "default"}
            >
              {fav.isFav(data.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1} mt={2}>
            <EventIcon fontSize="small" sx={{ opacity: 0.7 }} />
            <Typography variant="body1">
              {data.dates?.start?.localDate}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} mt={1}>
            <LocationOnIcon fontSize="small" sx={{ opacity: 0.7 }} />
            <Typography variant="body1">
              {venue?.name}, {venue?.city?.name}
            </Typography>
          </Stack>

          {(data.info || data.description) && (
            <Typography variant="body2" mt={2}>
              {data.info || data.description}
            </Typography>
          )}
        </Paper>

        {lat && lon && (
          <Paper elevation={3} sx={{ mt: 4, p: 2, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>
              Event Location
            </Typography>
            <MapPreview lat={lat} lon={lon} />
          </Paper>
        )}

        <Divider sx={{ my: 4 }} />

        <Button
          href={data.url}
          target="_blank"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: 2 }}
        >
          Buy Tickets
        </Button>

        {images.length > 0 && (
          <Box mt={4}>
            <ImageSlider images={images} interval={2500} />
          </Box>
        )}
      </Container>
    </Box>
  );
}
