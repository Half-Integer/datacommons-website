import styled from "@emotion/styled";
import React, { useState } from "react";
import { ReactElement } from "react";

const StyledButton = styled.button<{ isHovered: boolean }>`
  background-color: ${({ theme }): string => theme.colors.primary};
  color: ${({ theme }): string => theme.colors.text};
  padding: ${({ theme }): string => theme.spacing.large};
  font-family: ${({ theme }): string => theme.typography.fontFamily};
  position: relative;
  transition: transform 0.1s ease;
  transform: ${({ isHovered }): string =>
    isHovered ? "translateX(300px)" : "none"};
`;

export function Test(): ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const [text, setText] = useState("Click Me");

  const handleMouseEnter = (): void => {
    setIsHovered(!isHovered);
    if (!isHovered) setText("I said Click me!");
  };

  return (
    <StyledButton isHovered={isHovered} onMouseEnter={handleMouseEnter}>
      {text}
    </StyledButton>
  );
}

export default Test;
