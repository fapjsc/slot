import React from 'react';
import styles from './Image.module.scss';

const Image = () => {
  const [wobble, setWobble] = React.useState(0);
  return (
    <div
      className={styles.image}
      onClick={() => setWobble(1)}
      onAnimationEnd={() => setWobble(0)}
      wobble={wobble}
    />
  );
};
export default Image;
