import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'servicesApi/servicesApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { BigImage } from './BigImage/BigImage';

const INIT_REQUEST_PARAMS = {
  perPage: 12,
};

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export class App extends Component {
  state = {
    searchName: '',
    images: [],
    page: 1,
    isNextPage: false,
    status: STATUS.idle,
    error: null,
    showModal: false,
    selectedImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.page !== this.state.page && this.state.page !== 1) ||
      prevState.searchName !== this.state.searchName
    ) {
      if (prevState.searchName !== this.state.searchName) {
        this.setState({
          images: [],
          page: 1,
        });
      }

      try {
        this.setState({ status: STATUS.pending });

        const { hits, totalHits } = await getImages(
          this.state.searchName,
          this.state.page,
          INIT_REQUEST_PARAMS.perPage
        );

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...hits],
            isNextPage: this.isNextPage(totalHits, prevState.page),
            status: STATUS.resolved,
          };
        });
      } catch (error) {
        this.setState({ status: STATUS.rejected, error });
      }
    }
  }

  onSearchSubmit = event => {
    event.preventDefault();
    const searchName = event.currentTarget.elements.name.value.trim();
    this.setState(prevState => {
      if (prevState.searchName !== searchName) return { searchName };
    });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  isNextPage(totalImages, currentPage) {
    return currentPage < Math.ceil(totalImages / INIT_REQUEST_PARAMS.perPage);
  }

  onModalClose = () => {
    this.setState({ showModal: false });
    document.body.style.overflow = 'auto';
  };

  onCardClick = id => {
    const selectedImage = this.state.images.find(image => image.id === id);
    this.setState({ selectedImage, showModal: true });
    document.body.style.overflow = 'hidden';
  };

  render() {
    const { status, images, isNextPage, error, showModal } = this.state;

    const showGallery =
      (status === STATUS.resolved || isNextPage) && images.length > 0;
    const showNoImagesWarning = status === STATUS.resolved && !images.length;
    const showLoader = status === STATUS.pending;
    const showLoadMore = status === STATUS.resolved && isNextPage;
    const showError = status === STATUS.rejected;

    return (
      <>
        <Searchbar onSubmit={this.onSearchSubmit} />
        {showGallery && (
          <ImageGallery
            images={this.state.images}
            onCardClick={this.onCardClick}
          />
        )}
        {showNoImagesWarning && <p>No images found. Try another request</p>}
        {showLoader && <p> Loading....</p>}
        {showLoadMore && <Button onLoadMore={this.onLoadMore} />}
        {showError && <p>{`Something went wrong ${error.message}`}</p>}
        {showModal && (
          <Modal onModalClose={this.onModalClose}>
            <BigImage imageData={this.state.selectedImage} />
          </Modal>
        )}
      </>
    );
  }
}
