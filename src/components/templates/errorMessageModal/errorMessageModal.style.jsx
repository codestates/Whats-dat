import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";

export const RowContainer = styled(Container)`
  ${({ theme }) => {
    return css`
      padding-top: ${theme.paddings.xl};
      padding-bottom: ${theme.paddings.xl};
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    `;
  }}
`;

export default RowContainer;
