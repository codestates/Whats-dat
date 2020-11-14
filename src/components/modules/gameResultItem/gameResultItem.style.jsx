import styled, { css } from "styled-components";
import { DefaultBox } from "../../atoms/box/box.style";

export const ItemBox = styled(DefaultBox)`
  ${({ theme, isWinnerStatus }) => {
    return css`
      justify-content: space-between;
      cursor: pointer;

      &:hover {
        background-color: ${isWinnerStatus
          ? theme.colors.tertiary
          : theme.colors.lightGrey};
      }
      &:active {
        transform: translateY(2px);
      }

      div.width {
        width: 22rem;
      }

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

      div.small {
        width: 1.5rem;
        height: 1.5rem;
      }
    `;
  }}
`;

export default ItemBox;
