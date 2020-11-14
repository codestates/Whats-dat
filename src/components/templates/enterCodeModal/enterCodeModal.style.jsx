import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";
import Input from "../../atoms/input/input";

export const PaddingSmInput = styled(Input)`
  ${({ theme }) => {
    return css`
      input {
        padding: ${theme.paddings.sm} ${theme.paddings.base};
        margin-top: ${theme.paddings.xxsm};
      }
      input ::placeholder {
        color: red;
        opacity: 1; /* Firefox */
      }

      select {
        padding: ${theme.paddings.sm} ${theme.paddings.base};
        margin-top: ${theme.paddings.xxsm};
      }
    `;
  }}
`;

export const RowContainer = styled(Container)`
  ${({ theme }) => {
    return css`
      h2 {
        color: ${theme.colors.navy};
        font-weight: ${theme.fonts.weight.bold};
      }

      button {
        margin: 0;
      }
    `;
  }}
`;
