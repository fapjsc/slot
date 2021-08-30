import React from 'react';

const CardContainer = ({ children }) => {
  return <div style={cardContainer}>{children}</div>;
};

const cardContainer = {
  maxWidth: '500px',
  margin: '0 auto',
  padding: '1rem',
  backgroundColor: 'rgba(#d9e1e6, .6) !important',
};
export default CardContainer;
