import styled, { css } from "styled-components";

const defaultRoundButton = styled.button`
  ${({ theme, size, shadow }) => {
    let diameter = "5.5rem";

    if (size === "lg") {
      diameter = "6.4rem";
    } else if (size === "sm") {
      diameter = "4.5rem";
    } else if (size === "xsm") {
      diameter = "3.6rem";
    } else if (size === "xxsm") {
      diameter = "2rem";
    }

    return css`
      width: ${diameter};
      height: ${diameter};
      border-radius: ${theme.borderRadius.roundedFull};
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: ${shadow ? theme.boxShadow.shadowMd : "none"};
      cursor: pointer;

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

export const BasicRoundButton = styled(defaultRoundButton)`
  ${({ theme, color }) => {
    return css`
      background-color: ${theme.colors[color]};
      color: ${theme.colors.white};
    `;
  }}
`;

export const BorderRoundButton = styled(defaultRoundButton)`
  ${({ theme, color }) => {
    return css`
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors[color]};
      color: ${theme.colors[color]};
    `;
  }}
`;
