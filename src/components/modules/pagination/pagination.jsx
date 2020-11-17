import React from "react";
import propTypes from "prop-types";
import IconButton from "../../atoms/IconButton/iconButton";
import Icon from "../../atoms/icon/icon";
import PaginationBox from "./pagination.style";

const Pagination = ({
  onClickPrev,
  onClickNext,
  isFirstPage,
  isLastPage,
  className,
}) => {
  return (
    <PaginationBox className={className}>
      <IconButton size={3} onClick={onClickPrev} isNotVisible={isFirstPage}>
        <Icon variant="BUTTON_LEFT" color="darkGrey" />
      </IconButton>
      <IconButton size={3} onClick={onClickNext} isNotVisible={isLastPage}>
        <Icon variant="BUTTON_RIGHT" color="darkGrey" />
      </IconButton>
    </PaginationBox>
  );
};

Pagination.propTypes = {
  onClickPrev: propTypes.func,
  onClickNext: propTypes.func,
  isFirstPage: propTypes.bool,
  isLastPage: propTypes.bool,
  className: propTypes.string,
};

export default Pagination;
