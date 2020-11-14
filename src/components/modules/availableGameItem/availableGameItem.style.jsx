import styled, { css } from "styled-components";
import { DefaultBox } from "../../atoms/box/box.style";

export const ItemBox = styled(DefaultBox)`
  width: 100%;
  cursor: pointer;

  ${({ theme }) => {
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
      p.gameItem__roomname {
        font-weight: 350;
      }
      &:hover {
        background-color: ${theme.colors.lightGrey};
      }
      &:active {
        transform: translateY(2px);
      }
    `;
  }};
`;

export default ItemBox;
