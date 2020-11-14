import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  ${({ direction, theme, btnSize }) => {
    return css`
      padding: ${theme.paddings.sm};
      flex-direction: ${direction === "horizontal" ? "row" : "column"};
      & > button {
        border: 1px solid ${theme.colors.grey};
        margin: 0.3rem;
        width: ${btnSize}rem;
        height: ${btnSize}rem;
      }
    `;
  }}
`;

export default StyledContainer;
