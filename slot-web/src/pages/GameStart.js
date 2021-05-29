import './GameStart.css';
import { Button } from 'antd';
import Layout from 'antd/lib/layout/layout';

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
    >
      dss
    </div>
  );

  return (
    <>
      <div>
      {[ 'left' ].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
        ))}
      </div>
      <div className="divPosition">
        <img className="backImg" src={'/barLeft.jpg'} />
      </div>
      <div className="divPosition">
<<<<<<< HEAD
        <img className="backImg" src={'/center.jpg'} />
        <Button className="buttonPosition">MAX BET</Button>
=======
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
>>>>>>> ece555a32017b8450ac6addff949a18249d96e91
      </div>
      <div className="divPosition">
        <img className="backImg" src={'/barRight.jpg'} />
      </div>
    </>
  );
};

export default GameStart;
