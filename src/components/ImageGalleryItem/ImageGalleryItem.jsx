import React, { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import { Link } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  onCardClick = event => {
    event.preventDefault();
    this.props.onCardClick(this.props.id);
  };

  render() {
    const { large, thumb, alt } = this.props;
    return (
      <Item>
        <Link href={large} onClick={this.onCardClick}>
          <Image src={thumb} alt={alt} />
        </Link>
      </Item>
    );
  }
}
