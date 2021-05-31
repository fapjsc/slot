import "./GameStart.css";
import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
<<<<<<< Updated upstream
=======
import Box from "@material-ui/core/Box";
>>>>>>> Stashed changes
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
<<<<<<< Updated upstream
=======
  root: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
>>>>>>> Stashed changes
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const GameStart = () => {
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
<<<<<<< Updated upstream
    <>
      <div>
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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
      <div className="divPosition">
        <p><img className="backImg" src={"/barLeft.jpg"} /></p>
        
      </div>
      <div className="divPosition">
=======
    <Box style={{ backgroundColor: "red" }} className={classes.root}>
      <Box className="divPosition" color="primary.main">
        <img className="backImg" src={"/barLeft.jpg"} />
        <div className="gameDrawer">
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
      <Box className="divPosition">
>>>>>>> Stashed changes
        <img className="backImg" src={"/center.jpg"} />
        <button className="buttonPosition" type="primary">
          MAX BET
        </button>
        <button className="buttonPosition2" type="primary">
          結算
        </button>
        <button className="buttonPosition3" type="primary">
          SPIN
        </button>
        <button className="buttonPosition4" type="primary">
          AUTO SPIN
        </button>
<<<<<<< Updated upstream
        <div>
          <div className="gameTab">
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
            <button className="gameTabButton" type="primary">
              投入代幣
            </button>
          </div>
        </div>
      </div>
      <div className="divPosition">
        <img className="backImg" src={"/barRight.jpg"} />
      </div>
    </>
=======
        <div className="gameTab">
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
          <button className="gameTabButton" type="primary">
            投入代幣
          </button>
        </div>
      </Box>
      <Box className="divPosition">
        <img className="backImg" src={"/barRight.jpg"} />
      </Box>
    </Box>
>>>>>>> Stashed changes
  );
};

export default GameStart;
