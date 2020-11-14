import styled, { css } from "styled-components";

const processSizes = (sizes) => {
  switch (sizes) {
    case "xSm":
      return "2.4rem";
    case "sm":
      return "4rem";
    case "md":
      return "5.6rem";
    case "lg":
      return "10.2rem";
    default:
      return null;
  }
};

export const DefaultAvatar = styled.div`
  ${({
    theme,
    imgUrl,
    sizes,
    bgColor,
    border,
    borderColor,
    borderWidth,
    logoSize,
  }) => {
    return css`
      padding: ${theme.paddings.sm};
      background-color: ${theme.colors[bgColor]};
      border-radius: ${theme.borderRadius.roundedFull};
      width: ${() => processSizes(sizes)};
      height: ${() => processSizes(sizes)};
      border: ${border
        ? `solid ${borderWidth} ${theme.colors[borderColor]}` // TODO proportional borderWidth
        : "none"};
      background: ${imgUrl
        ? `url(${imgUrl}) no-repeat center`
        : theme.colors[bgColor]};
      background-size: ${() => processSizes(sizes)};
      display: flex;
      justify-content: center;
      align-items: center;

      & > * {
        width: 100%;
        font-size: ${logoSize};
        text-align: center;
        justify-self: center;
        align-self: center;
      }
    `;
  }}
`;

export default DefaultAvatar;
