import { useState, useContext, useEffect, useCallback } from 'react';

// Style
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SyncIcon from '@material-ui/icons/Sync';
import CircularProgress from '@material-ui/core/CircularProgress';

// Context
import UserContext from '../context/User/UserContext';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
  },
}));

const HomeHeader = props => {
  const { handleLogout, getPlayerInfoHandler, playerInfo, getPlayerInfoStatus } = props;
  const classes = useStyles();
  const [auth] = useState(true);

  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  // User Context
  const {
    machineDisplayHorizontal,
    setMachineDisplayHorizontal,
    // getUserInfo,
    // getUserInfoLoading,
    // userInfo,
  } = useContext(UserContext);

  //   const handleChange = event => {
  //     setAuth(event.target.checked);
  //   };

  // const handleMenu = event => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const changeMachineDisplayMode = () => {
    if (machineDisplayHorizontal) {
      setMachineDisplayHorizontal(false);
    } else {
      setMachineDisplayHorizontal(true);
    }
  };

  // const getUserInfoHandler = useCallback(() => {
  //   const token = localStorage.getItem('token');
  //   const data = {
  //     casino: localStorage.getItem('casino'),
  //     pc: localStorage.getItem('player'),
  //   };

  //   getUserInfo(token, data);
  // }, [getUserInfo]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        {/* Toolbar style 在 App.scss */}
        <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
          {auth && (
            <>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={changeMachineDisplayMode}
                  style={buttonStyle}
                >
                  {machineDisplayHorizontal ? (
                    <>
                      <SwapVerticalCircleIcon />
                      <span style={spanText}>直向</span>
                    </>
                  ) : (
                    <>
                      <SwapHorizontalCircleIcon />
                      <span style={spanText}>橫向</span>
                    </>
                  )}
                </IconButton>
              </div>

              <div>
                {getPlayerInfoStatus === 'pending' ? (
                  <CircularProgress size={23} color="secondary" />
                ) : (
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    style={buttonStyle}
                    onClick={getPlayerInfoHandler}
                  >
                    <SyncIcon />

                    <span style={playerInfo && playerInfo.walletState === 1 ? redText : spanText}>
                      {playerInfo && playerInfo.walletState === 1
                        ? '結算中..'
                        : `$${playerInfo && playerInfo.walletMoney}`}
                    </span>
                  </IconButton>
                )}
              </div>

              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  // onClick={handleMenu}
                  color="inherit"
                  style={buttonStyle}
                >
                  <AccountCircle />
                  <span style={spanText}>{playerInfo && playerInfo.playerCode}</span>
                </IconButton>
              </div>

              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleLogout}
                  style={buttonStyle}
                >
                  <ExitToAppIcon />
                  <span style={spanText}>登出</span>
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const spanText = {
  fontSize: '10px',
  marginLeft: '4px',
};

const redText = {
  color: 'red',
  fontSize: '10px',
  marginLeft: '4px',
};

const buttonStyle = {
  padding: '8px',
};

export default HomeHeader;
