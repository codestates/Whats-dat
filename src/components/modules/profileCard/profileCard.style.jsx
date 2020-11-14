import styled, { css } from "styled-components";

const profileCardBox = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      width: 100%;
      padding: ${theme.paddings.base};
      margin-top: 4.2rem;
      background-color: ${theme.colors.white};
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 2px solid ${theme.colors.lightGrey};
      border-radius: ${theme.borderRadius.roundedLg};

      .profile_avatar {
        margin-top: -4.5rem;
        margin-bottom: ${theme.margins.base};
      }

      .profile_name {
        margin-bottom: ${theme.margins.sm};
      }
    `;
  }}
`;

export default profileCardBox;
