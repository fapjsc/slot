import classes from './TheButton.module.scss';
const TheButton = props => {
  return <button className={classes.button}>{props.children ? props.children : 'Button'}</button>;
};

export default TheButton;
