import React from "react";
import propTypes from "prop-types";

import Background from "../../atoms/background/Background";
import ModuleForm from "../../modules/form/moduleForm";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Header from "../../atoms/header/header";
import Paragraph from "../../atoms/paragraph/paragraph";
import RoundButton from "../../atoms/roundButton/roundButton";
import SocialButton from "../../modules/socialButton/socialButton";
import Icon from "../../atoms/icon/icon";

import { RegisterWrapper, CloseButton } from "./Register.style";

const Register = ({
  method,
  googleLogin,
  facebookLogin,
  twitterLogin,
  handleClose,
}) => {
  return (
    <>
      <Background />
      <ResponsiveContainer>
        <RegisterWrapper>
          <CloseButton size="3" onClick={handleClose}>
            <Icon variant="BUTTON_X" color="navy" />
          </CloseButton>
          <div className="header-group">
            <Header variant="h2" text="Create an account" />
            <Header
              variant="h5"
              text="Don't worry, it's super fast"
              weight="base"
              color="grey"
            />
          </div>

          <ModuleForm type="register" method={method} />

          <div className="divider__button">
            <RoundButton
              color="white"
              size="xsm"
              variant="border"
              shadow="true"
            >
              <Icon variant="BUTTON_DOWN" color="darkGrey" />
            </RoundButton>
            <div className="horizontal_line" />
          </div>

          <Paragraph text="Or login with social media" size="sm" color="grey" />

          <div className="social__button">
            <SocialButton
              googleLogin={googleLogin}
              twitterLogin={twitterLogin}
              facebookLogin={facebookLogin}
            />
          </div>
        </RegisterWrapper>
      </ResponsiveContainer>
    </>
  );
};

Register.propTypes = {
  method: propTypes.func,
  googleLogin: propTypes.func,
  facebookLogin: propTypes.func,
  twitterLogin: propTypes.func,
  handleClose: propTypes.func,
};

export default Register;
