import styled, { css } from "styled-components";
import IconButton from "../../atoms/IconButton/iconButton";

export const LoginWrapper = styled.div`
  ${({ theme }) => {
    return css`
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: 90%;
      text-align: center;

      form {
        h2 {
          display: none;
        }
      }

      .header-group {
        margin-bottom: ${theme.margins.sm};
        h2 {
          margin-bottom: ${theme.margins.xsm};
        }
        h5 {
          line-height: ${theme.fonts.size.base};
        }
      }

      .divider__button {
        margin: 4rem 0 6rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .horizontal_line {
          background-color: ${theme.colors.lightGrey};
          box-shadow: ${theme.boxShadow.shadowXl};
          width: 85%;
          height: 2px;
        }

        button {
          position: absolute;
          left: 47.5%;
          cursor: auto;

          * {
            font-size: ${theme.fonts.size.base};
          }
        }
      }

      .social__button > * > * {
        background-color: white;
        border: 1px ${theme.colors.lightGrey} solid;
        box-shadow: ${theme.boxShadow.shadowLg};
      }
    `;
  }}
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
`;

export default LoginWrapper;
