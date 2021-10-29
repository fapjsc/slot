import { useState } from 'react';
// import styles from './SpinBtn.modules.scss';
import styles from './MainBtn.module.scss';

const MainBtn = ({ type, clickFn }) => {
  const [wobble, setWobble] = useState('');

  const handleClick = () => {
    if (clickFn) clickFn();
    setWobble(type);
  };

  return (
    <div
      className={styles.image}
      onClick={handleClick}
      onAnimationEnd={() => setWobble('')}
      wobble={wobble}
      type={type}
    />
  );
};

export default MainBtn;
