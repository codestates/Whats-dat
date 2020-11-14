import styled, { css } from "styled-components";

export const H1 = styled.h1`
  ${({ theme, color, weight, textShadow, padding, marginBottom }) => {
    return css`
      font-size: ${theme.fonts.size.title};
      color: ${theme.colors[color]};
      font-weight: ${theme.fonts.weight[weight]};
      text-shadow: ${theme.textShadow[textShadow]};
      margin-bottom: ${theme.margins[marginBottom]};
      padding: ${theme.paddings[padding]};
    `;
  }}
`;

export const H2 = styled(H1).attrs({ as: "h2" })`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fonts.size.xl};
    `;
  }}
`;
export const H3 = styled(H1).attrs({ as: "h3" })`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fonts.size.lg};
    `;
  }}
`;
export const H4 = styled(H1).attrs({ as: "h4" })`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fonts.size.base};
    `;
  }}
`;
export const H5 = styled(H1).attrs({ as: "h5" })`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fonts.size.sm};
    `;
  }}
`;
export const H6 = styled(H1).attrs({ as: "h6" })`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fonts.size.xSm};
    `;
  }}
`;
