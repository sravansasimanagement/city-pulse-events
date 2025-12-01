import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

interface Props {
  images: string[];
  interval?: number;
}

export default function ImageSlider({ images, interval }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        height: 250,
        position: "relative",
        overflow: "hidden",
        borderRadius: 3,
      }}
    >
      {images.map((img, i) => (
        <Box
          key={i}
          component="img"
          src={img}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: i === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </Box>
  );
}
