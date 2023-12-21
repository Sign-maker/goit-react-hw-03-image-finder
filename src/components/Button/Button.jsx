import React from 'react';
import { LoadMoreBtn } from './Button.styled';

export const Button = ({ onLoadMore }) => (
  <LoadMoreBtn type="button" onClick={onLoadMore}>
    Load more
  </LoadMoreBtn>
);
