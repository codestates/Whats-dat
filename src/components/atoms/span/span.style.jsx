import styled, { css } from "styled-components";

export const StyledSpan = styled.span`
  ${({ theme, weight, textShadow, textDecoration, color, padding, margin }) => {
    return css`
      font-weight: ${theme.fonts.weight[weight]};
      text-shadow: ${theme.textShadow[textShadow]};
      text-decoration: ${textDecoration};
      color: ${theme.colors[color]};
      margin: ${theme.margins[margin]};
      padding: ${theme.paddings[padding]};
    `;
  }}
`;

export default StyledSpan;
