import React from "react";
import propTypes from "prop-types";
import Modal from "../../modules/modal/modal";
import ModuleForm from "../../modules/form/moduleForm";

import { RowContainer } from "./newGameModal.style";

const NewGameModal = (props) => {
  const { isNewGame, handleCloseModal, method, initialValues } = props;
  const options = [
    { key: "Select Time", value: 0 },
    { key: "20s", value: 20 },
    { key: "25s", value: 25 },
    { key: "30s", value: 30 },
  ];

  return (
    <Modal
      width={28.5}
      height={37.6}
      hasXIcon
      handleCloseModal={handleCloseModal}
    >
      <RowContainer>
        {isNewGame ? (
          <ModuleForm
            type="gameStartForm"
            options={options}
            initialValues={initialValues} // 얘는 roomanme "abc" abc, limtit "" maxplayer ""
            method={method}
          />
        ) : (
          <ModuleForm
            type="settingForm"
            options={options}
            initialValues={initialValues} // roomanem "최시영들어와" limit "30" max_player "6) "
            method={method}
          />
        )}
      </RowContainer>
    </Modal>
  );
};

NewGameModal.propTypes = {
  isNewGame: propTypes.bool,
  handleCloseModal: propTypes.func,
  method: propTypes.func,
  initialValues: propTypes.number,
};

export default NewGameModal;
