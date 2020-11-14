import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";

export const RowContainer = styled(Container)`
  ${({ theme }) => {
    return css`
      padding-top: ${theme.paddings.xl};
      padding-bottom: ${theme.paddings.lg};
      display: flex;
      flex-direction: column;
      gap: 2rem;

      div.form-content {
        width: 100%;
        color: ${theme.colors.darkGrey};
        font-size: 1.5rem;
      }

      div.form-content label {
        padding-left: 1rem;
      }

      div.row-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }

      div.m-top {
        margin-top: ${theme.margins.baseSm};
      }

      div.m-right {
        margin-right: ${theme.margins.sm};
      }

      div.m-left {
        margin-left: ${theme.margins.sm};
      }
    `;
  }}
`;

export default RowContainer;
