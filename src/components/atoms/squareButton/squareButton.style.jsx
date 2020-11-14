import styled, { css } from "styled-components";
import { BasicButton, BorderButton } from "../button/button.style";

export const BasicSquareButton = styled(BasicButton)`
  ${({ theme }) => {
    return css`
      border-radius: ${theme.borderRadius.rounded2Xl};
    `;
  }}
`;

export const BorderSquareButton = styled(BorderButton)`
  ${({ theme }) => {
    return css`
      border-radius: ${theme.borderRadius.rounded2Xl};
    `;
  }}
`;
