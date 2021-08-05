import classes from './SquareButton.module.scss';
const SquareButton = ({ autoGame, text }) => {
  return <button className={autoGame ? `${classes['game-button']} ${classes.flashText}` : classes['game-button']}>{text}</button>;
};

export default SquareButton;
