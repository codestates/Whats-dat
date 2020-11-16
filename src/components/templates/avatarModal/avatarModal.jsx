import React from "react";
import propTypes from "prop-types";
import Modal from "../../modules/modal/modal";
import { AvatarWrapper } from "./avatarModal.style";
import ModuleForm from "../../modules/form/moduleForm";

const AvatarModal = (props) => {
  const { options, method, initialValues, handleCloseModal } = props;
  return (
    <Modal
      width={28.5}
      height={20}
      hasXIcon
      handleCloseModal={handleCloseModal}
    >
      <AvatarWrapper width={22}>
        <ModuleForm
          type="detailInfo"
          options={options}
          method={method}
          initialValues={initialValues}
        />
      </AvatarWrapper>
    </Modal>
  );
};

AvatarModal.propTypes = {
  method: propTypes.func,
  options: propTypes.arrayOf(propTypes.object),
  initialValues: propTypes.shape({
    nickname: propTypes.string,
    avatar: propTypes.string,
    avatarColor: propTypes.string,
  }),
  handleCloseModal: propTypes.func,
};

export default AvatarModal;
