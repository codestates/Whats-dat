import React from "react";
import propTypes from "prop-types";
import Modal from "../../modules/modal/modal";
import { RowContainer } from "./logoutModal.style";
import Paragraph from "../../atoms/paragraph/paragraph";
import Button from "../../atoms/button/button";

const LogoutModal = (props) => {
  const { handleCloseModal, handleNoBtn, handleYesBtn } = props;

  return (
    <Modal
      width={28.5}
      height={20}
      hasXIcon
      handleCloseModal={handleCloseModal}
    >
      <RowContainer width={22}>
        <div className="row-container m-top">
          <Paragraph text="Would you like to logout?" color="darkGrey" />
        </div>
        <div className="row-container m-top fullWidth">
          <Button text="No" onClick={handleNoBtn} color="secondary" size="sm" />
          <Button text="Yes" onClick={handleYesBtn} color="danger" size="sm" />
        </div>
      </RowContainer>
    </Modal>
  );
};

LogoutModal.propTypes = {
  handleCloseModal: propTypes.func,
  handleNoBtn: propTypes.func,
  handleYesBtn: propTypes.func,
};

LogoutModal.defaultProps = {};

export default LogoutModal;
