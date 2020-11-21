import React from "react";
import propTypes from "prop-types";
import Icon from "../../atoms/icon/icon";
import PaginationBox, { PaginationButton } from "./pagination.style";

const Pagination = ({
  onClickPrev,
  onClickNext,
  isFirstPage,
  isLastPage,
  className,
}) => {
  return (
    <PaginationBox className={className}>
      <PaginationButton
        size={3}
        onClick={onClickPrev}
        isNotVisible={isFirstPage}
      >
        <Icon variant="BUTTON_LEFT" color="darkGrey" />
      </PaginationButton>
      <PaginationButton
        size={3}
        onClick={onClickNext}
        isNotVisible={isLastPage}
      >
        <Icon variant="BUTTON_RIGHT" color="darkGrey" />
      </PaginationButton>
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
