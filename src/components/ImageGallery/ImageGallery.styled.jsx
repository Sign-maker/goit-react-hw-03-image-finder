import styled from 'styled-components';

export const List = styled.ul`
  display: grid;
  max-width: calc(100vw - ${props => props.theme.spacing(12)});
  grid-template-columns: repeat(
    auto-fill,
    minmax(${props => props.theme.spacing(80)}, 1fr)
  );
  grid-gap: ${props => props.theme.spacing(4)};
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
