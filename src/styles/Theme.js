const margins = {
  xxsm: ".5rem",
  xsm: ".7rem",
  sm: "1rem",
  baseSm: "1.25rem",
  base: "1.5rem",
  baseLg: "1.75rem",
  lg: "2rem",
  xl: "3rem",
  xxl: "3.5rem",
  xxxl: "4rem",
};

const paddings = {
  xxsm: ".5rem",
  xsm: ".7rem",
  sm: "1rem",
  baseSm: "1.25rem",
  base: "1.5rem",
  baseLg: "1.75rem",
  lg: "2rem",
  xl: "3rem",
  xxl: "3.5rem",
  xxxl: "4rem",
};

const fonts = {
  family: {
    base: `'Noto Sans KR', sans-serif`,
    title: `'Oleo Script', cursive`,
  },
  size: {
    xSm: "1rem",
    sm: "1.3rem",
    base: "1.6rem",
    lg: "2rem",
    xl: "2.5rem",
    title: "6rem",
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 500,
    exbold: 900,
  },
};

const textShadow = {
  none: "",
  sm: "1px 1px 3px rgb(36 37 47 / 25%)",
  md: "0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)",
  lg: "3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)",
  xl: "1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)",
};

const colors = {
  backgroundGradient:
    "linear-gradient(348.55deg, #FFC6C6 2.05%, #F1C9CF 23.13%, #A9DBFF 103.23%), #626CA1;",
  primary: "#626CA2",
  secondary: "#94A0E0",
  tertiary: "#B7C2FF",
  quaternary: "#B9D7F5",
  navy: "#474F72",
  danger: "#FFAEAE",
  white: "#fff",
  black: "#333",
  darkGrey: "#878C9F",
  grey: "#AEA8B2",
  lightGrey: "#F1EBF5",
  lightBg: "#FBFBFB",
  red: "#F55827",
  yellow: "#FAF74F",
  green: "#91D454",
  blue: "#4797EE",
};

const boxShadow = {
  shadowXs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  shadowSm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  shadowMd:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  shadowLg:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  shadowXl:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  shadow2Xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  shadowInner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  shadowOutline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
};

const borderRadius = {
  roundedNone: "0",
  roundedSm: "0.125rem",
  rounded: "0.25rem",
  roundedMd: "0.375rem",
  roundedLg: "0.5rem",
  roundedXl: "0.75rem",
  rounded2Xl: "1rem",
  rounded3Xl: "1.5rem",
  roundedFull: "9999px",
  roundedTNone: "border-top-left-radius: 0, border-top-right-radius: 0",
};

const size = {
  mobile: "425px",
  tablet: "768px",
  desktop: "1440px",
  containerMaxWidth: "60",
};

const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktopL: `@media only screen and (max-width: ${size.desktop})`,
};

const theme = {
  margins,
  paddings,
  fonts,
  borderRadius,
  colors,
  boxShadow,
  device,
  textShadow,
  size,
};

export default theme;
