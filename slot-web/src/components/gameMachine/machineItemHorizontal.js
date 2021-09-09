import { useContext, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

// Context
import UserContext from '../../context/User/UserContext';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    margin: '0 auto',
    borderRadius: '12px',
  },
  image: {
    width: 15,
    height: 115,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  gridControl: {},
  gridControl2: {
    alignItems: 'center',
  },
}));

const MachineItemHorizontal = props => {
  const classes = useStyles();

  const { pageNumber, chooseEgmRequest, machineDetails } = props;

  const { egmConnectFailList, egmPlayingList, egmCreditList } = useSelector(state => state.egm);

  // Init State
  const [imgObj, setImgObj] = useState();
  const [loginData, setLoginData] = useState(null);
  const [hasConnect, setHasConnect] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCredit, setHasCredit] = useState(false);

  // User Context
  const userContext = useContext(UserContext);
  const { apiToken } = userContext;

  // 動態加載圖片
  const getImg = useCallback(() => {
    // webPack api 獲取圖片資料夾的上下文，遞歸尋找符合jpg的圖片
    const imgContext = require.context('../../asset', false, /\.jpg$/);
    // 過濾符合props給的picName
    const imgPath = imgContext.keys().filter(path => path.includes(props.picName));
    // 轉成 es6 import obj
    const images = imgPath.map(path => imgContext(path));
    // return react 可以用的src obj
    if (images[0]) setImgObj(images[0].default);
  }, [props.picName]);

  const chooseEgmHandler = () => {
    // setIsPlaying(true);
    const reqData = {
      mapId: machineDetails.mapId,
      egmId: machineDetails.egmId,
      egmIP: machineDetails.egmIp,
      apiToken,
    };
    chooseEgmRequest(reqData);
  };

  useEffect(() => {
    const data = {
      pc: localStorage.getItem('pc'),
      token: localStorage.getItem('token'),
      at: localStorage.getItem('at'),
      casino: localStorage.getItem('casino'),
    };

    setLoginData(data);
    // getImg();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getImg();
  }, [pageNumber, getImg]);

  // has connection
  useEffect(() => {
    egmConnectFailList.forEach(el => {
      if (el === machineDetails.mapId) setHasConnect(false);
    });

    return () => {
      setHasConnect(true);
    };
  }, [machineDetails, egmConnectFailList]);

  // Playing
  useEffect(() => {
    const existsItem = egmPlayingList.find(el => String(el.map) === String(machineDetails.mapId));

    if (!existsItem) return;
    existsItem.state === 'True' ? setIsPlaying(true) : setIsPlaying(false);
  }, [egmPlayingList, machineDetails]);

  // has credit
  useEffect(() => {
    const creditExistsItem = egmCreditList.find(
      el => String(el.map) === String(machineDetails.mapId)
    );

    console.log(creditExistsItem);
    if (!creditExistsItem) return;

    creditExistsItem.credit > 0 ? setHasCredit(true) : setHasCredit(false);
  }, [egmCreditList, machineDetails]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid className={classes.gridControl} xs={5} item>
              <div
                className={classes.image}
                style={{
                  backgroundImage: `url(${imgObj})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Grid>
            <Grid item xs={7} container>
              <Grid className={classes.gridControl2} container direction="column" spacing={1}>
                <Grid item>
                  <Typography gutterBottom style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {props.title ? props.title : 'ARUZE雄狼'}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.description
                      ? props.description
                      : '機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'}
                  </Typography>
                </Grid>
                <Grid item>
                  {/* 可以遊戲 */}
                  {hasConnect && !isPlaying && !hasCredit && (
                    <Button variant="contained" color="primary" onClick={chooseEgmHandler}>
                      {props.buttonName ? props.buttonName : '開始玩'}
                    </Button>
                  )}

                  {/* 遊戲中 */}
                  {isPlaying && (
                    <span style={disableBtnStyle}>
                      <Button disabled style={{ color: '#f2f2f2' }}>
                        遊戲中...
                      </Button>
                    </span>
                  )}

                  {/* 結算中 */}
                  {hasCredit && !isPlaying && hasConnect && (
                    <span style={disableBtnStyle}>
                      <Button disabled style={{ color: '#f2f2f2' }}>
                        結算中
                      </Button>
                    </span>
                  )}

                  {/* 連線中 */}
                  {!hasConnect && (
                    <span style={disableBtnStyle}>
                      <Button disabled style={{ color: '#f2f2f2' }}>
                        連線中
                      </Button>
                    </span>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const disableBtnStyle = {
  cursor: 'not-allowed',
  backgroundColor: 'rgb(151, 147, 147)',
  borderRadius: '3px',
  padding: 10,
};

export default MachineItemHorizontal;
