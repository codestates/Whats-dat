import styled, { css } from "styled-components";

const getPadding = ({ theme, padding }) => {
  if (!padding) return "0";
  return theme.paddings[padding];
};

const getBgColor = ({ theme, bgColor }) => {
  if (!bgColor) return theme.colors.white;
  return theme.colors[bgColor];
};

const getBorder = ({ border }) => {
  if (!border) return "none";
  return "1px solid #DBDBDB";
};

const getRadius = ({ theme, radius }) => {
  if (!radius) return "none";
  return theme.borderRadius[radius];
};

const getBoxShadow = ({ theme, boxShadow }) => {
  if (!boxShadow) return "none";
  return theme.boxShadow[boxShadow];
};

export const DefaultBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${(props) => getPadding(props)};
  background-color: ${(props) => getBgColor(props)};
  border: ${(props) => getBorder(props)};
  border-radius: ${(props) => getRadius(props)};
  box-shadow: ${(props) => getBoxShadow(props)};
`;

export default DefaultBox;
