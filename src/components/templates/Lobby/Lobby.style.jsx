import styled, { css } from "styled-components";
import IconButton from "../../atoms/IconButton/iconButton";
import Paragraph from "../../atoms/paragraph/paragraph";
import Header from "../../atoms/header/header";

export const LobbyHeader = styled.div`
  ${({ theme }) => {
    return css`
      width: 100%;
      position: relative;
      padding-bottom: ${theme.paddings.lg};
      margin-bottom: ${theme.margins.lg};
    `;
  }}
`;

export const SettingBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export const GameSecond = styled(Paragraph)`
  ${({ theme }) => {
    return css`
      ${theme.device.mobile} {
        font-size: ${theme.fonts.size.sm};
        margin-top: 3rem;
      }
    `;
  }}
`;

export const Settingbutton = styled(IconButton)`
  ${({ theme }) => {
    return css`
      ${theme.device.mobile} {
        font-size: 2rem;
        padding: 0;
      }
    `;
  }}
`;

export const GameMode = styled(Paragraph)`
  ${({ theme }) => {
    return css`
      ${theme.device.mobile} {
        font-size: ${theme.fonts.size.sm};
      }
    `;
  }}
`;

export const ExitButton = styled(IconButton)`
  ${({ theme }) => {
    return css`
      position: absolute;
      right: 0;
      top: 0;

      ${theme.device.mobile} {
        font-size: 2rem;
        padding: 0;
      }
    `;
  }}
`;

export const RoomTitle = styled(Header)`
  ${({ theme }) => {
    return css`
      text-align: center;
      font-size: 4rem;
      margin-top: ${theme.margins.base};

      ${theme.device.mobile} {
        font-size: 3rem;
        margin-top: ${theme.margins.xsm};
      }
    `;
  }}
`;

export const RoomCode = styled(Paragraph)`
  ${({ theme }) => {
    return css`
      text-align: center;

      ${theme.device.mobile} {
        font-size: 1.8rem;
      }
    `;
  }}
`;

export const CurrentUserNum = styled(Paragraph)`
  ${({ theme }) => {
    return css`
      position: absolute;
      bottom: 0;
      right: 0;
    `;
  }}
`;
