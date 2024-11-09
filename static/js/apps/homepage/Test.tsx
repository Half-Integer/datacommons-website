/** @jsxImportSource @emotion/react */

import { css, useTheme } from "@emotion/react";
import React, { useState } from "react";
import { ReactElement } from "react";

export function Test(): ReactElement {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [text, setText] = useState("Click Me");

  const handleMouseEnter = (): void => {
    setIsHovered(!isHovered);
    if (!isHovered) setText("I said Click me!");
  };

  return (
    <button
      css={css`
        background-color: ${theme.colors.primary};
        color: ${theme.colors.tertiary};
        padding: ${theme.spacing.lg};
        font-family: ${theme.typography.fontFamily};
        position: relative;
        transition: transform 0.1s ease;
        transform: ${isHovered ? "translateX(300px)" : "none"};
        &:hover {
          background: red;
        }
      `}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </button>
  );
}

export default Test;
