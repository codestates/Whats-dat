import React from "react";
import { Link } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { SliderContainer } from "../components/atoms/SliderContainer/SliderContainer.styled";
import Image from "../components/atoms/image/image";
import IconButton from "../components/atoms/IconButton/iconButton";
import Icon from "../components/atoms/icon/icon";
import { ButtonContainer } from "../components/atoms/ButtonContainer/ButtonContainer.styled";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "../styles/swiper.css";
import ResponsiveContainer from "../components/modules/responsiveContainer/responsiveContainer";
import ROUTES from "../utils/RoutePath";
import howToPlay1 from "../assets/images/how-to-play1.png";
import howToPlay2 from "../assets/images/how-to-play2.png";
import howToPlay3 from "../assets/images/how-to-play3.png";
import howToPlay4 from "../assets/images/how-to-play4.png";
import howToPlay5 from "../assets/images/how-to-play5.png";
import howToPlay6 from "../assets/images/how-to-play6.png";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const HowToPlay = () => {
  const howToPlayDesc = [
    { src: howToPlay1 },
    { src: howToPlay2 },
    { src: howToPlay3 },
    { src: howToPlay4 },
    { src: howToPlay5 },
    { src: howToPlay6 },
  ];
  const renderSwiperSlider = () => {
    return howToPlayDesc.map(({ src }, i) => {
      return (
        <SwiperSlide key={i}>
          <img
            alt="how-to-play"
            src={src}
            style={{ width: "100%", height: "100%" }}
          />
        </SwiperSlide>
      );
    });
  };

  return (
    <ResponsiveContainer>
      <ButtonContainer>
        <Link to={ROUTES.HOME}>
          <IconButton size={2}>
            <Icon variant="BUTTON_X" />
          </IconButton>
        </Link>
      </ButtonContainer>
      <SliderContainer>
        <Swiper slidesPerView={1} navigation pagination={{ clickable: true }}>
          {renderSwiperSlider()}
        </Swiper>
      </SliderContainer>
    </ResponsiveContainer>
  );
};

export default HowToPlay;
