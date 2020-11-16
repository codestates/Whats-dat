import styled, { css } from "styled-components";

export const DefaultLink = styled.div`
  ${({ theme, fontSizes, fontWeight, colors, textShadow }) => {
    return css`
      a {
        padding: ${theme.paddings.sm};
        text-decoration: none !important;
        font-size: ${theme.fonts.size[fontSizes]} !important;
        font-weight: ${theme.fonts.weight[fontWeight]} !important;
        color: ${theme.colors[colors]} !important;
        text-shadow: ${theme.textShadow[textShadow]} !important;
      }
    `;
  }}
`;

export default DefaultLink;
