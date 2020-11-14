import styled, { css } from "styled-components";

export const DefaultLink = styled.a`
  ${({ theme, fontSizes, fontWeight, colors, textShadow }) => {
    return css`
      text-decoration: none;
      padding: ${theme.paddings.sm};
      font-size: ${theme.fonts.size[fontSizes]};
      font-weight: ${theme.fonts.weight[fontWeight]};
      color: ${theme.colors[colors]};
      text-shadow: ${theme.textShadow[textShadow]};
    `;
  }}
`;

export default DefaultLink;
