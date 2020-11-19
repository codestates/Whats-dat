import { createGlobalStyle, css } from "styled-components";
import reset from "./reset.css";

const GlobalStyle = createGlobalStyle`
    ${reset};

    html, body, #root{
      height: 100%;
    }

    ${({ theme }) => {
      return css`
        html {
          font-size: 70.5%;
        }

        ${theme.device.desktopL} {
          html {
            font-size: 62.5%;
          }
        }

        ${theme.device.mobile} {
          html {
            font-size: 58%;
          }
        }
        body {
          font-family: ${theme.fonts.family.base};
          font-weight: ${theme.fonts.weight.normal};
          font-size: ${theme.fonts.size.base};
        }
      `;
    }}
`;

export default GlobalStyle;
