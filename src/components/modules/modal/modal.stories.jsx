import React from "react";
import Modal from "./modal";

const ModalStories = {
  title: "modules/Modal",
  component: Modal,
};

export const XIconModal = (args) => <Modal {...args} />;
XIconModal.args = {
  children: <h1> Hello world</h1>,
  width: 28.5,
  height: 37.6,
  hasXIcon: true,
  handleCloseModal: () => {
    console.log("closed!");
  },
};

export const noXIconModal = (args) => <Modal {...args} />;
noXIconModal.args = {
  children: <h1> Hello world</h1>,
  width: 28.5,
  height: 37.6,
  hasXIcon: false,
};

export default ModalStories;
