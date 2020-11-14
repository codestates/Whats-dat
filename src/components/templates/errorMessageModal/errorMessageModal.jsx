import React from "react";
import propTypes from "prop-types";
import Modal from "../../modules/modal/modal";
import { RowContainer } from "./errorMessageModal.style";
import Header from "../../atoms/header/header";
import Paragraph from "../../atoms/paragraph/paragraph";

const ErrorMessageModal = (props) => {
  const { handleCloseModal, errorMessage } = props;
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
        <Paragraph text="This room is full 😱" color="darkGrey" />
        <Paragraph text="Look for another room!" color="darkGrey" />
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
