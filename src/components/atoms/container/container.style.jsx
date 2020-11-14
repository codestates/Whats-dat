import styled, { css } from "styled-components";

export const DefaultContainer = styled.div`
  ${({ width, height, maxWidth, isFull }) => {
    let CustomHeight = null;

    if (isFull) {
      CustomHeight = "100%";
    } else if (height) {
      CustomHeight = `${height}rem`;
    }

    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${width ? `${width}rem` : "100%"};
      height: ${CustomHeight};
      max-width: ${maxWidth ? `${maxWidth}rem` : null};
    `;
  }};
`;

export default DefaultContainer;
