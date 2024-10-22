import { useState, useEffect } from "react";

const useWindowSize = () => {
  const isWindowClient = typeof window === "object";

  const [windowSize, setWindowSize] = useState(
    isWindowClient ? window.innerWidth : undefined
  );

  useEffect(() => {
    const setSize = () => {
      setWindowSize(window.innerWidth);
    };

    if (isWindowClient) {
      window.addEventListener("resize", setSize);
      return () => window.removeEventListener("resize", setSize);
    }
    return null;
  }, [isWindowClient, setWindowSize]);

  return windowSize;
};

export default useWindowSize;
