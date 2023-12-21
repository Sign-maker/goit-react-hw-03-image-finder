import { InformerContainer } from './Informer.styled';

export const Informer = ({ infoType, children }) => (
  <InformerContainer $infotype={infoType}>{children}</InformerContainer>
);
