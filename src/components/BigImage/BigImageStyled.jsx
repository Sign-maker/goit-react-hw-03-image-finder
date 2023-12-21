import styled from 'styled-components';

export const Image = styled.img`
  object-fit: contain;
  max-width: calc(100vw - ${props => props.theme.spacing(12)});
  max-height: calc(100vh - ${props => props.theme.spacing(6)});
`;
