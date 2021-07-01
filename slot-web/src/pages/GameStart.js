// import React, { useContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// // Style
// import './GameStart.css';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Container from '@material-ui/core/Container';
// import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import GameStartMobile from '../components/gameStart/GameStartMobile';
// import ApiController from '../api/apiController';
// import wolfIcon from '../asset/wolf.png';
// import wolfBg from '../asset/wolf-bg.png';
// import bottomBg from '../asset/bottom.jpg';
// import centerBg from '../asset/center_bk.jpg';

// // Components
// import Screen from '../Screen';
// // import centerBg from '../asset/center_bk.jpg';

// // Context
// import UserContext from '../context/User/UserContext';

// const useStyles = makeStyles({
//   root: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     margin: '50px auto',
//     maxWidth: 870,
//   },
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
//   screenBox: {
//     position: 'relative',
//   },
//   cameraScreen: {
//     position: 'absolute',
//     top: 12,
//     left: 42,
//     backgroundColor: '#15161B',
//     width: '90%',
//     height: '330px',
//   },
//   logoBox: {
//     height: 150,
//     backgroundPosition: 'center',
//     backgroundSize: '100% 80%',
//     backgroundRepeat: 'no-repeat',
//     margin: 30,
//   },
// });

// const GameStart = () => {
//   const classes = useStyles();

//   // Init State
//   const [imgObj, setImgObj] = useState();
//   const [state, setState] = React.useState({
//     left: false,
//   });

//   const history = useHistory();

//   const [device, setDevice] = useState(false);
//   const [cashIn, setCashIn] = useState('');
//   // const [configId, setConfigId] = useState(2);
//   // const [egmId, setEgmId] = useState(9);
//   // const [egmIP, setEgmIP] = useState('192.168.10.71');
//   // const [buttonNumber, setButtonNumber] = useState(77);
//   // const [buttonText, setButtonText] = useState('SPIN');
//   // const [buttonNumber2, setButtonNumber2] = useState(99);
//   // const [buttonText2, setButtonText2] = useState('MAX BET');
//   // User Context
//   const userContext = useContext(UserContext);
//   const { apiToken, selectEgm } = userContext;
//   const { mapId, egmId, egmIp } = selectEgm;

//   const handleRWD = () => {
//     if (window.innerWidth < 1000) setDevice(true);
//     else setDevice(false);
//   };

//   const handleChange = e => {
//     setCashIn(Number(e.target.value));
//   };

//   const toggleDrawer = (anchor, open) => event => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const leave = async () => {
//     if (window.confirm('確定要離開嗎？')) {
//       try {
//         let responseData = await ApiController().endGameApi(mapId, egmId, egmIp, apiToken);
//         console.log(responseData);
//         if (responseData.code > 100000000) {
//           alert(responseData.msg);
//         }
//         if (responseData.code === 6 || responseData.code === 5) {
//           history.replace('/home');
//         }
//       } catch (error) {
//         alert('ERROR message: ', error);
//       }
//     }
//   };

//   const spin = async () => {
//     console.log('call spin');
//     try {
//       let responseData = await ApiController().pressSlotApi(mapId, egmId, egmIp, 77, apiToken);
//       if (responseData.code > 100000000) {
//         alert('ERROR!');
//       }
//       if (responseData.code < 100000000) {
//         console.log(responseData);
//       }
//     } catch (error) {
//       alert('ERROR message: ', error);
//     }
//   };

//   const maxBet = async () => {
//     try {
//       let responseData = await ApiController().pressSlotApi(mapId, egmId, egmIp, 99, apiToken);
//       if (responseData.code > 100000000) {
//         alert('ERROR!');
//       }
//       if (responseData.code < 100000000) {
//       }
//     } catch (error) {
//       alert('ERROR message: ', error);
//     }
//   };

//   const pointCash = async cash => {
//     try {
//       let responseData = await ApiController().pointCashApi(mapId, egmId, egmIp, cash, apiToken);
//       console.log(responseData);
//       if (responseData.code > 100000000) {
//         alert('ERROR!');
//       }
//       if (responseData.code < 100000000) {
//       }
//     } catch (error) {
//       alert('ERROR message: ', error);
//     }
//   };

//   const list = anchor => (
//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === 'top' || anchor === 'bottom',
//       })}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     ></div>
//   );

//   // 動態加載圖片
//   const getImg = () => {
//     // webPack api 獲取圖片資料夾的上下文，遞歸尋找符合jpg的圖片
//     const imgContext = require.context('../asset', true, /\.jpg$/);
//     // 過濾符合props給的picName
//     const imgPath = imgContext.keys().filter(path => path.includes(selectEgm.picName));
//     // 轉成 es6 import obj
//     const images = imgPath.map(path => imgContext(path));
//     // return react 可以用的src obj
//     if (images[0]) setImgObj(images[0].default);
//   };

//   useEffect(() => {
//     getImg();
//     window.addEventListener('resize', handleRWD);
//     const token = localStorage.getItem('token');
//     console.log(token);

//     handleRWD();
//     return () => {
//       window.removeEventListener('resize', handleRWD);
//       // leave();
//     };
//     // eslint-disable-next-line
//   }, []);

//   if (device === true) return <GameStartMobile leave={leave} spin={spin} maxBet={maxBet} pointCash={pointCash} />;
//   return (
//     <Container fixed>
//       {/* <Box style={{ backgroundColor: '#191c19' }} className={classes.root}> */}
//       <Box style={{ backgroundColor: '#191c19' }} className={classes.root}>
//         <Box className="">
//           <img className="" src={'/left-top.png'} />
//           <div>
//             <img className="" src={'/left-bottom.png'} />
//           </div>
//           {/* <div className="gameDrawer">
//             {['設定'].map(anchor => (
//               <React.Fragment key={anchor}>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   style={{
//                     fontSize: '1.2rem',
//                     fontWeight: 'bold',
//                     color: 'azure',
//                   }}
//                   onClick={toggleDrawer(anchor, true)}
//                 >
//                   {anchor}
//                 </Button>
//                 <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
//                   {list(anchor)}
//                 </Drawer>
//               </React.Fragment>
//             ))}
//           </div> */}
//         </Box>
//         <Box className="divPosition">
//           <div
//             className={classes.logoBox}
//             style={{
//               backgroundImage: 'url(' + imgObj + ')',
//             }}
//           />
//           <div className={classes.screenBox}>
//             <img className="backImg_Center" src={'/center.jpg'} />
//             {/* <img className="backImg_Center" src={centerBg} alt="center bg" /> */}
//             <div className={classes.cameraScreen}>
//               <Screen />
//             </div>
//           </div>

//           <div className="tt">
//             <img className="backImg" src={'/center_bottom.jpg'} />
//             <button className="buttonPosition" type="primary" onClick={maxBet}>
//               MAX BET
//             </button>
//             <button className="buttonPosition2" type="primary" onClick={leave}>
//               結算
//             </button>
//             <button className="buttonPosition3" type="primary" onClick={spin}>
//               SPIN
//             </button>
//             <button className="buttonPosition4" type="primary">
//               AUTO SPIN
//             </button>
//             <div className="gameTab">
//               <span
//                 style={{
//                   fontSize: '1.0rem',
//                   color: 'white',
//                   fontWeight: 'bold',
//                   padding: '5px',
//                 }}
//               >
//                 點數
//               </span>
//               <input value={cashIn} onChange={e => handleChange(e)} />
//               <button className="gameTabButton" type="primary" onClick={() => pointCash(cashIn)}>
//                 投入代幣
//               </button>
//             </div>
//           </div>
//         </Box>
//         <Box className="divPosition">
//           <img className="backImg-right" src={'/right-top.png'} />
//           <div className="tt">
//             <img className="backImg-right" src={'/right-bottom.png'} />
//           </div>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default GameStart;
