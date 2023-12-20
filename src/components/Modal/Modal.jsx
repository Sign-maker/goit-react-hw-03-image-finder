import React, { Component } from 'react';
import { Backdrop, Button, ModalContent } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }

  onEscClick = event => {
    if (event.code !== 'Escape') {
      return;
    }
    this.props.onModalClose();
  };

  onBackdropClick = event => {
    console.log(event.target);
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
          X
        </Button>
      </Backdrop>
    );
  }
}
