import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useLanguage } from "../i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <FormControl size="small">
      <Select
        value={lang}
        onChange={(e) => setLang(e.target.value as any)}
        sx={{
          color: "white",
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: 1.5,
        }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="ar">Arabic</MenuItem>
      </Select>
    </FormControl>
  );
}
