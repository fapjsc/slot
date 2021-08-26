import { useState, useContext } from 'react';

// Style
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
// import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Image
// import logo from '../asset/tga-logo2.png';

// Context
import UserContext from '../context/User/UserContext';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    // padding: 0,
    // marginTop: 0,
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
  const { handleLogout, user, money } = props;
  const classes = useStyles();
  const [auth] = useState(true);

  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  // User Context
  const { machineDisplayHorizontal, setMachineDisplayHorizontal } = useContext(UserContext);

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        {/* Toolbar style 在 App.scss */}
        <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* <div className={classes.title}>
            <img src={logo} alt="logo" style={{ width: '1.8rem', height: '1.8rem' }} />
          </div> */}

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
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  style={buttonStyle}
                >
                  <MonetizationOnIcon />
                  <span style={spanText}>{money}</span>
                </IconButton>
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
                  <span style={spanText}>{user}</span>
                </IconButton>
                {/* <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <span onClick={handleLogout}>登出</span>
                  </MenuItem>
                </Menu> */}
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

const buttonStyle = {
  padding: '8px',
};

export default HomeHeader;
