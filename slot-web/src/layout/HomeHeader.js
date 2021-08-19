import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';

// Image
import logo from '../asset/tga-logo2.png';

// Context
import UserContext from '../context/User/UserContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 0,
    marginTop: 0,
    maxWidth: '678px',
    margin: '0 auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HomeHeader = props => {
  const { handleLogout, user, money } = props;
  const classes = useStyles();
  const [auth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // User Context
  const { machineDisplayHorizontal, setMachineDisplayHorizontal } = useContext(UserContext);

  //   const handleChange = event => {
  //     setAuth(event.target.checked);
  //   };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Toolbar>
          <div className={classes.title}>
            <img src={logo} alt="logo" style={{ width: '2.2rem', height: '2.2rem' }} />
          </div>
          {auth && (
            <>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={changeMachineDisplayMode}
                >
                  <Rotate90DegreesCcwIcon />
                </IconButton>
              </div>

              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MonetizationOnIcon />
                  <span style={{ fontSize: '14px', marginLeft: '5px' }}>{money}</span>
                </IconButton>
              </div>

              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                  <span style={{ fontSize: '14px', marginLeft: '5px' }}>{user}</span>
                </IconButton>
                <Menu
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
                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                  <MenuItem onClick={handleClose}>
                    <span onClick={handleLogout}>登出</span>
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HomeHeader;
