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

import { LoginWrapper } from "./Login.style";

const Login = ({ method, googleLogin, twitterLogin, facebookLogin }) => {
  return (
    <>
      <Background />
      <ResponsiveContainer>
        <LoginWrapper>
          <div className="header-group">
            <Header variant="h2" text="Welcome back" />
            <Header
              variant="h5"
              text="We're super happy to see you again!"
              weight="base"
              color="grey"
            />
            <Header
              variant="h5"
              text="Let's log you in."
              weight="base"
              color="grey"
            />
          </div>

          <ModuleForm type="login" method={method} />

          <Paragraph text="Forgot Password?" size="sm" color="grey" />

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
        </LoginWrapper>
      </ResponsiveContainer>
    </>
  );
};

Login.propTypes = {
  method: propTypes.func.isRequired,
  googleLogin: propTypes.func,
  twitterLogin: propTypes.func,
  facebookLogin: propTypes.func,
};

export default Login;
