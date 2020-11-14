import styled, { css } from "styled-components";

const getWidth = ({ width }) => {
  return width || 100;
};

const getBorderColor = ({ theme, borderColor }) => {
  if (!borderColor) return theme.colors.lightGrey;
  return theme.colors[borderColor];
};

export const DefaultDivider = styled.hr`
  ${() => {
    return css`
      width: ${(props) => getWidth(props)}%;
      border: 1px solid ${(props) => getBorderColor(props)};
    `;
  }}
`;

export default DefaultDivider;
