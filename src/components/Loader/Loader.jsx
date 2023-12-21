import { ThreeDots } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader = () => (
  <LoaderContainer>
    <ThreeDots
      visible={true}
      height="30"
      width="80"
      color="#3f51b5"
      radius="10"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </LoaderContainer>
);
