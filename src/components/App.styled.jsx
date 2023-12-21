import styled from 'styled-components';

export const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${props => props.theme.spacing(4)};
  padding-bottom: ${props => props.theme.spacing(6)};
`;
