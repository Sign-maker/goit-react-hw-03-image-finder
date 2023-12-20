import styled from 'styled-components';

export const Item = styled.li`
  flex-basis: calc(100%);
  height: 250px;
  @media screen and (min-width: 768px) {
    flex-basis: calc(100% / 2);
  }
  @media screen and (min-width: 1200px) {
    flex-basis: calc(100% / 4);
  }
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const Link = styled.a``;
