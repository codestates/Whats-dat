import React from "react";
import styled, { css } from "styled-components";

export const SliderContainer = styled.div`
  ${({ theme }) => {
    return css`
      width: 50rem;
      @media only screen and (max-width: 570px) {
        width: 45rem;
      }
      @media only screen and (max-width: 500px) {
        width: 40rem;
      }
    `;
  }}
`;

export default SliderContainer;
