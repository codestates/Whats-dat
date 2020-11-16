import React from "react";
import propTypes from "prop-types";
import StyledSocialButtonContainer from "./socialButton.style";
import RoundButton from "../../atoms/roundButton/roundButton";
import Icon from "../../atoms/icon/icon";

const SocialButtons = ({ googleLogin, twitterLogin, facebookLogin }) => {
  return (
    <StyledSocialButtonContainer>
      <RoundButton size="default" onClick={() => googleLogin()}>
        <Icon variant="SNS_GOOGLE" color="navy" />
      </RoundButton>
      <RoundButton size="default" onClick={() => facebookLogin()}>
        <Icon variant="SNS_FACEBOOK" color="navy" />
      </RoundButton>
      <RoundButton size="default" onClick={() => twitterLogin()}>
        <Icon variant="SNS_TWITTER" color="navy" />
      </RoundButton>
    </StyledSocialButtonContainer>
  );
};

SocialButtons.propTypes = {
  googleLogin: propTypes.func,
  twitterLogin: propTypes.func,
  facebookLogin: propTypes.func,
};

export default SocialButtons;
