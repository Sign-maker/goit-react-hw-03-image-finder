import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'servicesApi/servicesApi';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

const INIT_REQUEST_PARAMS = {
  perPage: 12,
};

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  PAGINATION_PENDIND: 'paginationPendind',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    searchName: '',
    images: [],
    page: 1,
    isNextPage: false,
    status: STATUS.IDLE,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      this.setState({ status: STATUS.PENDING });
      setTimeout(async () => {
        try {
          const { hits, totalHits } = await getImages(
            this.state.searchName,
            1,
            INIT_REQUEST_PARAMS.perPage
          );
          this.setState({
            images: [...hits],
            page: 1,
            isNextPage: this.isNextPage(totalHits, 1),
            status: STATUS.RESOLVED,
          });
          console.log(
            'Первая загрузка с новым запросом, всего изображений',
            totalHits,
            hits
          );
        } catch (error) {
          console.log(error);
          this.setState({ status: STATUS.REJECTED, error });
        }
      }, 500);
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ status: STATUS.PAGINATION_PENDIND });
      setTimeout(async () => {
        try {
          const { hits, totalHits } = await getImages(
            this.state.searchName,
            this.state.page,
            INIT_REQUEST_PARAMS.perPage
          );

          this.setState(prevState => {
            return {
              images: [...prevState.images, ...hits],
              isNextPage: this.isNextPage(totalHits, this.state.page),
              status: STATUS.RESOLVED,
            };
          });
          console.log('Загрузка при смене номера страницы', totalHits, hits);
        } catch (error) {
          console.log(error);
          this.setState({ status: STATUS.REJECTED, error });
        }
      }, 500);
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
    console.log('loadMorePressed');
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  isNextPage = (totalImages, currentPage) => {
    const totalPages = Math.ceil(totalImages / INIT_REQUEST_PARAMS.perPage);
    console.log('всего страниц', totalPages);
    return totalPages > currentPage ? true : false;
  };

  render() {
    const { status, images, isNextPage, error } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSearchSubmit} />
        {(status === STATUS.RESOLVED || status === STATUS.PAGINATION_PENDIND) &&
          images.length > 0 && <ImageGallery images={this.state.images} />}
        {status === STATUS.RESOLVED && !images.length && (
          <p>No images found. Try another request</p>
        )}
        {(status === STATUS.PENDING ||
          status === STATUS.PAGINATION_PENDIND) && <p> Loading....</p>}
        {status === STATUS.RESOLVED && isNextPage && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {status === STATUS.REJECTED && <p>{error.message}</p>}
      </>
    );
  }
}
