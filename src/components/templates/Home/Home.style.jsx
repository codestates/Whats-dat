import styled, { css } from "styled-components";
import Container from "../../atoms/container/container";
import Button from "../../atoms/button/button";
import Link from "../../atoms/link/link";
import RoundButton from "../../atoms/roundButton/roundButton";

export const HomeContainer = styled(Container)`
  ${({ theme }) => {
    return css`
      display: flex;
      height: 100%;
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;

      ${theme.device.mobile} {
        padding: 0 ${theme.paddings.base};
      }
    `;
  }}
`;

export const LoginButton = styled(Button)`
  ${({ theme }) => {
    return css`
      margin-bottom: ${theme.margins.base};
    `;
  }}
`;

export const SignUpButton = styled(Button)`
  ${({ theme }) => {
    return css`
      margin-bottom: ${theme.margins.lg};
    `;
  }}
`;

export const HomeLink = styled(Link)``;

export const RpqButton = styled(RoundButton)`
  ${({ theme }) => {
    return css`
      position: absolute;
      top: ${theme.margins.base};
      right: ${theme.margins.base};
    `;
  }}
`;

export const RpqIcon = styled.div`
  width: 80%;
  height: 80%;
  /* TODO: change img url */
  /* background-image: url('../../../assets/images/queen-crown.png'); */
  background-image: url("https://img.icons8.com/color/48/000000/queen-uk.png");
  background-size: cover;
  background-position: center;
  margin-top: -5px;
`;
