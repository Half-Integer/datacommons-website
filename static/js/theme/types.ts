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
 * The interface for the default Emotion theme for Data Commons
 */

export interface TextVariant {
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
}

export interface LinkBoxVariant {
  backgroundColor: string;
  textDecoration: string;
  [key: string]:
    | string
    | number
    | {
        backgroundColor: string;
      };
}

export interface ButtonVariant {
  backgroundColor: string;
  color: string;
  border: string;
  borderRadius: string;
  [key: string]:
    | string
    | number
    | {
        backgroundColor: string;
        color: string;
        border: string;
      };
}

export interface Theme {
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    x2l: number;
    x3l: number;
  };
  sections: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  width: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  icons: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  colors: {
    text?: {
      primary?: {
        base?: string;
        light?: string;
        dark?: string;
      };
      secondary?: {
        base?: string;
        light?: string;
        dark?: string;
      };
      tertiary?: {
        base?: string;
        light?: string;
        dark?: string;
      };
      code?: {
        base?: string;
        light?: string;
        dark?: string;
      };
    };
    error?: {
      primary?: {
        base?: string;
        light?: string;
        dark?: string;
      };
    };
    background?: {
      primary?: {
        base?: string;
        light?: string;
        dark?: string;
      };
      secondary?: {
        base?: string;
        light?: string;
        dark?: string;
      };
      tertiary?: {
        base?: string;
        light?: string;
        dark?: string;
      };
    };
    border?: {
      primary?: {
        base?: string;
        light?: string;
        dark?: string;
      };
    };
    link?: {
      primary?: {
        base?: string;
        light?: string;
        dark?: string;
      };
      secondary?: {
        base?: string;
        light?: string;
        dark?: string;
      };
      tertiary?: {
        base?: string;
        light?: string;
        dark?: string;
      };
    };
  };
  typography: {
    family: {
      text: {
        fontFamily: string;
        fontStyle: string;
      };
      heading: {
        fontFamily: string;
        fontStyle: string;
      };
      extra?: {
        fontFamily: string;
        fontStyle: string;
      };
      code?: {
        fontFamily: string;
        fontStyle: string;
      };
    };
    // Text Variants
    text: {
      xs: TextVariant;
      sm: TextVariant;
      md: TextVariant;
      lg: TextVariant;
      xl: TextVariant;
    };
    // heading Variants
    heading: {
      xs: TextVariant;
      sm: TextVariant;
      md: TextVariant;
      lg: TextVariant;
      xl: TextVariant;
    };
  };
  elevation: {
    none: {
      boxShadow: string;
    };
    high: {
      boxShadow: string;
    };
    low: {
      boxShadow: string;
    };
  };
  radius: {
    none: {
      borderRadius: string;
    };
    full: {
      borderRadius: string;
    };
    xl: {
      borderRadius: string;
    };
    lg: {
      borderRadius: string;
    };
    md: {
      borderRadius: string;
    };
    sm: {
      borderRadius: string;
    };
  };
  zIndex: {
    tooltip: number;
    dialog: number;
    header: number;
    drawer: number;
    overlay: number;
    widget: number;
  };
  components: {
    linkBox: {
      standard?: LinkBoxVariant;
      inverted?: LinkBoxVariant;
    };
    tabs: {
      selected?: string;
      unselected?: string;
      lining?: string;
    };
    cards: {
      variant?: {
        blue: {
          text: string;
          tag: string;
          pill: string;
        };
        green: {
          text: string;
          tag: string;
          pill: string;
        };
        red: {
          text: string;
          tag: string;
          pill: string;
        };
        yellow: {
          text: string;
          tag: string;
          pill: string;
        };
        grey: {
          text: string;
          tag: string;
          pill: string;
        };
      };
    };
    button: {
      variant: {
        standard?: ButtonVariant;
        inverted?: ButtonVariant;
        text?: ButtonVariant;
        flat?: ButtonVariant;
        light?: ButtonVariant;
      };
      size: {
        sm?: {
          padding: string;
        };
        md?: {
          padding: string;
        };
        lg?: {
          padding: string;
        };
      };
    };
    tooltip: {
      variant: {
        standard: {
          text?: string;
          tag?: string;
          pill?: string;
        };
      };
      size: {
        md: {
          width?: string;
        };
      };
    };
    spinner: {
      variant: {
        standard: {
          color: string;
        };
      };
    };
    infoBox: {
      backgroundColor: string;
      heading: TextVariant;
      icon: {
        fontSize: string;
        lineHeight: string;
        [key: string]:
          | string
          | {
              fontSize?: string;
              lineHeight?: string;
            };
      };
    };
    placeTypeSelect: {
      borderColor: string;
      boxShadow: string;
    };
    codeHighlight: {
      background?: string;
      border?: string;
      text?: string;
      highlight?: string;
      selection?: string;
      comment?: string;
      prolog?: string;
      doctype?: string;
      cData?: string;
      punctuation?: string;
      property?: string;
      tag?: string;
      boolean?: string;
      number?: string;
      constant?: string;
      symbol?: string;
      deleted?: string;
      selector?: string;
      attrName?: string;
      string?: string;
      char?: string;
      builtin?: string;
      inserted?: string;
      operator?: string;
      entity?: string;
      url?: string;
      langCSS?: string;
      atrule?: string;
      attrValue?: string;
      keyword?: string;
      function?: string;
      className?: string;
      regex?: string;
      important?: string;
      variable?: string;
      csvHeader?: string;
      csvSeparator?: string;
      csvValue?: string;
      csvStringValue?: string;
    };
  };
}
