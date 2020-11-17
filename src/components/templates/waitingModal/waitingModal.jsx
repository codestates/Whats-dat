import React from "react";
import propTypes from "prop-types";
import Modal from "../../modules/modal/modal";
import { RowContainer } from "./waitingModal.style";
import Header from "../../atoms/header/header";
import List from "../../modules/list/list";

const WaitingModal = ({ waitingItems }) => {
  return (
    <Modal width={28.5} height={37.6} hasXIcon={false}>
      <RowContainer width={22}>
        <Header
          text="Waiting for other players..."
          variant="h4"
          color="navy"
          weight="normal"
          marginBottom="sm"
        />
        <List listItemName="WaitingItem" listItemData={waitingItems} />
      </RowContainer>
    </Modal>
  );
};

WaitingModal.propTypes = {
  waitingItems: propTypes.arrayOf(propTypes.any),
};

export default WaitingModal;
