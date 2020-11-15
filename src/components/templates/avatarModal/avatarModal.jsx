import React from "react";
import propTypes from "prop-types";
import Modal from "../../modules/modal/modal";
import { AvatarWrapper } from "./avatarModal.style";
import ModuleForm from "../../modules/form/moduleForm";

const AvatarModal = (props) => {
  const { options, method, currentUser } = props;

  // FIXME
  // const avatar = JSON.parse(currentUser.photoURL)
  //   ? `option${options.indexOf(JSON.parse(currentUser.photoURL)) + 1}`
  //   : "option1";
  // const avatarColor = JSON.parse(currentUser.photoURL)
  //   ? JSON.parse(currentUser.photoURL).avatarColor
  //   : "";
  const initialValues = {
    radioOption: "option1",
    nickname: currentUser.displayName || "",
    color: "",
  };

  return (
    <Modal width={28.5} height={20} hasXIcon={false}>
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
  options: propTypes.arrayOf,
  currentUser: propTypes.objectOf,
};

export default AvatarModal;
