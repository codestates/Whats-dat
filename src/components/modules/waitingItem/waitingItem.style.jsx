import styled, { css } from "styled-components";
import { DefaultBox } from "../../atoms/box/box.style";
import Avatar from "../../atoms/avatar/avatar";

export const ItemBox = styled(DefaultBox)`
  ${({ theme }) => {
    return css`
      display: flex;
      justify-content: start;
      ${"" /* grid-template-columns: 1fr auto 1fr; */}
      div.m-left {
        margin-left: 0.7rem;
      }

      div.m-right {
        margin-right: 0.7rem;
      }

      div.row-container {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    `;
  }}
`;

export const NonePaddingAvatar = styled(Avatar)`
  ${({ theme }) => {
    return css`
      padding: 0.5rem;
    `;
  }}
`;
