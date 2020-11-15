import React from "react";
import Drawing from "./Drawing";
import fakeDB from "./fakeDB";

const index = () => {
  return (
    <>
      <Drawing {...fakeDB.DRAWING} />
    </>
  );
};

export default index;
