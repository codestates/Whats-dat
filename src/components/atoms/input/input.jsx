import React from "react";
import propTypes from "prop-types";
import { DefaultInput, SelectInput } from "./input.style";
import theme from "../../../styles/Theme";

const Input = ({
  field,
  variant = "regular",
  icon = false,
  name,
  id,
  type,
  defaultValue,
  placeholder,
  colors,
  bgcolors,
  fullWidth = true,
  disabled,
  children,
  bordercolors,
  className,
}) => {
  switch (variant) {
    case "regular":
      return icon === true ? (
        <DefaultInput
          fullWidth={fullWidth}
          colors={colors}
          bgcolors={bgcolors}
          bordercolors={bordercolors}
          className={className}
          padLeft="5rem"
        >
          <div className="icon__">{children}</div>
          <input
            {...field}
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
          />
        </DefaultInput>
      ) : (
        <DefaultInput
          fullWidth={fullWidth}
          colors={colors}
          bgcolors={bgcolors}
          bordercolors={bordercolors}
          className={className}
          padLeft="2rem"
        >
          {children}
          <input
            {...field}
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
          />
        </DefaultInput>
      );

    case "select":
      return (
        <SelectInput
          {...field}
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          colors={colors}
          bgcolors={bgcolors}
          bordercolors={bordercolors}
          fullWidth={fullWidth}
          disabled={disabled}
          className={className}
        >
          {children}
        </SelectInput>
      );

    default:
      return null;
  }
};

Input.propTypes = {
  variant: propTypes.string,
  id: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  defaultValue: propTypes.string,
  colors: propTypes.string,
  bgColors: propTypes.string,
  borderColors: propTypes.string,
  fullWidth: propTypes.bool,
  disabled: propTypes.string,
  children: propTypes.node,
  field: propTypes.string,
  icon: propTypes.bool,
  name: propTypes.string,
  bordercolors: propTypes.oneOf(Object.keys(theme.colors)),
  className: propTypes.string,
  selectedWord: propTypes.string,
  bgcolors: propTypes.oneOf(Object.keys(theme.colors)),
};

export default Input;
