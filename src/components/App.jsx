import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'servicesApi/servicesApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { BigImage } from './BigImage/BigImage';
import { AppContainer } from './App.styled';
import { Loader } from './Loader/Loader';
import { Informer } from './Informer/Informer';
import { STATUS, INIT_REQUEST_PARAMS, INFO_TYPES } from 'configs/constants';

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
    const { searchName, page } = this.state;
    if (prevState.page !== page || prevState.searchName !== searchName) {
      try {
        this.setState({ status: STATUS.pending });

        const { hits, totalHits } = await getImages(
          searchName,
          page,
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

  onSearchSubmit = searchName => {
    if (this.state.searchName === searchName) return;

    this.setState({
      searchName,
      images: [],
      page: 1,
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
  };

  onCardClick = id => {
    const selectedImage = this.state.images.find(image => image.id === id);
    this.setState({ selectedImage, showModal: true });
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
      <AppContainer>
        <Searchbar onSubmit={this.onSearchSubmit} />
        {showGallery && (
          <ImageGallery
            images={this.state.images}
            onCardClick={this.onCardClick}
          />
        )}
        {showNoImagesWarning && (
          <Informer infoType={INFO_TYPES.notification}>
            No images found! Try another request.
          </Informer>
        )}
        {showLoader && <Loader />}
        {showLoadMore && <Button onLoadMore={this.onLoadMore} />}
        {showError && (
          <Informer infoType={INFO_TYPES.error}>
            {`Oops, something went wrong! ${error.message}`}
          </Informer>
        )}
        {showModal && (
          <Modal onModalClose={this.onModalClose}>
            <BigImage imageData={this.state.selectedImage} />
          </Modal>
        )}
      </AppContainer>
    );
  }
}
