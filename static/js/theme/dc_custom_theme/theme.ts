import baseTheme from "../base_theme/theme";
import { Theme } from "./types";

const customTheme: Theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    tertiary: "purple",
  },
  typography: {
    ...baseTheme.typography,
    fontFamily: "'Brush Script MT', Arial, sans-serif",
  },
};

export default customTheme;
