// Breakpoints 
const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1068,
  xl: 1350,
}

export interface Theme {
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    // Text Variants
    text_xs: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]: string | number | {
        fontSize?: string;
        lineHeight?: string;
      };
    };
    text_sm: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]: string | number | {
        fontSize?: string;
        lineHeight?: string;
      };
    };
    text_md: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]: string | number | {
        fontSize?: string;
        lineHeight?: string;
      };
    };
    text_lg: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]: string | number | {
        fontSize?: string;
        lineHeight?: string;
      };
    };
    text_xl: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]: string | number | {
        fontSize?: string;
        lineHeight?: string;
      };
    };
    // Title Variants
    title_xs: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]: string | number | {
        fontSize?: string;
        lineHeight?: string;
      };
    };
    title_sm: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]: string | number | {
        fontSize?: string;
        lineHeight?: string;
      };
    };
    title_md: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]: string | number | {
        fontSize?: string;
        lineHeight?: string;
      };
    };
    title_lg: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]: string | number | {
        fontSize?: string;
        lineHeight?: string;
      };
    };
    title_xl: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]: string | number | {
        fontSize?: string;
        lineHeight?: string;
      };
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

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
    text_xs: {
      fontSize: "0.75rem",
      lineHeight: "0.625rem",
      fontWeight: 400,
    },
    text_sm: {
      fontSize: "0.875",
      lineHeight: "1.25rem",
      fontWeight: 400,
    },
    text_md: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: 400,
    },
    text_lg: {
      fontSize: "1.375rem",
      lineHeight: "1.75rem",
      fontWeight: 400,
      [`@media (max-width: ${BREAKPOINTS.sm}px)`]: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
      }
    },
    text_xl: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      fontWeight: 400,
      [`@media (max-width: ${BREAKPOINTS.sm}px)`]: {
        fontSize: "1.375rem",
        lineHeight: "1.75rem",
      }
    },
    // Titles
    title_xs: {
      fontSize: "1.375rem",
      lineHeight: "1.75rem",
      fontWeight: 300,
    },
    title_sm: {
      fontSize: "1.75rem",
      lineHeight: "2.25rem",
      fontWeight: 300,
    },
    title_md: {
      fontSize: "2rem",
      lineHeight: "2.5rem",
      fontWeight: 300,
    },
    title_lg: {
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontWeight: 300,
    },
    title_xl: {
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontWeight: 300,
      [`@media (max-width: ${BREAKPOINTS.sm}px)`]: {
        fontSize: "1.375rem",
        lineHeight: "1.75rem",
      }
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
