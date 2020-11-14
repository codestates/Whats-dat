import React from "react";
import SelectWord from "./SelectWord";

const SelectWordStories = {
  title: "templates/SelectWord",
  component: SelectWord,
};

export const SelectWordTemplate = (args) => <SelectWord {...args} />;
SelectWordTemplate.args = {
  /* eslint-disable no-alert, no-console */
  handleTimeOut: () => console.log("timeout"),
  wordList: ["키위새", "아이스 아메리카노", "셰익스피어"],
};

export default SelectWordStories;
