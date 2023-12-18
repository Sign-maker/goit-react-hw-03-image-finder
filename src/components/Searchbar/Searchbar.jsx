import React from 'react';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header>
      <form onSubmit={onSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          type="text"
          autoComplete="off"
          name="name"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

/* <header class="searchbar">
  <form class="form">
    <button type="submit" class="button">
      <span class="button-label">Search</span>
    </button>

    <input
      class="input"
      type="text"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
    />
  </form>
</header>; */
