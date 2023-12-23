import React, { Component } from 'react';
import { Backdrop, Button, ModalContent } from './Modal.styled';
import { IoMdCloseCircleOutline } from 'react-icons/io';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
    document.body.style.overflow = 'auto';
  }

  onEscClick = event => {
    if (event.code !== 'Escape') {
      return;
    }
    this.props.onModalClose();
  };

  onBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }
    this.props.onModalClose();
  };

  render() {
    const { children, onModalClose } = this.props;

    return (
      <Backdrop onClick={this.onBackdropClick}>
        <ModalContent>{children}</ModalContent>
        <Button type="button" onClick={onModalClose}>
          <IoMdCloseCircleOutline size={30} />
        </Button>
      </Backdrop>
    );
  }
}
