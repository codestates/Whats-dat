import styled, { css } from "styled-components";

export const StyledParagraph = styled.p`
  ${({ theme, size, weight, color, textShadow, padding, marginBottom }) => {
    return css`
      font-size: ${theme.fonts.size[size]};
      font-weight: ${theme.fonts.weight[weight]};
      color: ${theme.colors[color]};
      text-shadow: ${theme.textShadow[textShadow]};
      margin-bottom: ${theme.margins[marginBottom]};
      padding: ${theme.paddings[padding]};
    `;
  }}
`;

export default StyledParagraph;
