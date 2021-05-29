import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
    backgroundColor: '#F6C844',
  },
  navBox: {
    display: 'flex',
    backgroundColor: '#F6C844',
    color: '#333',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1140,
    margin: '0 auto',
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    fontSize: 18,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HeaderNav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.navBox}>
        <Button className={classes.menuButton}>首頁</Button>
        <Button className={classes.menuButton}>真人百家樂</Button>
        <Button className={classes.menuButton}>運彩體育</Button>
        <Button className={classes.menuButton}>電子遊戲</Button>
        <Button className={classes.menuButton}>捕魚遊戲</Button>
        <Button className={classes.menuButton}>電子競技</Button>
        <Button className={classes.menuButton}>彩票遊戲</Button>
        <Button className={classes.menuButton}>優惠活動</Button>
        {/* <Box flexGrow={1} textAlign="right">
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box> */}
      </Box>
    </div>
  );
}
