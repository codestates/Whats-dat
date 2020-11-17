import styled, { css } from "styled-components";

export const DefaultCanvas = styled.canvas`
  ${({ width }) => {
    return css`
      display: block;
      ${"" /* //TODO: 사이즈 단위 확인 */}
      width: ${width * 10}px;
      height: ${width * 10}px;
      style-width: 50rem;
      style-height: 50rem;
      border: 2px solid #dbdbdb;
      z-index: 999;
    `;
  }}
`;

export const ClearButton = styled.button`
  ${({ theme }) => {
    return css`
      padding: ${theme.paddings.sm};
      font-size: ${theme.fonts.size.base};
      ${theme.device.mobile} {
        font-size: ${theme.fonts.size.sm};
      }
    `;
  }}
`;

export default DefaultCanvas;
