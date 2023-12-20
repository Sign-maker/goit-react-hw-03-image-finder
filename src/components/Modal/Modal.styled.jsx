import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalContent = styled.div`
  position: absolute;
  width: 70%;
  height: 90%;
  padding: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #e8e8e8;
`;

export const Button = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  width: 40px;
  height: 40px;
`;
