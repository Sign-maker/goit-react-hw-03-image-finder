import styled from 'styled-components';
import { INFO_TYPES } from 'configs/constants';

export const InformerContainer = styled.p`
  text-align: center;
  color: ${props => {
    let color = '';

    switch (props.$infotype) {
      case INFO_TYPES.error:
        color = 'red';
        break;
      case INFO_TYPES.notification:
        color = '#3f51b5';
        break;
      default:
        color = 'black';
    }
    return color;
  }};
`;
