import styled, { css } from "styled-components";

export const NewGameContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .newGame__header {
    font-size: 3.7rem;
    text-align: center;
  }
  .newGame__slider {
    height: 100%;
  }
  ${({ theme }) => {
    return css`
      @media only screen and (max-width: 550px) {
        .newGame__header {
          font-size: 3.2rem;
        }
      }
      @media only screen and (max-width: 500px) {
        .newGame__header {
          font-size: 2.8rem;
        }
      }

      ${theme.device.mobile} {
        .newGame__header {
          font-size: 2.5rem;
        }
      }
    `;
  }}
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evnely;
  .newGame__btn {
    margin-right: 1rem;
  }
  ${({ theme }) => {
    return css`
      .newGame__btn,
      .newGame__enterCodeBtn {
        max-width: 16rem;
        padding: ${theme.paddings.base} ${theme.paddings.xxl};
      }
      margin-top: ${theme.margins.baseSm};
      @media only screen and (max-width: 550px) {
        .newGame__btn,
        .newGame__enterCodeBtn {
          font-size: 1.6rem;
          margin-top: ${theme.margins.xl};
          padding: ${theme.paddings.baseSm} ${theme.paddings.baseLg};
        }
      }
      @media only screen and (max-width: 500px) {
        .newGame__btn,
        .newGame__enterCodeBtn {
          font-size: 1.4rem;
          margin-top: ${theme.margins.xl};
          padding: ${theme.paddings.baseSm} ${theme.paddings.baseLg};
        }
      }
      ${theme.device.mobile} {
        .newGame__btn,
        .newGame__enterCodeBtn {
          font-size: 1.2rem;
          margin-top: ${theme.margins.xl};
          padding: ${theme.paddings.baseSm} ${theme.paddings.baseLg};
        }
      }

      a {
        text-decoration: none;
      }
    `;
  }}
`;

export const StyledLinksContainer = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: ${theme.margins.baseLg};
      .newGame__myProfile,
      .newGame__tutorial {
        padding: ${theme.paddings.xxsm};
      }

      a {
        text-decoration: none;
        padding: 0;
      }
    `;
  }}
`;
