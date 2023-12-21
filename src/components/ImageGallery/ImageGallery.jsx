import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images, onCardClick }) => (
  <List>
    {images.map(({ id, webformatURL, tag, largeImageURL }, idx) => (
      <ImageGalleryItem
        key={idx}
        //используем индекс, т.к с пиксабей приходят иногда одинаковые картинки при пагинации (пол дня промучался)
        id={id}
        thumb={webformatURL}
        large={largeImageURL}
        alt={tag}
        onCardClick={onCardClick}
      />
    ))}
  </List>
);
