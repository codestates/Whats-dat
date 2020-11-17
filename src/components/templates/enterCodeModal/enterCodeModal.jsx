import React from "react";
import propTypes from "prop-types";
import Modal from "../../modules/modal/modal";
import { RowContainer } from "./enterCodeModal.style";
import ModuleForm from "../../modules/form/moduleForm";

const EnterCodeModal = (props) => {
  const { handleCloseModal, method } = props;
  return (
    <Modal
      width={28.5}
      height={20}
      hasXIcon
      handleCloseModal={handleCloseModal}
    >
      <RowContainer width={22}>
        <ModuleForm type="enterCode" method={method} />
      </RowContainer>
    </Modal>
  );
};

EnterCodeModal.propTypes = {
  handleCloseModal: propTypes.func,
  method: propTypes.func,
};
EnterCodeModal.defaultProps = {};

export default EnterCodeModal;
