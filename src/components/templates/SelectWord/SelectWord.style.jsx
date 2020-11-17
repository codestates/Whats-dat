import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";

export const CustomContainer = styled(Container)`
  ${({ theme }) => {
    return css`
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      div.row-container {
        width: 100%;
        margin-bottom: ${theme.paddings.xl};
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        text-align: center;
        align-items: center;
      }

      div.m-top {
        margin-top: 1rem;
      }

      div.m-bottom {
        margin-bottom: 1rem;
      }

      h3 {
        margin-top: 1rem;
      }

      input {
        width: 100%;
        text-align: center;
        margin-bot: 0;
      }

      form > button {
        margin: 0;
      }
    `;
  }}
`;

export const ButtonLists = styled.div`
  ${({ theme }) => {
    return css`
				display: flex;
				width: 100%;
				flex-direction: column;
				gap: ${theme.margins.sm};
			}
		`;
  }}
`;

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
