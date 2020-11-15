import React from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import { ModalBgContainer, ModalBox } from "./modal.style";

import Container from "../../atoms/container/container";
import Icon from "../../atoms/icon/icon";

const Modal = ({ hasXIcon, handleCloseModal, width, height, children }) => {
  return ReactDOM.createPortal(
    <div onClick={handleCloseModal}>
      <ModalBgContainer>
        <div onClick={(e) => e.stopPropagation()}>
          <Container width={width} height={height}>
            <ModalBox
              padding="base"
              bgColor="lightBg"
              radius="rounded3Xl"
              boxShadow="shadowXl"
            >
              {hasXIcon ? (
                <div onClick={handleCloseModal} className="btn-position cursor">
                  <Icon color="navy" variant="BUTTON_X" />
                </div>
              ) : null}
              {children}
            </ModalBox>
          </Container>
        </div>
      </ModalBgContainer>
    </div>,
    document.querySelector("#modal")
  );
};

Modal.propTypes = {
  hasXIcon: propTypes.bool,
  handleCloseModal: propTypes.func,
  width: propTypes.number,
  height: propTypes.number,
  children: propTypes.node.isRequired,
};

Modal.defaultProps = {
  hasXIcon: true,
};

export default Modal;
