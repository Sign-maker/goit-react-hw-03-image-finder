import { Image } from './BigImageStyled';

export const BigImage = ({ imageData: { largeImageURL, tags } }) => (
  <Image src={largeImageURL} alt={tags} />
);
