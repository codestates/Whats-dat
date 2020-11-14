import styled, { css } from "styled-components";

const StyledSocialButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => {
    return css`
      padding: ${theme.paddings.sm};
      & > button {
        font-size: 1.6rem;
      }
    `;
  }}
`;

export default StyledSocialButtonContainer;
