import React from "react";
import propTypes from "prop-types";
import Modal from "../../modules/modal/modal";
import { RowContainer } from "./disconnectMessageModal.style";
import Paragraph from "../../atoms/paragraph/paragraph";
import Span from "../../atoms/span/span";
import Button from "../../atoms/button/button";

const DisconnectMessageModal = (props) => {
  const { handleCloseModal, handleGoLobbyBtn, leftNickname } = props;
  return (
    <Modal
      width={28.5}
      height={20}
      hasXIcon
      handleCloseModal={handleCloseModal}
    >
      <RowContainer width={22}>
        <div className="row-container m-top">
          <Span text={`${leftNickname}`} color="darkGrey" weight="exbold" />
          <div>&nbsp;</div>
          <Paragraph text={` left the game 😱`} color="darkGrey" />
        </div>
        <Paragraph text="The game will now discontinue." color="darkGrey" />
        <div className="m-top">
          <Button
            text="Go to lobby"
            onClick={handleGoLobbyBtn}
            color="danger"
            size="sm"
          />
        </div>
      </RowContainer>
    </Modal>
  );
};

DisconnectMessageModal.propTypes = {
  handleCloseModal: propTypes.func,
  leftNickname: propTypes.string,
  handleGoLobbyBtn: propTypes.func,
};

DisconnectMessageModal.defaultProps = {};

export default DisconnectMessageModal;
