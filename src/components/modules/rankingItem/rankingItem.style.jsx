import styled, { css } from "styled-components";
import { DefaultBox } from "../../atoms/box/box.style";
import Avatar from "../../atoms/avatar/avatar";

export const ItemBox = styled(DefaultBox)`
  ${() => {
    return css`
      justify-content: space-between;

      div.m-left {
        margin-left: 1rem;
      }

      div.m-right {
        margin-right: 1rem;
      }

      div.row-container {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      div.col-container {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }

      div.font-size p {
        font-size: 1.2rem;
      }
    `;
  }}
`;

export const NonePaddingAvatar = styled(Avatar)`
  ${() => {
    return css`
      padding: 0.5rem;
    `;
  }}
`;
