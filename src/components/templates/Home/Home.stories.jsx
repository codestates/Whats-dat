import React from "react";
import Home from "./Home";

export const home = (args) => <Home {...args} />;

const config = {
  title: "templates/Home",
  components: Home,
};

export default config;
