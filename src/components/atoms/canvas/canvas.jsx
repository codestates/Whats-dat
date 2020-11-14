import React, { useRef, useEffect, useState } from "react";
import propTypes from "prop-types";
import { DefaultCanvas } from "./canvas.style";
import theme from "../../../styles/Theme";

const Canvas = ({ strokeColor, lineWidth, width, className }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = strokeColor || "black";
    context.lineWidth = lineWidth || 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <DefaultCanvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      width={width}
      className={className}
    />
  );
};

Canvas.propTypes = {
  width: propTypes.number,
  strokeColor: propTypes.oneOf(Object.keys(theme.colors)),
  lineWidth: propTypes.number,
  className: propTypes.string,
};

export default Canvas;
