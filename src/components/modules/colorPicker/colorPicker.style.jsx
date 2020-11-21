import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ direction, theme, btnSize }) => {
    return css`
      width: ${btnSize}rem;
      height: auto;
      padding-bottom: ${theme.paddings.sm};
      flex-direction: ${direction === "horizontal" ? "row" : "column"};

      & > button {
        border: 1px solid ${theme.colors.grey};
        margin: 0.3rem;
        width: ${btnSize}rem;
        height: ${btnSize}rem;
      }
      @media only screen and (max-width: 490px) {
        & > button {
          border: 1px solid ${theme.colors.grey};
          margin: 0.3rem;
          width: ${btnSize - 1}rem;
          height: ${btnSize - 1}rem;
        }
      }
    `;
  }}
`;

export default StyledContainer;
