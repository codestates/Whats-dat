import styled, { css } from "styled-components";

export const ImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div.slide__paragraphContainer {
    margin: 1rem;
  }

  .slide__description {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 0;
    p {
      display: inline;
    }
  }

  ${({ theme, slideWidth }) => {
    return css`
      width: ${slideWidth};
      height: 100%;
      @media only screen and (max-width: 550px) {
        width: ${slideWidth * 0.85}rem;
        height: {slideWidth + 20}rem;
        .slide__description {
          margin-top: 3rem;
        }
      }
      ${theme.device.mobile} {
        display: flex;
        align-items: center;
        .slide__description {
          margin-top: 3rem;
        }
      }
    `;
  }}
`;

export const StyledImageSlide = styled.div`
  ${({ slideWidth }) => {
    return css`
      width: 100%;
      max-width: ${slideWidth}rem;
      padding-bottom: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-top: 1rem;
    `;
  }}
`;

export const StyledSingleSlide = styled.div`
  ${({ slideWidth, theme }) => {
    return css`
      width: 100%;
      max-width: ${slideWidth}rem;
      padding-bottom: 1rem;
      div.slide__lists {
        display: flex;
        justify-content: space-between;
        width: ${slideWidth}rem;
        border: 1px solid ${theme.colors.grey};
        opacity: 0.8;
      }
      @media only screen and (max-width: 550px) {
        width: ${slideWidth * 0.85}rem;
        div.slide__lists{
          width: ${slideWidth * 0.85}rem;
        }
      }

        ${theme.device.mobile} {
          display: flex;
          justify-content: space-between;
          max-width: ${theme.size.mobile};
          width: ${slideWidth}rem;
        }
      }
    `;
  }}
`;

export const StyledSlidesContainer = styled.div`
  width: 120rem;
  display: flex;
`;

export const StyledContentsContainer = styled.div`
  ${({ slideWidth }) => {
    return css`
      width: ${slideWidth}rem;
      @media only screen and (max-width: 550px) {
        width: ${slideWidth * 0.85}rem;
        height: 100%;
      }
    `;
  }}
  position: relative;
  overflow: hidden;
  z-index: 99;
`;

export const StyledSliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  ${({ slideWidth, theme, variant }) => {
    return css`
      .slide__pagination {
        z-index: 0;
        position: absolute;
        width: 80%;
        & > button {
          & > svg {
            color: ${theme.colors.navy};
            font-size: 2rem;
          }
        }
      }

      @media only screen and (max-width: 500px) {
        flex-direction: column;
        align-items: center;
        .slide__pagination {
          z-index: 99;
          display: flex;
          justify-content: center;
          margin-top: ${variant === "gamesPagination"
            ? slideWidth + 4
            : slideWidth - 7.5}rem;
        }
      }
    `;
  }}
`;
