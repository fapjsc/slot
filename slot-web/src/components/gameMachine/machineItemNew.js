import { useContext, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

// Context
import UserContext from '../../context/User/UserContext';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    border: 'none',
  },
  media: {
    height: 20,
    paddingTop: '56.25%', // 16:9
    backgroundImage: 'url(../../../../asset/wolf.jpg)',
    backgroundSize: 'cover',
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

export default function MachineItem(props) {
  // Style
  const classes = useStyles();

  const { pageNumber, machineDetails, chooseEgmRequest } = props;

  // Redux
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
    const imgContext = require.context('../../asset', false, /\.jpg|.png/);
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
      picName: machineDetails.pinName,
      apiToken,
    };
    chooseEgmRequest(reqData);
  };

  useEffect(() => {}, []);

  // setLoginData
  useEffect(() => {
    const data = {
      pc: localStorage.getItem('pc'),
      token: localStorage.getItem('token'),
      at: localStorage.getItem('at'),
      casino: localStorage.getItem('casino'),
    };

    setLoginData(data);
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
    egmPlayingList.forEach(el => {
      if (el === machineDetails.mapId) setIsPlaying(true);
    });

    return () => {
      setIsPlaying(false);
    };
  }, [egmPlayingList, machineDetails]);

  // has credit
  useEffect(() => {
    egmCreditList.forEach(el => {
      if (el.map === machineDetails.mapId && el.credit > 0) setHasCredit(true);
    });

    return () => {
      setHasCredit(false);
    };
  }, [egmCreditList, machineDetails]);

  //==== Jsx Element //====
  const cardActionsElement = (
    <CardActions disableSpacing style={{ justifyContent: 'center' }}>
      {/* 結算中 */}
      {hasCredit && !isPlaying && hasConnect && (
        <span style={disableBtnStyle}>
          <Button disabled style={{ color: '#f2f2f2' }}>
            結算中
          </Button>
        </span>
      )}

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

      {/* 連線中 */}
      {!hasConnect && (
        <span style={disableBtnStyle}>
          <Button disabled style={{ color: '#f2f2f2' }}>
            連線中
          </Button>
        </span>
      )}
    </CardActions>
  );

  return (
    <>
      <Card className={`${classes.root}`}>
        <CardHeader title={props.title ? props.title : 'ARUZE雄狼'} />
        <CardMedia className={classes.media} image={imgObj ? imgObj : null} title="Paella dish" />
        <CardContent style={{ height: 90 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontSize: '18px' }}
          >
            {props.description
              ? `${props.description.split('¢')[0]}¢`
              : '機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontSize: '18px' }}
          >
            {props.description
              ? props.description.split('¢')[1]
              : '機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'}
          </Typography>
        </CardContent>

        {cardActionsElement}
      </Card>
    </>
  );
}

const disableBtnStyle = {
  cursor: 'not-allowed',
  backgroundColor: 'rgb(151, 147, 147)',
  borderRadius: '3px',
  padding: 0,
};
