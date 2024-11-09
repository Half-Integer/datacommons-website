import { Theme as BaseTheme } from "../base_theme/types";

export interface Theme extends BaseTheme {
  colors: BaseTheme["colors"] & {
    tertiary: string;
  };
}
