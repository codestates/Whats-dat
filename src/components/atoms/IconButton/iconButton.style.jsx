import styled, { css } from "styled-components";

export const IconButton = styled.button`
  ${({ size, isNotVisible }) => {
    return css`
      font-size: ${size}rem;
      padding: 1rem;
      background-color: transparent;
      cursor: pointer;
      opacity: ${isNotVisible ? 0 : 0.75};
      transition: opacity 0.3s;

      &:hover {
        opacity: ${isNotVisible ? 0 : 1};
      }
    `;
  }}
`;

export default IconButton;
