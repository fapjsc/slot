import React from 'react';

import classes from './MoneyCounter.module.scss';

const MoneyCounter = () => {
  return (
    <div
      className={classes.img}
      style={{
        position: 'absolute',
        top: '-50%',
        right: '3%',
      }}
    />
  );
};

export default MoneyCounter;
