import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import { Link } from "react-router-dom";

export default function EventCard({
  event,
  isFav,
  onToggle,
  sx,
}: {
  event: any;
  isFav: boolean;
  onToggle: () => void;
  sx?: any;
}) {
  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        Width: "100%",
        height: "100%",
        borderRadius: 3,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
        ...sx,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {event.name}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <EventIcon fontSize="small" sx={{ opacity: 0.7 }} />
          <Typography variant="body2" color="text.secondary">
            {event.date}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <LocationOnIcon fontSize="small" sx={{ opacity: 0.7 }} />
          <Typography variant="body2" color="text.secondary">
            {event.venue} • {event.city}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          component={Link}
          to={`/event/${event.id}`}
          size="small"
          variant="contained"
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Details
        </Button>

        <IconButton onClick={onToggle} color={isFav ? "error" : "default"}>
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
