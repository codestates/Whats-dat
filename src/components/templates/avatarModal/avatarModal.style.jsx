import styled, { css } from "styled-components";

export const AvatarWrapper = styled.div`
  ${({ theme }) => {
    return css`
      h2 {
        display: none;
      }

      h4 {
        color: ${theme.colors.navy};
      }

      button {
        margin-top: 0;
      }
    `;
  }}
`;

export default AvatarWrapper;
