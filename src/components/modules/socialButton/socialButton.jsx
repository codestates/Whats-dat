import React from "react";
import StyledSocialButtonContainer from "./socialButton.style";
import RoundButton from "../../atoms/roundButton/roundButton";
import Icon from "../../atoms/icon/icon";

const SocialButtons = () => {
  return (
    <StyledSocialButtonContainer>
      <RoundButton size="default">
        <Icon variant="SNS_GOOGLE" color="navy" />
      </RoundButton>
      <RoundButton size="default">
        <Icon variant="SNS_FACEBOOK" color="navy" />
      </RoundButton>
      <RoundButton size="default">
        <Icon variant="SNS_TWITTER" color="navy" />
      </RoundButton>
    </StyledSocialButtonContainer>
  );
};

export default SocialButtons;
