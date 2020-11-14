import styled, { css } from "styled-components";

const paginationButtonBox = styled.div`
  ${({ theme }) => {
    return css`
      width: 100%;
      display: flex;
      justify-content: space-between;

      @media only screen and (max-width: 500px) {
        width: initial;
        display: initial;
      }
    `;
  }}
`;

export default paginationButtonBox;
