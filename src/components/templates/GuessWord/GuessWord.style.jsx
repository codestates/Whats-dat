import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";

export const CustomContainer = styled(Container)`
  ${({ theme }) => {
    return css`
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      div.row-container {
        width: 100%;
        margin-bottom: 3rem;
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        text-align: center;
        align-items: center;
      }

      div.m-top {
        margin-top: 1rem;
      }

      div.m-bottom {
        margin-bottom: 1rem;
      }
    `;
  }}
`;

export default CustomContainer;
