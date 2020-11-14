import React from "react";
import { IconContext } from "react-icons";
import propTypes from "prop-types";
// avrtar icon
import {
  FaGrinBeam,
  FaHorse,
  FaHatWizard,
  FaIceCream,
  FaKiwiBird,
  FaSkull,
  FaGoogle,
  FaTwitter,
  FaFacebookF,
  FaCloud,
} from "react-icons/fa";
// button icon
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsDown,
  FiX,
  FiPlus,
  FiMinus,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import {
  RiCheckboxCircleLine,
  RiCheckboxBlankCircleLine,
  RiMedalFill,
} from "react-icons/ri";

// cloud
import { SiIcloud } from "react-icons/si";
import { IoIosCloudy } from "react-icons/io";
// game result
import theme from "../../../styles/Theme";

export const icons = {
  SNS_GOOGLE: FaGoogle,
  SNS_TWITTER: FaTwitter,
  SNS_FACEBOOK: FaFacebookF,
  BUTTON_LEFT: FiChevronLeft,
  BUTTON_RIGHT: FiChevronRight,
  BUTTON_DOWN: FiChevronsDown,
  BUTTON_X: FiX,
  BUTTON_CHECK: RiCheckboxBlankCircleLine,
  BUTTON_CHECK_SELECT: RiCheckboxCircleLine,
  BUTTON_PLUS: FiPlus,
  BUTTON_MINUS: FiMinus,
  BUTTON_SETTING: FiSettings,
  BUTTON_EXIT: FiLogOut,
  AVATAR_SKULL: FaSkull,
  AVATAR_KIWI: FaKiwiBird,
  AVATAR_ICECREAM: FaIceCream,
  AVATAR_WIZARD: FaHatWizard,
  AVATAR_HORSE: FaHorse,
  AVATAR_SMILE: FaGrinBeam,
  CLOUD_A: FaCloud,
  CLOUD_B: SiIcloud,
  CLOUD_C: IoIosCloudy,
  MEDAL: RiMedalFill,
};

const Icon = ({ variant, color }) => {
  const IconType = icons[variant];
  return (
    <IconContext.Provider value={{ color: theme.colors[color] }}>
      <IconType />
    </IconContext.Provider>
  );
};

Icon.propTypes = {
  color: propTypes.oneOf(Object.keys(theme.colors)),
  variant: propTypes.oneOf(Object.keys(icons)).isRequired,
};

export default Icon;
