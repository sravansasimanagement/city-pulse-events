import React from "react";
import { Card, CardHeader, CardContent, Box } from "@mui/material";

interface MapPreviewProps {
  lat: string | number;
  lon: string | number;
}

export default function MapPreview({ lat, lon }: MapPreviewProps) {
  const q = `${lat},${lon}`;
  const url = `https://www.google.com/maps?q=${q}&output=embed`;

  return (
    <Card sx={{ mt: 2, borderRadius: 3, overflow: "hidden" }}>
      <CardHeader
        title="Map Preview"
        titleTypographyProps={{ fontSize: 18, fontWeight: 600 }}
      />

      <CardContent sx={{ p: 0 }}>
        <Box sx={{ width: "100%", height: 300 }}>
          <iframe
            title="map"
            src={url}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </Box>
      </CardContent>
    </Card>
  );
}
