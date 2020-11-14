import styled, { css } from "styled-components";

export const StyledHomeBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  overflow: hidden;
  z-index: -1;

  ${({ theme, maxWidth }) => {
    return css`
      background: ${theme.colors.backgroundGradient};
      ${theme.device[maxWidth]}
    `;
  }};
`;

export default StyledHomeBackground;
