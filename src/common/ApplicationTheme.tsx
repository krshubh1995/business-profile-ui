import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { useState } from "react";
import React from "react";

type ThemeMode = "light" | "dark";

const setDefaultTheme = () => {
  return localStorage.getItem("ThemeMode")
    ? (localStorage.getItem("ThemeMode") as ThemeMode)
    : "light";
};

interface ThemeContextState {
  toggleThemeMode: any;
  activeTheme: ThemeMode;
}
const initialState: ThemeContextState = {
  toggleThemeMode: () => {},
  activeTheme: "light",
};
const ThemeModeContext = React.createContext(initialState);

export function ApplicationTheme(props: any) {
  const [themeMode, setTheme] = useState<ThemeMode>(setDefaultTheme());
  const theme = createTheme({
    palette: {
      mode: `${themeMode}`,
    },
  });

  const updateTheme = () => {
    const _themeMode: ThemeMode = localStorage.getItem("ThemeMode")
      ? localStorage.getItem("ThemeMode") === "dark"
        ? "light"
        : "dark"
      : "dark";
    localStorage.setItem("ThemeMode", _themeMode);
    setTheme(_themeMode);
  };

  return (
    <ThemeModeContext.Provider
      value={{ toggleThemeMode: updateTheme, activeTheme: themeMode }}
    >
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useApplicationTheme() {
  return React.useContext(ThemeModeContext);
}
