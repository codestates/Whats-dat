import styled, { css } from "styled-components";
import IconButton from "../../atoms/IconButton/iconButton";

export const PaginationButton = styled(IconButton)`
  padding: 0 1rem;
`;

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
