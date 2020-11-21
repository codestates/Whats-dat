import styled, { css } from "styled-components";

export const ImageAndTextContainer = styled.div`
  ${({ theme, slideWidth }) => {
    return css`
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

      width: ${slideWidth};
      height: 100%;
      @media only screen and (max-width: 550px) {
        width: ${slideWidth * 0.85}rem;
        height: {slideWidth + 20}rem;
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
      ${"" /* display: flex; */}
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
  ${({ slideWidth, totalSlides }) => {
    return css`
      display: flex;
      width: ${slideWidth * totalSlides}rem;
    `;
  }}
`;

export const StyledContentsContainer = styled.div`
  ${({ slideWidth }) => {
    return css`
      width: ${slideWidth}rem;
      @media only screen and (max-width: 550px) {
        width: ${slideWidth * 0.85}rem;
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
  height: 100%;
  ${({ theme }) => {
    return css`
      .slide__pagination {
        width: 85%;
        z-index: 0;
        position: absolute;
        & > button {
          & > svg {
            color: ${theme.colors.navy};
            font-size: 2rem;
          }
        }

        @media only screen and (max-width: 550px) {
          width: 100%;
          position: static;
          display: flex;
          z-index: 99;
          justify-content: center;
        }
      }

      @media only screen and (max-width: 550px) {
        display: block;
      }
    `;
  }}
`;
