import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";

export const GapContainer = styled(Container)`
  ${() => {
    return css`
      flex-direction: column;
      gap: 0.7rem;
    `;
  }}
`;

export const FlexWrapContainer = styled.div`
  ${({ theme }) => {
    return css`
      width: 100%;
      display: grid;
      grid-template-columns: 50% 50%;
      gap: 0.7rem;

      ${theme.device.mobile} {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.7rem;
      }
    `;
  }}
`;
