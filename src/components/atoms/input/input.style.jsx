import styled, { css } from "styled-components";

export const DefaultInput = styled.div`
  ${({ theme, colors, bordercolors, fullWidth, padLeft }) => {
    return css`
      position: relative;

      input {
        width: ${fullWidth ? `100%` : null};
        padding: ${theme.paddings.sm};
        font-size: 1.6rem;
        padding-left: ${padLeft};
        height: 100%;
        border: solid 2px;
        border-color: ${theme.colors.lightGrey};
        border-radius: ${theme.borderRadius.roundedFull};
        color: ${theme.colors.grey};
      }

      & > *:not(input) {
        color: ${theme.colors.lightGrey};
        position: absolute;
        transform: translateY(70%);
        left: 2rem;
      }

      input::placeholder {
        color: ${theme.colors.lightGrey};
        font-size: 1.4rem;
      }

      input:focus {
        outline: none;
        border: solid 2px;
        border-radius: ${theme.borderRadius.roundedFull};
        background-color: ${theme.colors[colors]};
        border-color: ${theme.colors[bordercolors]};
      }
    `;
  }}
`;

export const SelectInput = styled.select`
  ${({ theme, colors, bordercolors }) => {
    return css`
      appearance: none;
      background: url("data:image/svg+xml,%3Csvg stroke='currentColor' fill='none' stroke-width='2' viewBox='0 0 24 24' stroke-linecap='round' stroke-linejoin='round' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")
        no-repeat right;
      background-position-x: 99%;
      background-color: ${theme.colors.white};
      max-width: 100%;
      font-size: ${theme.fonts.size.base};
      font-weight: ${theme.fonts.weight.normal};
      padding: ${theme.paddings.xsm} ${theme.paddings.base};
      margin-top: ${theme.paddings.xxsm};
      width: 100%;
      border: 2px solid ${theme.colors.lightGrey};
      border-radius: ${theme.borderRadius.roundedFull};
      color: ${theme.colors[colors]};

      &:focus {
        border-color: ${theme.colors[bordercolors] || theme.colors.grey};
        border-radius: ${theme.borderRadius.roundedFull};
        outline: none;
        color: ${theme.colors[bordercolors]};
        border-radius: ${theme.borderRadius.roundedFull};
        border-color: ${theme.colors[bordercolors]};
      }
    `;
  }}
`;
