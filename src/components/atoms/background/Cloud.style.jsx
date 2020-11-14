import styled, { keyframes, css } from "styled-components";

const moveCloud = keyframes`
  0% {margin-left: 200rem}
  10% {margin-left: 200rem}
  100% {margin-left: -200rem}
`;

const StyledCloud = styled.div`
  ${({ top, scale, opacity, seconds }) => {
    return css`
      position: absolute;
      top: ${top}vh;
      font-size: ${20 * scale}rem;
      color: white;
      opacity: ${opacity};
      animation: ${seconds} ${moveCloud} linear infinite;
    `;
  }}
`;

export default StyledCloud;
