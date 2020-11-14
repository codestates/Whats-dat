import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";
import RoundButton from "../../atoms/roundButton/roundButton";

export const CustomContainer = styled(Container)`
  ${({ theme }) => {
    return css`
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      div.row-grid {
        width: 100%;
        margin-bottom: 3rem;
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        text-align: center;
        align-items: center;
      }

      div.row-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 5rem;
      }

      div.m-top {
        margin-top: 2rem;
      }

      div.m-bottom {
        margin-bottom: 2rem;
      }

      .canvas__container {
        position: relative;
      }

      .canvas__colorPicker {
        position: absolute;
        top: 0;
        left: -21rem;
      }

      ${theme.device.mobile} {
        .canvas__colorPicker {
          display: flex;
          align-items: start;
          flex-direction: row;
          position: static;
          & > button {
            height: 2rem;
            width: 2rem;
          }
        }
      }
    `;
  }}
`;

export const SmallRoundButton = styled(RoundButton)`
  ${({ theme }) => {
    return css`
      width: 2rem;
      height: 2rem;
      margin: 0 0.5rem;
    `;
  }}
`;