import React from "react";
import propTypes from "prop-types";
import RoundButton from "../../atoms/roundButton/roundButton";
import Icon from "../../atoms/icon/icon";
import LineWidth from "../../atoms/linewidth/linewidth";
import LineWidthControllerBox from "./lineWidthController.style";
import theme from "../../../styles/Theme";

const LineWidthController = ({
  onClickMinus,
  onClickPlus,
  lineWidth,
  lineColor,
}) => {
  return (
    <LineWidthControllerBox>
      <div className="section">
        <RoundButton onClick={onClickMinus} size="xsm" color="lightGrey" shadow>
          <Icon variant="BUTTON_MINUS" color="navy" />
        </RoundButton>
      </div>
      <div className="section">
        <LineWidth size={lineWidth} color={lineColor} />
      </div>
      <div className="section">
        <RoundButton onClick={onClickPlus} size="xsm" color="primary" shadow>
          <Icon variant="BUTTON_PLUS" color="white" />
        </RoundButton>
      </div>
    </LineWidthControllerBox>
  );
};

LineWidthController.propTypes = {
  onClickMinus: propTypes.func,
  onClickPlus: propTypes.func,
  lineWidth: propTypes.number,
  lineColor: propTypes.oneOf(Object.keys(theme.colors)),
};

LineWidthController.defaultProps = {
  lineColor: "black",
};

export default LineWidthController;
