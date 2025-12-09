/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The default Emotion theme for Data Commons
 */

import { Theme } from "./types";

// constants

const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1068,
  xl: 1350,
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  x2l: 48,
  x3l: 64,
};

const SECTIONS = {
  xs: 0,
  sm: 32,
  md: 64,
  lg: 110,
};

const WIDTH = {
  xs: 0,
  sm: 645,
  md: 750,
  lg: 1040,
  xl: 1310,
};

const ICONS = {
  xs: 12,
  sm: 18,
  md: 24,
  lg: 32,
  xl: 48,
};

// COLORS;
// basic;
const COLOR_WHITE = "#ffffff";
// Greys
const COLOR_BONE = "#f6faff";
const COLOR_OBSIDIAN = "#303030";
const COLOR_ASH = "#4d4d4d";
const COLOR_FOG = "#b3b3b3";
const COLOR_CLOUD = "#cccccc";
const COLOR_SLATE = "#464746";
const COLOR_CHARCOAL = "#696a6b";
const COLOR_STEEL = "#7a7a7a";
const COLOR_LINEN = "#c4c7c4";
const COLOR_SNOW = "#f5f9ff";
const COLOR_MIST = "#e6e7f5";
// Blues
const COLOR_OCEAN = "#1656e2";
const COLOR_MIDNIGHT = "#091842";
const COLOR_SKY = "#85a9e6";
const COLOR_GLACIER = "#cce6ff";
const COLOR_ICEBERG = "#f2f8ff";
const COLOR_POLAR = "#dce6fb";
const COLOR_NAVY = "#041e49";
const COLOR_BREEZE = "#e7f3fe";
const COLOR_ARTIC = "#b3dcfa";
// Greens
const COLOR_LEAF = "#1d6f3e";
const COLOR_PINE = "#0e2f19";
const COLOR_MINT = "#d2f0e2";
// Reds
const COLOR_CRIMSON = "#ba3b36";
const COLOR_EMBER = "#4d0f0e";
const COLOR_BLUSH = "#fbe6e5";
// Yellows
const COLOR_OCHRE = "#c27c00";
const COLOR_YELLOW = "#b78300";
const COLOR_SUNSHINE = "#fff4dc";
// Orange
const COLOR_ORANGE = "#b74f00";

const theme: Theme = {
  breakpoints: BREAKPOINTS,
  spacing: SPACING,
  sections: SECTIONS,
  width: WIDTH,
  icons: ICONS,
  colors: {
    text: {
      primary: {
        base: COLOR_OBSIDIAN,
        dark: COLOR_MIDNIGHT,
        light: COLOR_WHITE,
      },
      secondary: {
        base: COLOR_SLATE,
        dark: COLOR_CLOUD,
        light: COLOR_MIST,
      },
      tertiary: {
        base: COLOR_STEEL,
        dark: COLOR_CHARCOAL,
        light: COLOR_STEEL,
      },
      code: {
        base: COLOR_LEAF,
        light: COLOR_MINT,
        dark: COLOR_MINT,
      },
    },
    background: {
      primary: {
        base: COLOR_WHITE,
        dark: COLOR_MIDNIGHT,
        light: COLOR_ICEBERG,
      },
      secondary: {
        base: COLOR_BONE,
        dark: COLOR_SLATE,
        light: COLOR_ICEBERG,
      },
    },
    border: {
      primary: {
        base: COLOR_WHITE,
        dark: COLOR_MIDNIGHT,
        light: COLOR_CLOUD,
      },
    },
    link: {
      primary: {
        base: COLOR_OCEAN,
        light: COLOR_SKY,
        dark: COLOR_MIDNIGHT,
      },
      secondary: {
        base: COLOR_SLATE,
        light: COLOR_CLOUD,
        dark: COLOR_OBSIDIAN,
      },
    },
    error: {
      primary: {
        base: COLOR_CRIMSON,
        light: COLOR_OCHRE,
        dark: COLOR_EMBER,
      },
    },
  },
  typography: {
    family: {
      text: {
        fontFamily: "'Google Sans Text', Arial, sans-serif",
        fontStyle: "normal",
      },
      heading: {
        fontFamily: "'Google Sans', Arial, sans-serif",
        fontStyle: "normal",
      },
      code: {
        fontFamily: "Courier, Monaco, Lucida Console, Courier New, monospace",
        fontStyle: "normal",
      },
    },
    text: {
      xs: {
        fontSize: "0.75rem",
        lineHeight: "0.625rem",
        fontWeight: 400,
      },
      sm: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: 400,
      },
      md: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: 400,
      },
      lg: {
        fontSize: "1.375rem",
        lineHeight: "1.75rem",
        fontWeight: 400,
        [`@media (max-width: ${BREAKPOINTS.sm}px)`]: {
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
      xl: {
        fontSize: "1.5rem",
        lineHeight: "2rem",
        fontWeight: 400,
        [`@media (max-width: ${BREAKPOINTS.sm}px)`]: {
          fontSize: "1.375rem",
          lineHeight: "1.75rem",
        },
      },
    },
    heading: {
      xs: {
        fontSize: "1.375rem",
        lineHeight: "1.75rem",
        fontWeight: 300,
      },
      sm: {
        fontSize: "1.75rem",
        lineHeight: "2.25rem",
        fontWeight: 300,
        [`@media (max-width: ${BREAKPOINTS.md}px)`]: {
          fontSize: "1.5rem",
          lineHeight: "2rem",
        },
      },
      md: {
        fontSize: "2rem",
        lineHeight: "2.5rem",
        fontWeight: 300,
        [`@media (max-width: ${BREAKPOINTS.md}px)`]: {
          fontSize: "1.7rem",
          lineHeight: "2.25rem",
        },
      },
      lg: {
        fontSize: "2.25rem",
        lineHeight: "2.75rem",
        fontWeight: 300,
        [`@media (max-width: ${BREAKPOINTS.md}px)`]: {
          fontSize: "1.8rem",
          lineHeight: "2.4rem",
        },
      },
      xl: {
        fontSize: "3rem",
        lineHeight: "2.75rem",
        fontWeight: 300,
        [`@media (max-width: ${BREAKPOINTS.md}px)`]: {
          fontSize: "2.4rem",
          lineHeight: "2.75rem",
        },
      },
    },
  },
  elevation: {
    none: {
      boxShadow: "none",
    },
    high: {
      boxShadow:
        "0px 1px 2px hsla(0, 0%, 0%, 0.3), 0px 1px 3px 1px hsla(0, 0%, 0%, 0.15)",
    },
    low: {
      boxShadow: "0 2px 5px hsla(0,0%,0%,0.1)",
    },
  },
  radius: {
    none: {
      borderRadius: "0",
    },
    full: {
      borderRadius: "1000px",
    },
    xl: {
      borderRadius: "32px",
    },
    lg: {
      borderRadius: "20px",
    },
    md: {
      borderRadius: "12px",
    },
    sm: {
      borderRadius: "8px",
    },
  },
  zIndex: {
    tooltip: 15000,
    dialog: 10000,
    header: 9000,
    drawer: 8000,
    overlay: 11000,
    widget: 7000,
  },
  components: {
    linkBox: {
      standard: {
        backgroundColor: COLOR_BONE,
        textDecoration: "none",
        ["&:hover:not(:disabled)"]: {
          backgroundColor: COLOR_BREEZE,
        },
      },
      inverted: {
        backgroundColor: COLOR_GLACIER,
        textDecoration: "none",
        ["&:hover:not(:disabled)"]: {
          backgroundColor: COLOR_ARTIC,
        },
      },
    },
    tabs: {
      selected: COLOR_OCEAN,
      unselected: COLOR_ASH,
      lining: COLOR_LINEN,
    },
    cards: {
      variant: {
        blue: {
          text: COLOR_OCEAN,
          tag: COLOR_NAVY,
          pill: COLOR_BREEZE,
        },
        green: {
          text: COLOR_LEAF,
          tag: COLOR_PINE,
          pill: COLOR_MINT,
        },
        red: {
          text: COLOR_CRIMSON,
          tag: COLOR_EMBER,
          pill: COLOR_BLUSH,
        },
        yellow: {
          text: COLOR_OCHRE,
          tag: COLOR_EMBER,
          pill: COLOR_SUNSHINE,
        },
        grey: {
          text: COLOR_SLATE,
          tag: COLOR_SLATE,
          pill: COLOR_MIST,
        },
      },
    },
    button: {
      variant: {
        standard: {
          color: COLOR_OCEAN,
          backgroundColor: COLOR_WHITE,
          border: `1px solid ${COLOR_FOG}`,
          borderRadius: `1000px`,
          ["&:hover:not(:disabled):not([aria-disabled])"]: {
            backgroundColor: COLOR_WHITE,
            color: COLOR_OCEAN,
            border: `1px solid ${COLOR_OCEAN}`,
          },
        },
        inverted: {
          color: COLOR_OCEAN,
          backgroundColor: COLOR_GLACIER,
          border: `1px solid ${COLOR_GLACIER}`,
          borderRadius: `1000px`,
          ["&:hover:not(:disabled):not([aria-disabled])"]: {
            backgroundColor: COLOR_GLACIER,
            color: COLOR_OCEAN,
            border: `1px solid ${COLOR_OCEAN}`,
          },
        },
        text: {
          color: COLOR_OCEAN,
          backgroundColor: "transparent",
          border: `1px solid transparent`,
          borderRadius: `1000px`,
          ["&:hover:not(:disabled):not([aria-disabled])"]: {
            backgroundColor: "transparent",
            color: COLOR_OCEAN,
            border: `1px solid ${COLOR_OCEAN}`,
          },
        },
        flat: {
          color: COLOR_OCEAN,
          backgroundColor: COLOR_POLAR,
          border: `1px solid ${COLOR_POLAR}`,
          borderRadius: "100px",
          ["&:hover:not(:disabled):not([aria-disabled])"]: {
            backgroundColor: COLOR_POLAR,
            color: COLOR_OCEAN,
            border: `1px solid ${COLOR_OCEAN}`,
          },
        },
        light: {
          color: COLOR_STEEL,
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "none",
          ["&:hover:not(:disabled):not([aria-disabled])"]: {
            backgroundColor: "transparent",
            color: COLOR_OCEAN,
            border: "none",
          },
        },
      },
      size: {
        sm: {
          padding: `7px ${SPACING.md}px`,
        },
        md: {
          padding: `11px ${SPACING.md}px 9px`,
        },
        lg: {
          padding: `15px ${SPACING.lg}px`,
        },
      },
    },
    tooltip: {
      variant: {
        standard: {
          text: COLOR_SLATE,
          tag: COLOR_OCEAN,
          pill: COLOR_SNOW,
        },
      },
      size: {
        md: {
          width: "300px",
        },
      },
    },
    spinner: {
      variant: {
        standard: {
          color: COLOR_OCEAN,
        },
      },
    },
    infoBox: {
      backgroundColor: COLOR_GLACIER,
      icon: {
        fontSize: "1.5rem",
        lineHeight: "2rem",
        [`@media (max-width: ${BREAKPOINTS.sm}px)`]: {
          fontSize: "1.35rem",
          lineHeight: "1.5rem",
        },
      },
      heading: {
        fontSize: "1.5rem",
        lineHeight: "2rem",
        fontWeight: 500,
        [`@media (max-width: ${BREAKPOINTS.sm}px)`]: {
          fontSize: "1.35rem",
          lineHeight: "1.75rem",
        },
      },
    },
    placeTypeSelect: {
      borderColor: COLOR_OCEAN,
      boxShadow: `0 0 0 0.2rem ${COLOR_SKY}`,
    },
    codeHighlight: {
      background: COLOR_WHITE,
      border: COLOR_CLOUD,
      text: COLOR_SLATE,
      highlight: COLOR_SUNSHINE,
      selection: COLOR_SKY,
      comment: COLOR_STEEL,
      prolog: COLOR_STEEL,
      doctype: COLOR_STEEL,
      cData: COLOR_STEEL,
      punctuation: COLOR_NAVY,
      property: COLOR_OCEAN,
      tag: COLOR_OCEAN,
      boolean: COLOR_OCEAN,
      number: COLOR_OCEAN,
      constant: COLOR_OCEAN,
      symbol: COLOR_OCEAN,
      deleted: COLOR_OCEAN,
      selector: COLOR_LEAF,
      attrName: COLOR_LEAF,
      string: COLOR_LEAF,
      char: COLOR_LEAF,
      builtin: COLOR_LEAF,
      inserted: COLOR_LEAF,
      operator: COLOR_ORANGE,
      entity: COLOR_ORANGE,
      url: COLOR_ORANGE,
      langCSS: COLOR_ORANGE,
      atrule: COLOR_OCEAN,
      attrValue: COLOR_OCEAN,
      keyword: COLOR_OCEAN,
      function: COLOR_OCEAN,
      className: COLOR_OCEAN,
      regex: COLOR_YELLOW,
      important: COLOR_YELLOW,
      variable: COLOR_YELLOW,
      csvHeader: COLOR_LEAF,
      csvSeparator: COLOR_ORANGE,
      csvStringValue: COLOR_STEEL,
      csvValue: COLOR_OCEAN,
    },
  },
};

export default theme;
