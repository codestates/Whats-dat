import styled, { css } from "styled-components";
import IconButton from "../../atoms/IconButton/iconButton";
import Header from "../../atoms/header/header";

export const RankingHeaderContainer = styled.div`
  ${({ theme }) => {
    return css`
      position: relative;
      width: 100%;
    `;
  }}
`;

export const CloseButton = styled(IconButton)`
  ${({ theme }) => {
    return css`
      position: absolute;
      top: 0;
      right: 0;
      padding: 0;
      ${"" /* top: ${theme.margins.sm}; */}
      ${"" /* right: ${theme.margins.sm}; */}
    `;
  }}
`;

export const RankingTitle = styled(Header)`
  ${({ theme }) => {
    return css`
      margin-top: ${theme.margins.lg};
      margin-bottom: ${theme.margins.lg};
      text-align: center;
      font-size: 3.5rem;
    `;
  }}
`;

export const ListContainer = styled.div`
  ${({ theme }) => {
    return css`
      width: 100%;
      max-height: 40vh;
      overflow: scroll;
      overflow-x: hidden;
    `;
  }}
`;
