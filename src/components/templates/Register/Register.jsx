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

import { RegisterWrapper } from "./Register.style";

const Register = ({ method }) => {
  return (
    <>
      <Background />
      <ResponsiveContainer>
        <RegisterWrapper>
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
            <SocialButton />
          </div>
        </RegisterWrapper>
      </ResponsiveContainer>
    </>
  );
};

Register.propTypes = {
  method: propTypes.func,
};

export default Register;
