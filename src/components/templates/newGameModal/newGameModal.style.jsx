import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";
import RoundButton from "../../atoms/roundButton/roundButton";

export const RowContainer = styled(Container)`
  ${({ theme }) => {
    return css`
      h2 {
        color: ${theme.colors.navy};
        font-weight: ${theme.fonts.weight.bold};
      }

      .form-control {
        padding: 0;
      }

      .counter-group {
        margin-top: 2rem;
      }
      label {
        color: ${theme.colors.grey};
        margin: 0;
      }
    `;
  }}
`;

export const SmallRoundButton = styled(RoundButton)`
  ${({ theme }) => {
    return css`
      width: 2rem;
      height: 2rem;
      margin: 0 ${theme.margins.xxsm};
    `;
  }}
`;
