import styled, { css } from "styled-components";

export const AuthForm = styled.div`
  ${({ theme }) => {
    return css`
      width: 100%;
      margin: 0 auto;
      padding: ${theme.paddings.base};
      display: flex;
      flex-direction: column;
      text-align: center;

      h1,
      h2,
      h3,
      h4 {
        margin-bottom: ${theme.margins.xl};
      }

      .label-alias {
        display: none;
      }

      div {
        margin-bottom: ${theme.margins.sm};
      }

      button {
        width: 100%;
        margin-top: ${theme.margins.base};
        padding: 1rem;
      }
      .formik__error {
        height: 1rem;
      }
    `;
  }}
`;

export const SimpleForm = styled(AuthForm)`
  ${({ theme }) => {
    return css`
      input {
        padding-left: ${theme.paddings.lg};
      }

      button {
        margin-top: 0rem;
        width: 50%;
        padding: 1rem;
      }
    `;
  }}
`;

export const InfoForm = styled(AuthForm)`
  ${({ theme }) => {
    return css`
      .radio-group {
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
      }

      .radio-group input {
      }

      .radio-group .circles {
        box-shadow: ${theme.boxShadow.shadow};
        text-align: center;
        font-size: ${theme.fonts.size.lg};
        cursor: pointer;
      }

      .radio-group .circles input {
        position: fixed;
        appearance: none;
        width: 7rem;
        height: 7rem;
        outline: none;
      }
    `;
  }}
`;

export const CounterForm = styled(AuthForm)`
  ${({ theme }) => {
    return css`
      input {
        margin-top: 1rem;
      }

      select {
        margin-top: 1rem;
      }

      .counter-group {
        padding-top: ${theme.paddings.base};
        display: flex;
        justify-content: center;
        align-items: center;
        & > * {
          display: inline-block;
        }
      }

      input[type="number"] {
        text-align: center;
        border: none;
        font-size: 2rem;
        width: 30px;
        padding: 0;
        margin: 0;
        outline: none;
      }

      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      input[type="number"]:disabled {
        background: ${theme.colors.white};
      }

      .plus-circle,
      .minus-circle {
        display: flex;
        margin-right: 1rem;
        margin-left: 1rem;
        margin-bottom: 0rem;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3rem;
        border-radius: ${theme.borderRadius.roundedFull};
        box-shadow: ${theme.boxShadow.shadowXl};
        background-color: red;
        cursor: pointer;
      }
      .minus-circle {
        background-color: ${theme.colors.lightGrey};
      }

      .plus-circle {
        background-color: ${theme.colors.secondary};
        color: white;
      }

      .minus-circle:active {
        background-color: ${theme.colors.grey};
        box-shadow: 0 2px ${theme.colors.grey};
        transform: translateY(2px);
      }

      .plus-circle:active {
        background-color: ${theme.colors.primary};
        box-shadow: 0 2px ${theme.colors.primary};
        transform: translateY(2px);
      }
    `;
  }}
`;
