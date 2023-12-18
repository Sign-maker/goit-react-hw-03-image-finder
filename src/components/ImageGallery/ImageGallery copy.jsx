import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import { getImages } from 'servicesApi/servicesApi';
import { List } from './ImageGallery.styled';

const INIT_REQUEST_PARAMS = {
  perPage: 12,
};

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    isNextPage: false,
    status: STATUS.IDLE,
  };

  componentDidMount() {
    console.log('componentDidMount');
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    console.log(
      'Предыдущий запрос',
      prevProps.searchName,
      'Текущий запрос',
      this.props.searchName
    );

    //if swarchName Changed
    if (prevProps.searchName !== this.props.searchName) {
      try {
        this.setState({ status: STATUS.PENDING });
        const { hits, totalHits } = await getImages(
          this.props.searchName,
          1,
          INIT_REQUEST_PARAMS.perPage
        );

        this.setState({
          images: [...hits],
          page: 1,
          isNextPage: this.isNextPage(totalHits, 1),
          status: STATUS.RESOLVED,
        });
        console.log('Первая загрузка с новым запросом', totalHits, hits);
      } catch (error) {
        console.log(error);
        this.setState({ status: STATUS.REJECTED });
      }
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      try {
        this.setState({ status: STATUS.PENDING });
        const { hits, totalHits } = await getImages(
          this.props.searchName,
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
        this.setState({ status: STATUS.REJECTED });
      }
    }
  }

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
    const { images, isNextPage, status } = this.state;

    if (status === STATUS.IDLE) {
      return <p>Input search name</p>;
    }
    if (status === STATUS.PENDING) {
      return <p>Loading....</p>;
    }
    if (status === STATUS.RESOLVED) {
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
          {isNextPage && <Button onLoadMore={this.onLoadMore} />}
        </>
      );
    }
  }
}

{
  /* <ul class="gallery"></ul>; */
}

// return (
//   <>
//     {images.length > 0 && (
//       <List>
//         {images.map(({ id, webformatURL, largeImageURL, tag }, idx) => (
//           <ImageGalleryItem
//             key={idx}
//             //используем индекс, т.к с пиксабей приходят иногда одинаковые картинки при пагинации (пол дня промучался)
//             thumb={webformatURL}
//             bigPicture={largeImageURL}
//             alt={tag}
//           />
//         ))}
//       </List>
//     )}
//     {isNextPage && <Button onLoadMore={this.onLoadMore} />}
//   </>
// );
