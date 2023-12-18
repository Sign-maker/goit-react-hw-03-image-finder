import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import { List } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  render() {
    const { images } = this.props;

    return (
      <>
        <List>
          {images.map(({ id, webformatURL, largeImageURL, tag }, idx) => (
            <ImageGalleryItem
              key={idx}
              //используем индекс, т.к с пиксабей приходят иногда одинаковые картинки при пагинации (пол дня промучался)
              thumb={webformatURL}
              bigPicture={largeImageURL}
              alt={tag}
            />
          ))}
        </List>
      </>
    );
  }
}
