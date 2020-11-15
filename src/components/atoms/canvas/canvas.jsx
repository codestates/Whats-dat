import React, { useRef, useEffect, useState } from "react";
import propTypes from "prop-types";
import { DefaultCanvas } from "./canvas.style";
import theme from "../../../styles/Theme";

const Canvas = ({ strokeColor, lineWidth, width, height, className }) => {
  const canvasRef = useRef(null);
  const [offsetCoord, setOffsetCoord] = useState({ x: null, y: null });
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const isWindowClient = typeof window === "object";
    const getCord = () => {
      const cord = canvasRef.current.getBoundingClientRect();
      setOffsetCoord({ x: cord.x, y: cord.y });
    };
    if (isWindowClient) {
      window.addEventListener("resize", getCord);
    }
    getCord();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width * 10;
    canvas.height = height * 10;
    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = theme.colors[strokeColor] || "black";
    context.lineWidth = lineWidth * 2.2;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = lineWidth * 2;
  }, [lineWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = theme.colors[strokeColor];
  }, [strokeColor]);

  const fillWhite = () => {
    contextRef.current.clearRect(0, 0, width * 10, height * 10);
  };

  const getMosuePositionOnCanvas = (event) => {
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    const canvasX = clientX - offsetCoord.x;
    const canvasY = clientY - offsetCoord.y;
    return {
      x: canvasX,
      y: canvasY,
    };
  };

  const startDrawing = (event) => {
    const mousePos = getMosuePositionOnCanvas(event);
    // const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(mousePos.x, mousePos.y);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const mousePos = getMosuePositionOnCanvas(event);
    // const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(mousePos.x, mousePos.y);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <>
      <DefaultCanvas
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        onMouseOut={finishDrawing}
        ref={canvasRef}
        width={width}
        height={height}
        className={className}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
      />
      <button type="submit" onClick={fillWhite}>
        Clean Canvas
      </button>
    </>
  );
};

Canvas.propTypes = {
  width: propTypes.number,
  height: propTypes.number,
  strokeColor: propTypes.oneOf(Object.keys(theme.colors)),
  lineWidth: propTypes.number,
  className: propTypes.string,
};

export default Canvas;
