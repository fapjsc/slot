import styles from './BorderAnimation.module.scss';
const BorderAnimation = props => {
  return <div className={`${styles.glow} ${styles.block}`}>{props.children}</div>;
};

export default BorderAnimation;
