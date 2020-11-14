import styled, { css } from "styled-components";
import Header from "../../atoms/header/header";
import IconButton from "../../atoms/IconButton/iconButton";

export const HeaderContainer = styled.div`
  ${({ theme }) => {
    return css`
      position: relative;
      width: 100%;
      padding-bottom: ${theme.paddings.base};
    `;
  }}
`;

export const ProfileTitle = styled(Header)`
  ${({ theme }) => {
    return css`
      text-align: center;
      font-size: 4rem;
      margin-top: ${theme.margins.base};
    `;
  }}
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
`;

export const ButtonListContainer = styled.div`
  width: 100%;
  padding: 3rem;
`;
