import React, { useEffect } from "react";
import HomeTemplate from "../components/templates/Home/Home";

const Home = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <HomeTemplate />
    </>
  );
};

export default Home;
