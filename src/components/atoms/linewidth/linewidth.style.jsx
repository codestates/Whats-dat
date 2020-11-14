import styled, { css } from "styled-components";

const getColor = ({ theme, color }) => {
  if (!color) return theme.colors.black;
  return theme.colors[color];
};

export const DefaultLineWidth = styled.div`
  ${({ theme, size }) => {
    return css`
      border: 0.2rem solid #dbdbdb;
      border-radius: ${theme.borderRadius.roundedFull};
      background-color: ${(props) => getColor(props)};
      width: ${size * 0.5}rem;
      height: ${size * 0.5}rem;
    `;
  }}
`;

export default DefaultLineWidth;
