import styled, { css } from "styled-components";
import Box from "../../atoms/box/box";
import Container from "../../atoms/container/container";

export const AlignContainer = styled(Container)`
  ${({ theme }) => {
    return css`
      ${theme.device.mobile} {
        height: 100%;
        width: 100%;
      }
    `;
  }}
`;

export const ColumnBox = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  ${({ theme }) => {
    return css`
      ${theme.device.mobile} {
        height: 100%;
        width: 100%;
        border-radius: 0;
      }
    `;
  }}
`;
