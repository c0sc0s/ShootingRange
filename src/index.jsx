import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/main.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1A2332",
    },
    secondary: {
      main: "#3F96A5",
      contrastText: "rgba(0,0,0,0.87)",
    },
    background: {
      default: "#121926",
      paper: "#1A2332",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(214,209,209,0.6)",
      hint: "#d8d8d8",
      disabled: "rgba(243,243,243,0.38)",
    },
  },
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    h5: {
      fontFamily: "Helvetica",
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#fff",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
