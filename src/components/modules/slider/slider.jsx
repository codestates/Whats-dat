import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";
import List from "../list/list";
import Image from "../../atoms/image/image";
import Paragraph from "../../atoms/paragraph/paragraph";
import {
  StyledSingleSlide,
  StyledImageSlide,
  StyledSliderContainer,
  StyledSlidesContainer,
  StyledContentsContainer,
  ImageAndTextContainer,
} from "./slider.style";
import Pagination from "../pagination/pagination";
import useWindowSize from "./useWindowSize";

const variantOption = ["gamesPagination", "gameResultsPagination"];

const Slider = ({ variant, slideItems, slideWidth, className, joinRoom }) => {
  const [slideItemsData, setSlideItemsData] = useState(slideItems);
  const [currentSlide, setCurrentSlide] = useState(0);
  const windowSize = useWindowSize();

  useEffect(() => {
    setSlideItemsData(slideItems);
  }, [slideItems]);

  const slideRef = useRef(null);
  const totalSlides = slideItems ? slideItems.length - 1 : 0;

  const isFirstPage = () => currentSlide === 0;
  const isLastPage = () => currentSlide === totalSlides;

  const isFirstRound = () => currentSlide === 0;
  const isLastRound = () => currentSlide + 1 === totalSlides;

  const nextSlide = () => {
    if (!isLastPage()) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const nextRound = () => {
    if (!isLastRound()) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (!isFirstPage()) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const prevRound = () => {
    if (!isFirstRound()) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const renderSlideWidth = () => {
    const mobileCheck = () => windowSize < 550;
    switch (mobileCheck()) {
      case true:
        return slideWidth * 0.85;
      default:
        return slideWidth;
    }
  };
  useEffect(() => {
    const translateWidth = renderSlideWidth();
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${
      translateWidth * currentSlide
    }rem)`;
  }, [currentSlide, slideWidth, windowSize]);

  const renderImageSlides = (roundsList) => {
    const roundZero = roundsList[0];
    return roundsList.slice(1).map((round, index) => {
      if ("guess_img" in round) {
        return (
          <ImageAndTextContainer>
            <StyledImageSlide slideWidth={renderSlideWidth()}>
              <Image
                url={round.guess_img}
                size={renderSlideWidth()}
                className="slider__img"
              />
            </StyledImageSlide>
            <div className="slide__description">
              <div clasName="slide__paragraphContainer">
                <Paragraph
                  text={`${round.username} `}
                  size="sm"
                  weight="exbold"
                  className="slide__username"
                  color="navy"
                />
                <Paragraph text={`guessed `} size="sm" color="grey" />
                <Paragraph
                  text={`'${round.guessed_word}'`}
                  size="sm"
                  weight="exbold"
                  color="navy"
                />
              </div>
              <div clasName="slide__paragraphContainer">
                <Paragraph text={`for `} size="sm" color="grey" />
                <Paragraph
                  text={`${roundsList[index].username}`}
                  size="sm"
                  weight="exbold"
                  color="navy"
                />
                <Paragraph text={`'s drawing`} size="sm" color="grey" />
              </div>
            </div>
          </ImageAndTextContainer>
        );
      }
      if ("draw_word" in round) {
        return (
          <ImageAndTextContainer>
            <StyledImageSlide slideWidth={renderSlideWidth()}>
              <Image url={round.path_url} size={renderSlideWidth()} />
            </StyledImageSlide>
            <div className="slide__description">
              <div clasName="slide__paragraphContainer">
                <Paragraph
                  text={`${round.username} `}
                  size="sm"
                  weight="exbold"
                  className="slide__username"
                  color="navy"
                />
                <Paragraph
                  text="submitted the above drawing"
                  size="sm"
                  color="grey"
                />
              </div>
              <div clasName="slide__paragraphContainer">
                <Paragraph text={`for `} size="sm" color="grey" />
                <Paragraph
                  text={`${
                    index - 1 < 0
                      ? roundZero.username
                      : roundsList[index].username
                  }`}
                  size="sm"
                  weight="exbold"
                  color="navy"
                />
                <Paragraph text={`'s word `} size="sm" color="grey" />
                <Paragraph
                  text={`'${round.draw_word}'`}
                  size="sm"
                  weight="exbold"
                  color="navy"
                />
              </div>
            </div>
          </ImageAndTextContainer>
        );
      }
      return "loading";
    });
  };

  // foo();
  // const mappableData = Promise.resolve(slideItemsData[0]);

  const renderSlideItems = () => {
    switch (variant) {
      case "gamesPagination":
        return slideItemsData.map((slideItem, index) => {
          return (
            <StyledSingleSlide
              key={`${variant}${index}`}
              slideWidth={slideWidth}
            >
              <List
                key={`${variant}${index}`}
                listItemName="AvailableGameItem"
                listItemData={slideItem}
                className="slide__lists"
                joinRoom={joinRoom}
              />
            </StyledSingleSlide>
          );
        });

      case "gameResultsPagination":
        return renderImageSlides(slideItemsData);
      default:
        return "heeloo";
    }
  };

  return (
    <StyledSliderContainer
      slideWidth={slideWidth}
      variant={variant}
      className={className}
    >
      <StyledContentsContainer slideWidth={slideWidth}>
        <StyledSlidesContainer ref={slideRef}>
          {slideItemsData
            ? renderSlideItems(variant, slideItemsData)
            : "loading"}
        </StyledSlidesContainer>
      </StyledContentsContainer>
      <Pagination
        onClickPrev={variant === "gamesPagination" ? prevSlide : prevRound}
        onClickNext={variant === "gamesPagination" ? nextSlide : nextRound}
        isFirstPage={
          variant === "gamesPagination" ? isFirstPage() : isFirstRound()
        }
        isLastPage={
          variant === "gamesPagination" ? isLastPage() : isLastRound()
        }
        className="slide__pagination"
      />
    </StyledSliderContainer>
  );
};

Slider.propTypes = {
  variant: propTypes.oneOf(variantOption),
  slideItems: propTypes.arrayOf(propTypes.any),
  slideWidth: propTypes.number,
  className: propTypes.string,
  joinRoom: propTypes.func,
};

export default Slider;
