import React from 'react';

import styled from 'styled-components';

function Sort({ reviews, setReviews, relevantReviews }) {
  const sortByHelpfulness = () => {
    const sorted = [...reviews].sort((a, b) => b.helpfulness - a.helpfulness);
    setReviews(sorted);
  };

  const sortByNewest = () => {
    const sorted = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
    setReviews(sorted);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    if (selectedSort === 'helpfulness') {
      sortByHelpfulness();
    } else if (selectedSort === 'newest') {
      sortByNewest();
    } else if (selectedSort === 'relevance') {
      setReviews(relevantReviews);
    }
  };

  return (
    <label htmlFor="selectedSort">
      <b>
        {reviews.length}
        {' '}
        reviews, sorted by
        {' '}
        <SortSelector id="selectedSort" name="slectedSort" onChange={handleSortChange}>
          <option value="relevance">relevance</option>
          <option value="helpfulness">helpfulness</option>
          <option value="newest">newest</option>
        </SortSelector>
      </b>
    </label>
  );
}

const SortSelector = styled.select`
  border: none;
  background: none;
  outline: none;
  border-bottom: 1px solid black;
  padding: 1px;
  font-size: inherit;
  font-family: inherit;
  font-weight: bold;
`;

export default Sort;
