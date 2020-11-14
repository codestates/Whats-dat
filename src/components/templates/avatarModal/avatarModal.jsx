import React from "react";
import propTypes from "prop-types";
import Modal from "../../modules/modal/modal";
import { AvatarWrapper } from "./avatarModal.style";
import ModuleForm from "../../modules/form/moduleForm";

const AvatarModal = (props) => {
  const { handleCloseModal, options } = props;

  return (
    <Modal
      width={28.5}
      height={20}
      hasXIcon
      handleCloseModal={handleCloseModal}
    >
      <AvatarWrapper width={22}>
        <ModuleForm type="detailInfo" options={options} />
      </AvatarWrapper>
    </Modal>
  );
};

AvatarModal.propTypes = {
  handleCloseModal: propTypes.func,
  options: propTypes.objectOf,
};

export default AvatarModal;
