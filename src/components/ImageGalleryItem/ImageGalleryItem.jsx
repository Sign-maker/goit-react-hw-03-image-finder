import { Item, Image } from './ImageGalleryItem.styled';
import { Link } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, large, thumb, alt, onCardClick }) => {
  const handleClick = event => {
    event.preventDefault();
    onCardClick(id);
  };

  return (
    <Item>
      <Link href={large} onClick={handleClick}>
        <Image src={thumb} alt={alt} />
      </Link>
    </Item>
  );
};
