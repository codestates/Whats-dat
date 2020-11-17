import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";
import IconButton from "../../atoms/IconButton/iconButton";

export const CustomContainer = styled(Container)`
  ${({ theme }) => {
    return css`
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @media only screen and (max-width: 550px) {
        font-size: ${theme.fonts.size.l};
        .gameResults__header {
          size: ${theme.fonts.size.base};
        }

        .gameResults__startWord {
          width: 35%;
        }

        .gameResults__slider {
          margin-bottom: 5rem;
        }

        .gameResults__btnContainer {
          width: ${36 * 0.8};
          height: ${36 * 0.8};
          margin-top: 2rem;
        }
      }

      .gameResults__startWord {
        width: 50%;
      }

      div.col-container {
        width: 100%;
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: space-evenly;
      }

      div.m-top {
        margin-top: 1rem;
      }

      div.m-bottom {
        margin-bottom: 3rem;
      }
    `;
  }}
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
`;

export default CustomContainer;
