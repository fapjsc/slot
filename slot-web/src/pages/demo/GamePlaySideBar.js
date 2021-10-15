// suit
import { Sidenav, Nav } from 'rsuite';

// Icon
import {
  RiChat1Line,
  RiLogoutBoxRLine,
  RiPaletteLine,
  RiUserStarLine,
  RiFileInfoLine,
} from 'react-icons/ri';

// Style
import classes from './GamePlaySideBar.module.scss';

// Components
import Arrow from '../../components/UI/animation/Arrow';

// Helper
import { _getLocalStorageItem } from '../../utils/helper';

const GamePlaySideBar = ({
  sideBarOpen,
  chatOpen,
  btnOpen,
  setSideBarOpen,
  setChatOpen,
  setBtnOpen,
  setCustomFeedBackOpen,
}) => {
  //==== Handler ====//
  // End Game
  const endGameHandler = () => {
    setCustomFeedBackOpen(true);
  };

  //
  const onSelectHandler = () => {
    setSideBarOpen(false);
  };

  //==== JSX ====//
  const arrowElement = (
    <div
      onClick={() => setSideBarOpen(!sideBarOpen)}
      className={
        sideBarOpen
          ? `${classes.arrowBox} ${classes.arrowBoxLeft}`
          : `${classes.arrowBox} ${classes.arrowBoxRight}`
      }
    >
      <Arrow />
    </div>
  );

  return (
    <div
      className={
        sideBarOpen
          ? `${classes['glass-panel']} ${classes[`glass-panel-open`]}`
          : `${classes['glass-panel']} ${classes[`glass-panel-close`]}`
      }
    >
      {/* Arrow */}
      {!chatOpen && !btnOpen && arrowElement}

      <div className={classes['glasses-toolbar']}>
        <Sidenav className={classes['side-nav']}>
          <Sidenav.Body>
            <Nav onSelect={onSelectHandler}>
              <Nav.Item className={classes.item} onClick={() => setBtnOpen(true)}>
                <RiPaletteLine className={classes.icon} />
                <span className={classes.text}>操作</span>
              </Nav.Item>

              <Nav.Item className={classes.item} onClick={() => setChatOpen(true)}>
                <RiChat1Line className={classes.icon} />
                <span className={classes.text}>聊天室</span>
              </Nav.Item>

              <Nav.Item className={classes.item}>
                <RiFileInfoLine className={classes.icon} />
                <span className={classes.text}>資訊</span>
              </Nav.Item>

              <Nav.Item className={classes.item}>
                <RiUserStarLine className={classes.icon} />
                <span className={classes.text}>主播</span>
              </Nav.Item>

              <Nav.Item className={classes.item} onClick={endGameHandler}>
                <RiLogoutBoxRLine className={classes.icon} />
                <span className={classes.text}>離開</span>
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    </div>
  );
};

export default GamePlaySideBar;
