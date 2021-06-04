import "./GameStartMobile.css";
import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "flex-end",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const GameStartMobile = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></div>
  );

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Box style={{ backgroundColor: "#191c19", width: "vw" }}>
        <Box className="mobileTop">
          <div className="tt">
            <img className="mobileBackImg-leftTop" src={"/left-top.png"} />
            <img className="mobileBackImg-rightTop" src={"/right-top.png"} />
          </div>
          <div className="mobileGameDrawer">
            {["設定"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "azure",
                  }}
                  onClick={toggleDrawer(anchor, true)}
                >
                  {anchor}
                </Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
        </Box>
        <Box className="mobileCenter">
          <img className="mobileBackImg_Center" src={"/center.jpg"} />
        </Box>
        <Box className="mobileBottom">
          <img className="mobileBackImg-Bottom" src={"/bottom.jpg"} />

          <button className="mobileButtonPosition" type="primary">
            MAX BET
          </button>
          <button className="mobileButtonPosition2" type="primary">
            結算
          </button>
          <button className="mobileButtonPosition3" type="primary">
            SPIN
          </button>
          <button className="mobileButtonPosition4" type="primary">
            AUTO SPIN
          </button>
          <div className="mobileGameTab">
            <span
              style={{
                fontSize: "1.0rem",
                color: "white",
                fontWeight: "bold",
                padding: "5px",
              }}
            >
              點數
            </span>
            <input />
            <button className="mobileGameTabButton" type="primary">
              投入代幣
            </button>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default GameStartMobile;
