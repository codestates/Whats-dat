import styled, { css } from "styled-components";
import { DefaultBox } from "../../atoms/box/box.style";
import Avatar from "../../atoms/avatar/avatar";

export const ItemBox = styled(DefaultBox)`
  ${() => {
    return css`
      justify-content: space-between;

      div.m-left {
        margin-left: 0.5rem;
      }

      div.m-right {
        margin-right: 0.5rem;
      }

      div.row-container {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      div.small {
        width: 1.7rem;
        height: 1.7rem;
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
