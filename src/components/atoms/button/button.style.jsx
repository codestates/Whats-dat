import styled, { css } from "styled-components";

export const DefaultButton = styled.button`
  ${({ theme, size, bold, shadow, fullWidth }) => {
    let padding = `1.6rem 4rem`;
    let weight = "bold";

    if (size === "sm") {
      padding = "1rem 2rem";
    } else if (size === "xsm") {
      padding = ".8rem 1.5rem";
    }

    if (bold) {
      weight = "exbold";
    }

    return css`
      padding: ${padding};
      font-size: ${theme.fonts.size.base};
      border-radius: ${theme.borderRadius.roundedFull};
      width: ${fullWidth ? "100%" : null};
      font-weight: ${theme.fonts.weight[weight]};
      cursor: pointer;
      box-shadow: ${shadow ? theme.boxShadow.shadowMd : "none"};
      transform: translateY(0);
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(1px);
      }
    `;
  }}
`;

export const BasicButton = styled(DefaultButton)`
  ${({ theme, color }) => {
    return css`
      background-color: ${theme.colors[color]};
      color: ${theme.colors.white};
    `;
  }}
`;

export const BorderButton = styled(DefaultButton)`
  ${({ theme, color }) => {
    return css`
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors[color]};
      color: ${theme.colors[color]};
    `;
  }}
`;
