import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";

export const RowContainer = styled(Container)`
  ${({ theme }) => {
    return css`
      padding-top: ${theme.paddings.xl};
      padding-bottom: ${theme.paddings.base};
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

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
        margin-top: ${theme.margins.base};
      }

      div.m-right {
        margin-right: ${theme.margins.sm};
      }

      div.m-left {
        margin-left: ${theme.margins.sm};
      }

      div.p-left {
        padding-left: ${theme.paddings.sm};
      }

      div.left {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    `;
  }}
`;

export default RowContainer;
