import styled, { css } from "styled-components";

const hasBorder = ({ border }) => {
  if (border) return `0.2rem solid #dbdbdb`;
  return `none`;
};

export const DefaultImage = styled.div`
  ${({ size, url }) => {
    return css`
      width: ${size}rem;
      height: ${size}rem;
      background: url("${url}") no-repeat center;
      background-size: cover;
      border: ${(props) => hasBorder(props)};
    `;
  }}
`;

export default DefaultImage;
