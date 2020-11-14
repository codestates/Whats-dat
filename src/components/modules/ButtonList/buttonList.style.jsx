import styled, { css } from "styled-components";

const buttonListBox = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      flex-direction: column;
      width: 100%;

      & > * {
        margin-bottom: ${theme.margins.base};
      }
    `;
  }}
`;

export default buttonListBox;
