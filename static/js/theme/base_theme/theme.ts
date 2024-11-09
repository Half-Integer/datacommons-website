// Breakpoints
import { Breakpoints, Theme } from "./types";

const BREAKPOINTS: Breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1068,
  xl: 1350,
};

const theme: Theme = {
  breakpoints: BREAKPOINTS,
  colors: {
    primary: "#0b57d0",
    secondary: "#004a77",
    background: "#f5f5f5",
    text: "#212529",
  },
  typography: {
    fontFamily: "'Google Sans Text', Arial, sans-serif",
    // Texts
    textXs: {
      fontSize: "0.75rem",
      lineHeight: "0.625rem",
      fontWeight: 400,
    },
    textSm: {
      fontSize: "0.875",
      lineHeight: "1.25rem",
      fontWeight: 400,
    },
    textMd: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: 400,
    },
    textLg: {
      fontSize: "1.375rem",
      lineHeight: "1.75rem",
      fontWeight: 400,
      [`@media (max-width: ${BREAKPOINTS.sm}px)`]: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
      },
    },
    textXl: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      fontWeight: 400,
      [`@media (max-width: ${BREAKPOINTS.sm}px)`]: {
        fontSize: "1.375rem",
        lineHeight: "1.75rem",
      },
    },
    // Titles
    titleXs: {
      fontSize: "1.375rem",
      lineHeight: "1.75rem",
      fontWeight: 300,
    },
    titleSm: {
      fontSize: "1.75rem",
      lineHeight: "2.25rem",
      fontWeight: 300,
    },
    titleMd: {
      fontSize: "2rem",
      lineHeight: "2.5rem",
      fontWeight: 300,
    },
    titleLg: {
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontWeight: 300,
    },
    titleXl: {
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontWeight: 300,
      [`@media (max-width: ${BREAKPOINTS.sm}px)`]: {
        fontSize: "1.375rem",
        lineHeight: "1.75rem",
      },
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
};

export default theme;
