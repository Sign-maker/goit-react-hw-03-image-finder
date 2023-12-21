import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalContent = styled.div`
  /* max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px); */
`;

export const Button = styled.button`
  position: absolute;
  right: ${props => props.theme.spacing(6)};
  top: ${props => props.theme.spacing(6)};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.theme.spacing(10)};
  height: ${props => props.theme.spacing(10)};
  border: 0;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  z-index: 1201;

  &:hover {
    opacity: 1;
  }
`;
