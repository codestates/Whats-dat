import styled, { css } from "styled-components";
import Avatar from "../../atoms/avatar/avatar";
import Paragraph from "../../atoms/paragraph/paragraph";

export const StyledGameProgress = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
`;

export const StyledGameProgressColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0.3rem;

  div.gameProgress__username {
    width: 3.5rem;
    max-width: 3.5rem;
    text-align: center;
    word-break: break-all;
    white-space: pre-line;
  }

  ${({ theme }) => {
    return css`
      div.gameProgress__avatar {
        ${theme.device.mobile} {
          width: 2.4rem;
          height: 2.4rem;
          padding: 0;
          font-size: 1rem;
        }
        margin-bottom: ${theme.margins.xxsm};
      }
      div.gameProgress__nextIcon {
        margin-top: ${theme.margins.sm};
      }
    `;
  }}
`;

export const Nickname = styled(Paragraph)`
  white-space: nowrap;
`;
export const NonePaddingAvatar = styled(Avatar)`
  padding: 0.5rem;
`;
