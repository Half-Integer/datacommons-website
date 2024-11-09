export interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Theme {
  breakpoints: Breakpoints;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    // Text Variants
    textXs: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]:
        | string
        | number
        | {
            fontSize?: string;
            lineHeight?: string;
          };
    };
    textSm: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]:
        | string
        | number
        | {
            fontSize?: string;
            lineHeight?: string;
          };
    };
    textMd: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]:
        | string
        | number
        | {
            fontSize?: string;
            lineHeight?: string;
          };
    };
    textLg: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]:
        | string
        | number
        | {
            fontSize?: string;
            lineHeight?: string;
          };
    };
    textXl: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]:
        | string
        | number
        | {
            fontSize?: string;
            lineHeight?: string;
          };
    };
    // Title Variants
    titleXs: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]:
        | string
        | number
        | {
            fontSize?: string;
            lineHeight?: string;
          };
    };
    titleSm: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]:
        | string
        | number
        | {
            fontSize?: string;
            lineHeight?: string;
          };
    };
    titleMd: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]:
        | string
        | number
        | {
            fontSize?: string;
            lineHeight?: string;
          };
    };
    titleLg: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]:
        | string
        | number
        | {
            fontSize?: string;
            lineHeight?: string;
          };
    };
    titleXl: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      [key: string]:
        | string
        | number
        | {
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
