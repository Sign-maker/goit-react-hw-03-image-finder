import React from 'react';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, thumb, bigPicture, alt }) => {
  return (
    <Item>
      <Image src={thumb} alt={alt} />
    </Item>
  );
};

{
  /* <li class="gallery-item">
  <img src="" alt="" />
</li>; */
}
