import React from "react";
import * as Yup from "yup";
import { FiMail, FiLock } from "react-icons/fi";
import propTypes from "prop-types";
import FormikContainer from "./Formik/FormikContainer";
import FormikControl from "./Formik/FormikControl";
import {
  AuthForm,
  InfoForm,
  CounterForm,
  SimpleForm,
} from "./moduleForm.style";

const loginConfig = {
  formInfo: {
    formTitle: "login",
    formSubtitle: null,
    buttonName: "Login",
  },

  initialValues: {
    email: "",
    password: "",
  },

  validationSchema: Yup.object({
    email: Yup.string().required("Email is a required field"),
    password: Yup.string().required("Password is Required"),
  }),
  onSubmit: (values) => {
    // FIXME
    // eslint-disable-next-line
    console.log("form-data", values);
  },
};

const registerConfig = {
  formInfo: {
    formTitle: "register",
    formSubtitle: null,
    buttonName: "Register",
  },

  initialValues: {
    email: "",
    password: "",
    password2: "",
  },

  validationSchema: Yup.object({
    email: Yup.string().required("Email is a required field"),
    password: Yup.string().required("Password is Required"),
    password2: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  }),
  // eslint-disable-next-line
  onSubmit: (values) => console.log("form-data", values),
};

const detailInfoConfig = {
  formInfo: {
    formTitle: "Detail Info Form",
    formSubtitle: "Select Your Avatar",
    buttonName: "Confirm",
  },

  initialValues: {
    avatar: "",
    nickname: "",
    avatarColor: "",
  },

  validationSchema: Yup.object({
    avatar: Yup.string().required("You Must Select an Avatar"),
    nickname: Yup.string().required("Please Enter Your Nickname"),
  }),
  // eslint-disable-next-line
  onSubmit: (values) => console.log("form-data", values),
};

const selectWordConfig = {
  formInfo: {
    formTitle: null,
    formSubtitle: null,
    buttonName: "Submit",
  },

  initialValues: {
    word: "",
  },

  validationSchema: Yup.object({}),
  // eslint-disable-next-line
  onSubmit: (values) => console.log("form-data", values),
};

const enterCodeConfig = {
  formInfo: {
    formTitle: "Enter Code",
    formSubtitle: null,
    buttonName: "Submit",
  },

  initialValues: {
    code: "",
  },

  validationSchema: Yup.object({
    code: Yup.string()
      .required("You must enter the Code")
      .max(20, "Room Name cannot be more than 20 characters."),
  }),
  // eslint-disable-next-line
  onSubmit: (values) => console.log("form-data", values),
};

const enterGuessConfig = {
  formInfo: {
    formTitle: null,
    formSubtitle: null,
    buttonName: "Submit",
  },

  initialValues: {
    word: "",
  },

  validationSchema: Yup.object({}),
  // eslint-disable-next-line
  onSubmit: (values) => console.log("form-data", values),
};

const settingConfig = {
  formInfo: {
    formTitle: "Setting",
    formSubtitle: null,
    cancelButton: true,
    buttonName: "Confirm",
  },

  initialValues: {
    roomname: "",
    limitTime: 20,
    maxPlayers: 4,
  },

  validationSchema: Yup.object({
    roomname: Yup.string()
      .required("You must enter room name")
      .max(20, "Room name cannot be more than 20 characters."),
  }),
  // eslint-disable-next-line
  onSubmit: (values) => console.log("form-data", values),
};

const gameStartConfig = {
  formInfo: {
    formTitle: "New Game",
    formSubtitle: null,
    cancelButton: false,
    buttonName: "Confirm",
  },

  validationSchema: Yup.object({}),
  // eslint-disable-next-line
  onSubmit: (values) => console.log("form-data", values),
};

const ModuleForm = ({
  type,
  options,
  btncolor,
  initialValues,
  selectedWord,
  children,
  method,
  getValue,
}) => {
  switch (type) {
    case "login":
      return (
        <AuthForm>
          <FormikContainer
            formInfo={loginConfig.formInfo}
            initialValues={loginConfig.initialValues}
            validationSchema={loginConfig.validationSchema}
            onSubmit={loginConfig.onSubmit}
            method={method}
          >
            <FormikControl
              control="input"
              type="email"
              label="email"
              name="email"
              placeholder="Your Email Address"
              icon
              bordercolors="secondary"
            >
              <FiMail />
            </FormikControl>

            <FormikControl
              control="input"
              type="password"
              label="password"
              name="password"
              placeholder="Your Password"
              bordercolors="secondary"
              icon
            >
              <FiLock />
            </FormikControl>
          </FormikContainer>
        </AuthForm>
      );

    case "register":
      return (
        <AuthForm>
          <FormikContainer
            formInfo={registerConfig.formInfo}
            initialValues={registerConfig.initialValues}
            validationSchema={registerConfig.validationSchema}
            method={method}
          >
            <FormikControl
              control="input"
              type="email"
              label="email"
              name="email"
              placeholder="Your Email Address"
              icon
              bordercolors="secondary"
            >
              <FiMail />
            </FormikControl>

            <FormikControl
              control="input"
              type="password"
              label="password"
              name="password"
              placeholder="Your Password"
              icon
              bordercolors="secondary"
            >
              <FiLock />
            </FormikControl>

            <FormikControl
              control="input"
              type="password"
              label="password2"
              name="password2"
              placeholder="Confirm Password"
              icon
              bordercolors="secondary"
            >
              <FiLock />
            </FormikControl>
          </FormikContainer>
        </AuthForm>
      );

    case "detailInfo":
      return (
        <InfoForm>
          <FormikContainer
            formInfo={detailInfoConfig.formInfo}
            initialValues={initialValues}
            validationSchema={detailInfoConfig.validationSchema}
            onSubmit={detailInfoConfig.onSubmit}
            method={method}
          >
            <FormikControl
              control="radio"
              label="radio"
              name="avatar"
              options={options}
            />
            <FormikControl
              icon={false}
              control="input"
              type="text"
              label="nickname"
              name="nickname"
              placeholder="Nickname"
              bordercolors="secondary"
            />
          </FormikContainer>
        </InfoForm>
      );

    case "selectWord":
      return (
        <AuthForm>
          <FormikContainer
            formInfo={selectWordConfig.formInfo}
            initialValues={selectWordConfig.initialValues}
            validationSchema={selectWordConfig.validationSchema}
            onSubmit={selectWordConfig.onSubmit}
            btncolor={btncolor}
            method={method}
          >
            {children}
          </FormikContainer>
        </AuthForm>
      );

    case "enterCode":
      return (
        <AuthForm>
          <FormikContainer
            formInfo={enterCodeConfig.formInfo}
            initialValues={enterCodeConfig.initialValues}
            validationSchema={enterCodeConfig.validationSchema}
            method={method}
            btncolor={btncolor}
          >
            <FormikControl
              control="input"
              type="text"
              label="code"
              name="code"
              placeholder="Enter your code..."
              icon={false}
              bordercolors="secondary"
            />
          </FormikContainer>
        </AuthForm>
      );

    case "enterGuess":
      return (
        <SimpleForm>
          <FormikContainer
            formInfo={enterGuessConfig.formInfo}
            initialValues={enterGuessConfig.initialValues}
            validationSchema={enterGuessConfig.validationSchema}
            method={enterGuessConfig.onSubmit}
            btncolor={btncolor}
          >
            <FormikControl
              control="input"
              selectedWord={selectedWord}
              type="text"
              label="word"
              name="word"
              placeholder="Enter your word..."
              icon={false}
              bordercolors="secondary"
              getValue={getValue}
            />
          </FormikContainer>
        </SimpleForm>
      );

    case "settingForm":
      return (
        <CounterForm>
          <FormikContainer
            formInfo={settingConfig.formInfo}
            initialValues={initialValues}
            // validationSchema={settingConfig.validationSchema}
            method={method}
            btncolor={btncolor}
          >
            <FormikControl
              control="input"
              type="text"
              label="Room Name"
              name="settings.room_name"
              placeholder="Limited to 20 characters"
              icon={false}
              bordercolors="secondary"
            />

            <FormikControl
              control="select"
              type="text"
              label="Limit Time"
              name="settings.limit_time"
              bordercolors="secondary"
              options={options}
            />

            <FormikControl
              control="counter"
              type="number"
              label="Max Players"
              name="settings.max_players"
              maxPlayers={initialValues.settings.max_players}
            />
          </FormikContainer>
        </CounterForm>
      );

    case "gameStartForm":
      return (
        <CounterForm>
          <FormikContainer
            formInfo={gameStartConfig.formInfo}
            initialValues={initialValues}
            validationSchema={gameStartConfig.validationSchema}
            method={method}
            btncolor={btncolor}
          >
            <FormikControl
              control="input"
              type="text"
              label="Room Name"
              name="settings.room_name"
              placeholder="Limited to 20 characters"
              icon={false}
              bordercolors="secondary"
            />
            <FormikControl
              control="select"
              defaultValue="60s"
              type="text"
              label="Limit Time"
              name="settings.limit_time"
              bordercolors="secondary"
              options={options}
            />
            <FormikControl
              control="counter"
              type="number"
              label="Max Players"
              name="settings.max_players"
            />
          </FormikContainer>
        </CounterForm>
      );

    default:
      return null;
  }
};

ModuleForm.propTypes = {
  type: propTypes.string,
  options: propTypes.arrayOf(propTypes.object),
  initialValues: propTypes.objectOf(propTypes.string),
  btncolor: propTypes.string,
  selectedWord: propTypes.string,
  children: propTypes.node,
  method: propTypes.func,
  getValue: propTypes.func,
};

export default ModuleForm;
