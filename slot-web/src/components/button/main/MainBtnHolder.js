// Components
import MainBtn from './MainBtn';

// Styles
import classes from './MainBtnHolder.module.scss';

const BtnHolder = ({ pressSlotHandler, mainBtnList }) => {
  const onClickHandler = btnNo => {
    pressSlotHandler(btnNo);
  };

  // Main Button
  const mainBtn =
    mainBtnList &&
    mainBtnList.map(btn => (
      <MainBtn
        key={btn.buttonNo}
        type={btn.buttonTxt}
        clickFn={() => onClickHandler(btn.buttonNo)}
      />
    ));

  return (
    <div className={classes.container}>
      <MainBtn type="AUTO" />
      {mainBtn}
    </div>
  );
};

export default BtnHolder;
