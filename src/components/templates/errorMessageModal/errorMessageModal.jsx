import React from "react";
import propTypes from "prop-types";
import Modal from "../../modules/modal/modal";
import { RowContainer } from "./errorMessageModal.style";
import Header from "../../atoms/header/header";
import Paragraph from "../../atoms/paragraph/paragraph";

const ErrorMessageModal = (props) => {
  const { handleCloseModal, errorMessage } = props;
  const defaultErrorMessage = {
    title: "This room is full 😱",
    paragraph: "Look for another room!",
  };

  return (
    <Modal
      width={28.5}
      height={20}
      hasXIcon
      handleCloseModal={handleCloseModal}
    >
      <RowContainer width={22}>
        <Header
          text="Error"
          variant="h3"
          color="navy"
          weight="exbold"
          marginBottom="sm"
        />
        <Paragraph
          text={errorMessage ? errorMessage.title : defaultErrorMessage.title}
          color="darkGrey"
        />
        <Paragraph
          text={
            errorMessage
              ? errorMessage.paragraph
              : defaultErrorMessage.paragraph
          }
          color="darkGrey"
        />
      </RowContainer>
    </Modal>
  );
};

ErrorMessageModal.propTypes = {
  handleCloseModal: propTypes.func,
  errorMessage: propTypes.string,
};
ErrorMessageModal.defaultProps = {};

export default ErrorMessageModal;
