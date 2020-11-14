import styled, { css } from "styled-components";

const getWidth = ({ width }) => {
  if (!width) return "200%";
  return `${width * 2}rem`;
};

const styleWidth = ({ width }) => {
  if (!width) return "100%";
  return `${width}rem`;
};

export const DefaultCanvas = styled.canvas`
  ${({ theme, width }) => {
    return css`
      display: block;
      width: ${width}rem;
      height: ${width}rem;
      style-width: 50rem;
      style-height: 50rem;
      border: 2px solid #dbdbdb;
    `;
  }}
`;

export default DefaultCanvas;

// export const DefaultCanvas = styled.canvas`
// 	${({ theme }) => {
// 		return css`
// 			display: block;
// 			width: ${(props) => getWidth(props)};
// 			height: ${(props) => getWidth(props)};
// 			style-width: ${(props) => styleWidth(props)};
// 			style-height: ${(props) => styleWidth(props)};
// 			border: 2px solid #dbdbdb;
// 		`;
// 	}}
// `;

// export const DefaultCanvas = styled.canvas.attrs((props) => {
// 	width: (props) => getWidth(props);
// 	height: (props) => getWidth(props);
// })`
// 	display: block;
// 	style-width: ${(props) => getWidth(props)};
// 	style-height: ${(props) => getWidth(props)};
// 	border: 2px solid #dbdbdb;
// `;
