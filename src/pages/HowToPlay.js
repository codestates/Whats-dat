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

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const HowToPlay = () => {
  const howToPlayDesc = [
    { src: "https://picsum.photos/200/300?random=1" },
    { src: "https://picsum.photos/200/300?random=1" },
    { src: "https://picsum.photos/200/300?random=1" },
    { src: "https://picsum.photos/200/300?random=1" },
    { src: "https://picsum.photos/200/300?random=1" },
    { src: "https://picsum.photos/200/300?random=1" },
    { src: "https://picsum.photos/200/300?random=1" },
  ];
  const renderSwiperSlider = () => {
    return howToPlayDesc.map(({ src }, i) => {
      return (
        <SwiperSlide key={i}>
          <Image url={src} border />
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
