import React from 'react';
import styles from './test.module.scss';

const test = props => {
  return <div className={`${styles.glow} ${styles.block}`}>{props.children}</div>;
};

export default test;
