import styled, { css } from "styled-components";

const lineWidthController = styled.div`
  ${({ theme }) => {
    return css`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      text-align: center;
      align-items: center;

      .section {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }}
`;
export default lineWidthController;
