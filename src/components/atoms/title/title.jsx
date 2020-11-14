import React from "react";
import propTypes from "prop-types";
import { TitleHeader } from "./title.style";
import desktopTitle from "../../../assets/images/title_desktop.png";
import mobileTitle from "../../../assets/images/title_mobile.png";

const TitleIcon = ({ device, className }) => {
  switch (device) {
    case "desktop":
      return <TitleHeader src={desktopTitle} className={className} />;
    case "mobile":
      return <TitleHeader src={mobileTitle} className={className} />;
    default:
      return <TitleHeader src={desktopTitle} className={className} />;
  }
};

TitleIcon.propTypes = {
  device: propTypes.string,
  className: propTypes.string,
};

export default TitleIcon;
