import { useState } from 'react';

// Rsuite
// import { Tooltip, Whisper, Button } from 'rsuite';

// Components
import SubBtn from './SubBtn';

// Styles
import classes from './SubBtnHolder.module.scss';

// const CustomComponent = ({ placement, setOpen }) => (
//   <Whisper
//     trigger="none"
//     placement={placement}
//     controlId={`control-id-${placement}`}
//     speaker={
//       <Tooltip>This is a ToolTip for simple text hints. It can replace the title property</Tooltip>
//     }
//   >
//     <div className={classes.header} onClick={() => setOpen(preValue => !preValue)} />
//   </Whisper>
// );

const SubBtnHolder = ({ pressSlotHandler, btnStyle, subBtnList }) => {
  const [open, setOpen] = useState(false);

  const handleHeaderClick = () => {
    setOpen(preValue => !preValue);
  };

  return (
    <div
      className={`${classes.container} ${
        open && subBtnList.length === 5
          ? classes['open-5']
          : open && subBtnList.length === 10
          ? classes['open-10']
          : null
      }`}
    >
      <div
        className={classes.header}
        onClick={handleHeaderClick}
        status={open ? 'true' : 'false'}
        id="subBtnHolderHeader"
      />
      <SubBtn
        pressSlotHandler={pressSlotHandler}
        btnList={subBtnList && subBtnList}
        btnStyle={btnStyle && btnStyle}
      />
    </div>
  );
};

export default SubBtnHolder;
