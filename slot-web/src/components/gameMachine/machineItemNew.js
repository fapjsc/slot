import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
// import styles from './machineIremNew.module.scss';

import ApiController from '../../api/apiController';

// Style
import machineIcon from '../../asset/egzj1ui37v.jpeg';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 250,
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

  // Router Props
  let history = useHistory();

  // Init State
  const [imgObj, setImgObj] = useState();

  // User Context
  const userContext = useContext(UserContext);
  const { setSelectEgm } = userContext;

  const selectMachine = () => {
    console.log('chooseEgm input: ', props.machineDetails);
    console.log('chooseEgm token: ', props.token);
    chooseEgm(props.machineDetails, props.token);
  };

  const chooseEgm = async ({ mapId, egmId, egmIp, cameraId, picName }, apiToken) => {
    try {
      let responseData = await ApiController().playerChooseEgmApi(mapId, egmId, egmIp, apiToken);
      console.log('chooseEgm:', responseData); // 顯示取得回傳資料
      if (responseData.code > 100000000) {
        // code 超過 100000000 為問題回傳
        alert(responseData.msg);
      }
      if (responseData.code < 100000000) {
        console.log(responseData.egmSession, responseData.checkSum);
        setSelectEgm({
          mapId: Number(mapId),
          egmId: Number(egmId),
          egmIp,
          cameraId,
          picName,
        });

        localStorage.setItem('egmId', Number(egmId));
        localStorage.setItem('egmIp', egmIp);
        localStorage.setItem('mapId', Number(mapId));
        localStorage.setItem('cameraId', cameraId);
        localStorage.setItem('picName', picName);
        localStorage.setItem('egmSession', responseData.egmSession);
        localStorage.setItem('checkSum', responseData.checkSum);
        history.replace('/gameStart');
      }
    } catch (error) {
      alert('ERROR message: ', error);
    }
  };

  // 動態加載圖片
  const getImg = () => {
    // webPack api 獲取圖片資料夾的上下文，遞歸尋找符合jpg的圖片
    const imgContext = require.context('../../asset', true, /\.jpg$/);
    // 過濾符合props給的picName
    const imgPath = imgContext.keys().filter(path => path.includes(props.picName));
    // 轉成 es6 import obj
    const images = imgPath.map(path => imgContext(path));
    // return react 可以用的src obj
    if (images[0]) setImgObj(images[0].default);
  };

  useEffect(() => {
    getImg();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Card className={`${classes.root}`}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.magnification ? props.magnification : 'X2'}
            </Avatar>
          }
          title={props.title ? props.title : 'ARUZE雄狼'}
          subheader={props.subHeader ? props.subHeader : 'September 14, 2021'}
        />
        <CardMedia className={classes.media} image={imgObj ? imgObj : machineIcon} title="Paella dish" />
        <CardContent style={{ height: 90 }}>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description ? props.description : '機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'}
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{ justifyContent: 'center' }}>
          <Button variant="contained" color="primary" style={{}} onClick={() => selectMachine()}>
            {props.buttonName ? props.buttonName : '開始玩'}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
