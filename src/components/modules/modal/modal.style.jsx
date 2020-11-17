import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";
import Box from "../../atoms/box/box";

export const ModalBgContainer = styled(Container)`
  ${() => {
    return css`
      position: fixed;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.3);
    `;
  }}
`;

export const ModalBox = styled(Box)`
  ${() => {
    return css`
      position: relative;

      div.btn-position {
        position: absolute;
        top: 0;
        right: 0;
        padding: 1.5rem;
      }

      div.cursor:hover {
        cursor: pointer;
      }
    `;
  }}
`;
