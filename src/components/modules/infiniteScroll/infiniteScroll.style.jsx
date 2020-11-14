import styled, { css } from "styled-components";

const InfiniteScrollContainer = styled.div`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.white};
      width: 100%;
      height: 100%;
    `;
  }}
`;

export default InfiniteScrollContainer;
