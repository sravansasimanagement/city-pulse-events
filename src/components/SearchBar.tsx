import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

interface Props {
  onSearch: (keyword: string, city: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <TextField
        fullWidth
        label="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        variant="outlined"
      />

      <TextField
        fullWidth
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        variant="outlined"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => onSearch(keyword, city)}
        sx={{ minWidth: 120 }}
      >
        Search
      </Button>
    </Stack>
  );
}
