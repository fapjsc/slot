import React from 'react';
import classes from './TheButton.module.scss';

const TheButton = ({ text }) => {
  return (
    <div className={`${classes.button}`}>
      <div className={classes.outer}>
        <div className={classes.height}>
          <div className={classes.inner}>{text}</div>
        </div>
      </div>
    </div>
  );
};

export default TheButton;