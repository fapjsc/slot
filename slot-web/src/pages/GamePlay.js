// import ApiController from '../api/apiController';

// import { useContext, useState, useEffect, useCallback } from 'react';
// import { useHistory } from 'react-router-dom';

// // Redux
// import { useSelector, useDispatch } from 'react-redux';

// // Actions
// import { setSelectEgmData, removeIsPlaying } from '../store/actions/egmActions';

// import screenfull from 'screenfull';

// // Context
// import UserContext from '../context/User/UserContext';

// // WebSocket
// import { connectWithWebSocket } from '../lib/wssConnect';

// // Api
// // import { wsUri } from '../api/config';
// import { pressSlot, getCurrentEgm } from '../lib/api';

// // Hooks
// import useHttp from '../hooks/useHttp';

// // Components
// import Screen from '../Screen';
// import Review from '../components/review/Review';
// import SubButtonHandle from '../components/subButtonHandle/SubButtonHandle';
// import SquareButton from '../components/UI/button/SquareButton';
// import OpenPointHandle from '../components/openPointHandle/OpenPointHandle';

// // Landscape Component
// import LandscapeSubBtnHandle from '../components/landscape/LandscapeSubBtnHandle';

// // Layout
// import Headers from '../layout/Headers';
// import Nav from '../layout/Nav';

// // Style
// import classes from './GamePlay.module.scss';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import IconButton from '@material-ui/core/IconButton';
// import 'odometer/themes/odometer-theme-train-station.css';
// import Box from '@material-ui/core/Box';

// // Icon
// import BuildIcon from '@material-ui/icons/Build';
// import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';

// import RtmpDemo from '../pages/demo/Video';

// // Material Style
// const useStyles = makeStyles(theme => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: '#fff',
//   },
//   snackbarRoot: {
//     fontSize: '1rem',
//     height: '10em',
//     width: '28em',
//   },
//   snackbarMessage: {
//     textAlign: 'center',
//     margin: '0 auto',
//   },
// }));

// // let checkTimer;

// const GamePlay = () => {
//   // User Context
//   const userContext = useContext(UserContext);
//   const {
//     apiToken,
//     // selectEgm,
//     setApiToken,
//     // setSelectEgm,
//     // setBtnList,
//     // btnList,
//     // kickList,
//     // removeKickItem,
//     setReviewState,
//     userReview,
//   } = userContext;

//   const styles = useStyles();

//   // Router Props
//   const history = useHistory();

//   // Redux
//   const { egmCreditList, selectEgmData, kickList, egmPlayingList } = useSelector(
//     state => state.egm
//   );
//   const {
//     btnList,
//     btnStyle,
//     egmSession,
//     mapId,
//     egmId,
//     egmIP,
//     cameraIndex: webNumber,
//     picName,
//   } = selectEgmData;

//   // Actions
//   const dispatch = useDispatch();
//   // Hooks
//   const { error: spinError, data: spinData, sendRequest: spinButtonRequest } = useHttp(pressSlot);

//   const { sendRequest: getCurrentEgmRequest } = useHttp(getCurrentEgm);

//   // Init State
//   const [cashIn, setCashIn] = useState('');
//   const [open, setOpen] = useState(false);
//   const [closeWebRtcConnect, setCloseWebRtcConnect] = useState(false);
//   const [socketClient, setSocketClient] = useState(null);
//   const [autoPlay, setAutoPlay] = useState(false);
//   const [autoGame, setAutoGame] = useState(false);
//   const [credit, setCredit] = useState(0);
//   const [creditLoading] = useState(false);
//   const [mainBtn, setMainBtn] = useState([]);
//   const [subBtn, setSubBtn] = useState([]);
//   const [openSnack, setOpenSnack] = useState(true);
//   const [directionMode, setDirectionMode] = useState('portrait');
//   const [snackBarPic, setSnackBarPic] = useState();

//   const [isOrientationVertical, setIsOrientationVertical] = useState(
//     window.innerHeight > window.innerWidth
//   );

//   const reportWindowSize = () => {
//     if (window.innerHeight > window.innerWidth) setIsOrientationVertical(true);
//     if (window.innerHeight < window.innerWidth) setIsOrientationVertical(false);
//   };

//   const handleAutoPlay = () => {
//     setAutoPlay(true);
//     setOpenSnack(false);
//   };

//   const handleChange = e => {
//     setCashIn(e.target.value);
//   };

//   const refreshPage = () => {
//     socketClient.emit('refresh', webNumber);
//     socketClient.on('clientReload', () => {
//       console.log('client reload ==========');
//       window.location.reload();
//     });
//   };

//   const getSnackImg = useCallback(picName => {
//     // webPack api ??????????????????????????????????????????????????????jpg?????????
//     const imgContext = require.context('../asset/gameDesc', false, /\.jpg|.png/);
//     // ????????????props??????picName
//     const imgPath = imgContext.keys().filter(path => path.includes(picName));
//     // ?????? es6 import obj
//     const images = imgPath.map(path => imgContext(path));
//     // console.log(images, '1234');
//     // return react ????????????src obj
//     if (images[0]) setSnackBarPic(images[0].default);

//     // return react ????????????src obj
//   }, []);

//   const leave = async () => {
//     setOpen(true);
//     setAutoGame(false);
//     // socketClient.emit('unsubscribe', webNumber);
//     setCloseWebRtcConnect(true);
//     try {
//       const responseData = await ApiController().endGameApi(
//         mapId,
//         egmId,
//         egmIP,
//         apiToken,
//         egmSession
//       );

//       if (responseData.code > 100000000) {
//         alert(responseData.msg);
//         setOpen(false);
//         // handleLogout();
//       }

//       if (responseData.code === 6 || responseData.code === 5) {
//         history.replace('/home');
//         setOpen(false);
//         handleLogout();
//         // dispatch(removeIsPlaying(mapId));
//         // dispatch(setSelectEgmData({}));
//         // localStorage.removeItem('mapId');
//         // localStorage.removeItem('egmId');
//         // localStorage.removeItem('ses');
//         // localStorage.removeItem('egmIP');
//         // localStorage.removeItem('audioID');
//         // localStorage.removeItem('cameraID');
//         // localStorage.removeItem('webNumber');
//         // localStorage.removeItem('expirationTime');
//       }
//     } catch (error) {
//       alert('ERROR message: ????????????');
//       setOpen(false);
//       // handleLogout();
//     }
//   };

//   const handleLogout = useCallback(() => {
//     // localStorage.clear();
//     dispatch(removeIsPlaying(mapId));
//     dispatch(setSelectEgmData({}));
//     history.replace('/home');
//     localStorage.removeItem('mapId');
//     localStorage.removeItem('egmId');
//     localStorage.removeItem('ses');
//     localStorage.removeItem('egmIP');
//     localStorage.removeItem('audioID');
//     localStorage.removeItem('cameraID');
//     localStorage.removeItem('webNumber');
//     localStorage.removeItem('expirationTime');
//   }, [dispatch, history, mapId]);

//   const handleFullScreen = () => {
//     if (screenfull.enabled) {
//       screenfull.request();
//     }
//   };

//   // ?????????
//   useEffect(() => {
//     handleFullScreen();
//     const token = localStorage.getItem('token');
//     setApiToken(token);

//     window.addEventListener('resize', () => reportWindowSize());

//     // ?????? user ???????????????
//     window.history.pushState(null, document.title, window.location.href);
//     window.addEventListener('popstate', function (event) {
//       window.history.pushState(null, document.title, window.location.href);
//     });

//     return () => {
//       window.removeEventListener('resize', reportWindowSize);
//       // window.removeEventListener('popstate');
//     };

//     // eslint-disable-next-line
//   }, []);

//   // ????????????
//   useEffect(() => {
//     getSnackImg(picName);
//   }, [picName, getSnackImg]);

//   // get current egm daa
//   useEffect(() => {
//     if (selectEgmData.mapId) return;
//     connectWithWebSocket();
//     const mapId = localStorage.getItem('mapId');
//     const egmId = localStorage.getItem('egmId');
//     const ses = localStorage.getItem('ses');
//     const apiToken = localStorage.getItem('token');
//     const egmIP = localStorage.getItem('egmIP');

//     const reqData = {
//       mapId,
//       egmId,
//       egmIP,
//       ses,
//       apiToken,
//     };
//     getCurrentEgmRequest(reqData);
//   }, [getCurrentEgmRequest, selectEgmData]);

//   //==== Credit handle ====//
//   useEffect(() => {
//     if (!egmCreditList.length) return;
//     let creditItem = egmCreditList.find(el => el.map === Number(selectEgmData.mapId));
//     if (!creditItem) return;
//     setCredit(creditItem.credit);
//   }, [egmCreditList, selectEgmData]);

//   //====  Spin Handler ====//
//   // Spin
//   const spin = useCallback(
//     buttonNo => {
//       // checkRemainingTime();
//       if (!credit || credit === '' || credit <= 50) {
//         setAutoGame(false);
//         alert('credit ??????');
//         return;
//       }

//       const slotReqData = {
//         cfgId: mapId,
//         egmId,
//         egmIP,
//         buttonNo,
//         egmSession,
//         apiToken,
//       };

//       spinButtonRequest(slotReqData);
//     },
//     [apiToken, credit, egmIP, egmId, egmSession, mapId, spinButtonRequest]
//   );

//   // Auto Spin
//   useEffect(() => {
//     if (!autoGame) return;
//     if (!credit || credit === '' || credit <= 50) {
//       setAutoGame(false);
//       alert('credit ??????');
//       return;
//     }
//     spin(77);
//     let timer = setInterval(() => {
//       spin(77);
//     }, 3500);

//     return () => {
//       clearInterval(timer);
//     };
//   }, [autoGame, credit, spin]);

//   // Check Spin Status
//   useEffect(() => {
//     if (!spinData) return;

//     // ?????????????????????
//     if (spinData.code === 100000061) {
//       alert('????????????, ???????????????');
//       handleLogout();
//       return;
//     }

//     if (spinError) {
//       alert(spinError);
//     }

//     // if (spinData.code === 4) {
//     //   updateExpirationTime();
//     // }
//   }, [spinData, history, spinError, handleLogout]);

//   useEffect(() => {
//     if (!kickList) return;

//     const token = localStorage.getItem('token');

//     kickList.forEach(el => {
//       if (String(el.egm) === egmSession && String(el.token) === token) {
//         alert('????????????, ???????????????');
//         handleLogout();
//       }
//     });
//   }, [kickList, egmSession, handleLogout]);

//   useEffect(() => {
//     const currentEgm = egmPlayingList.find(el => String(el.map) === String(mapId));

//     if (!currentEgm) return;

//     const userToken = localStorage.getItem('token');

//     if (currentEgm.state === 'False') {
//       alert('egm is not playing');
//       handleLogout();
//       return;
//     }

//     if (currentEgm.userToken !== userToken) {
//       alert('user error');
//       handleLogout();
//       return;
//     }
//   }, [egmPlayingList, mapId, handleLogout]);

//   // Button Handle
//   useEffect(() => {
//     if (!btnList) return;
//     let mainBtnTemp = [];
//     let subBtnTemp = [];

//     btnList.forEach(btn => {
//       // 99 => MAX, 77 => Spin, 55 => Take
//       if (btn.buttonNo === 77 || btn.buttonNo === 99 || btn.buttonNo === 55) {
//         mainBtnTemp.push(btn);
//       } else {
//         subBtnTemp.push(btn);
//       }
//     });

//     setMainBtn(mainBtnTemp.reverse());
//     console.log(btnStyle, 'btn');

//     // IGT subButton
//     if (btnStyle === 'igt-poker') {
//       subBtnTemp.sort((a, b) => {
//         if (a.buttonNo < b.buttonNo) {
//           return 1;
//         } else {
//           return -1;
//         }
//       });
//       setSubBtn(subBtnTemp);
//     } else if (btnStyle === 'igt-cashcove' || btnStyle === 'igt-cleopatra') {
//       subBtnTemp.sort((a, b) => {
//         if (a.buttonNo < b.buttonNo) {
//           return -1;
//         } else {
//           return 1;
//         }
//       });
//       setSubBtn(subBtnTemp);
//     }

//     // ?????? SubButton
//     if (btnStyle === 'Aristocrat') {
//       subBtnTemp.sort((a, b) => {
//         if (a.buttonNo < b.buttonNo) {
//           return -1;
//         } else {
//           return 1;
//         }
//       });
//       setSubBtn(subBtnTemp);
//     }

//     //Aruze SubButton
//     if (btnStyle === 'Aruze') {
//       subBtnTemp.sort((a, b) => {
//         if (a.buttonNo < b.buttonNo) {
//           return -1;
//         } else {
//           return 1;
//         }
//       });
//       setSubBtn(subBtnTemp);
//     }
//   }, [btnList, btnStyle]);

//   // ????????????
//   useEffect(() => {
//     if (!isOrientationVertical) handleFullScreen();
//   }, [isOrientationVertical]);

//   //==== Render Elements
//   const backDrop = () => (
//     <Backdrop className={styles.backdrop} open={open}>
//       <div>
//         <div>
//           <CircularProgress color="inherit" />
//         </div>
//         <p>?????????????????????...</p>
//       </div>
//     </Backdrop>
//   );

//   // Portrait El
//   const portraitScreenAndSnackEl = () =>
//     webNumber === '29' ? (
//       <div className={classes.slotScreen}>
//         <RtmpDemo />
//       </div>
//     ) : (
//       <div className={`${classes.slotScreen}`}>
//         <Screen
//           setSocketClient={setSocketClient}
//           autoPlay={autoPlay}
//           setAutoPlay={setAutoPlay}
//           leave={leave}
//           closeWebRtcConnect={closeWebRtcConnect}
//           setCloseWebRtcConnect={setCloseWebRtcConnect}
//         />

//         {openSnack && <div onClick={handleAutoPlay} className={classes.snackBar}></div>}
//       </div>
//     );

//   // Button -P
//   const portraitMainBtnListEl = mainBtn.map(btn => {
//     return (
//       <Grid
//         item
//         xs={3}
//         key={btn.buttonNo}
//         className={
//           btn.buttonTxt === 'SPIN'
//             ? `${classes.rotatorBtnBox} ${classes.autoBtnGrid}`
//             : classes.rotatorBtnBox
//         }
//         onClick={() => spin(btn.buttonNo)}
//       >
//         <SquareButton text={btn.buttonTxt} />
//       </Grid>
//     );
//   });

//   const portraitMainBtn = () => (
//     <Grid className={classes.girdContainer} spacing={0} container>
//       <Grid
//         item
//         xs={3}
//         className={`${classes.rotatorBtnBox} ${classes.grid0}`}
//         onClick={() => setAutoGame(!autoGame)}
//       >
//         <SquareButton autoGame={autoGame} text={autoGame ? 'STOP' : 'AUTO'} />
//       </Grid>
//       {portraitMainBtnListEl}
//     </Grid>
//   );

//   const portraitOpBtnHandleEl = () => {
//     return (
//       <div className={classes.btnHandle}>
//         {/* ????????? */}
//         <div className={classes.marquee}>
//           <p>??????????????????</p>
//         </div>

//         <div className={classes.optionBtnBox}>
//           <div>
//             <SubButtonHandle
//               subBtn={subBtn}
//               spin={spin}
//               btnStyle={btnStyle}
//               directionMode={directionMode}
//             />
//           </div>

//           {/* ????????? */}
//           <div>
//             <OpenPointHandle
//               cashIn={cashIn}
//               handleChange={handleChange}
//               creditLoading={creditLoading}
//               credit={credit}
//               setAutoGame={setAutoGame}
//             />
//           </div>

//           <div>
//             <IconButton
//               aria-label="rotation"
//               style={{ backgroundColor: '#ddd' }}
//               color="primary"
//               onClick={refreshPage}
//             >
//               <BuildIcon fontSize="small" />
//             </IconButton>
//             <p className={classes.portraitText}>????????????</p>
//           </div>

//           <div>
//             <IconButton
//               aria-label="rotation"
//               style={{ backgroundColor: '#ddd' }}
//               color="primary"
//               onClick={() => {
//                 if (directionMode === 'portrait') setDirectionMode('landscape');
//                 if (directionMode === 'landscape') setDirectionMode('portrait');
//               }}
//             >
//               <ScreenRotationIcon fontSize="small" />
//             </IconButton>
//             <p className={classes.portraitText}>??????</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Landscape El
//   const landscapeScreenEl = () => (
//     <Box
//       className={
//         !isOrientationVertical
//           ? classes.slotMachineLandscape
//           : `${classes.rotatorHight} ${classes.slotMachineLandscape}`
//       }
//     >
//       <Box className={classes.slotScreenLandscape}>
//         {openSnack && <div onClick={handleAutoPlay} className={classes.snackBarLandscape}></div>}

//         {webNumber === '29' ? (
//           <RtmpDemo />
//         ) : (
//           <Screen
//             setSocketClient={setSocketClient}
//             autoPlay={autoPlay}
//             setAutoPlay={setAutoPlay}
//             leave={leave}
//             closeWebRtcConnect={closeWebRtcConnect}
//             setCloseWebRtcConnect={setCloseWebRtcConnect}
//           />
//         )}
//       </Box>
//     </Box>
//   );

//   const landscapeMinBtnListEl = mainBtn.map(btn => {
//     return (
//       <div onClick={() => spin(btn.buttonNo)}>
//         <SquareButton text={btn.buttonTxt} />
//       </div>
//     );
//   });

//   const landscapeOpBtnHandleEl = () => (
//     <Box
//       className={
//         !isOrientationVertical
//           ? classes.optionBtnBoxLandscape
//           : `${classes.rotatorHight} ${classes.optionBtnBoxLandscape}`
//       }
//     >
//       <div className={classes.iconBox}>
//         <LandscapeSubBtnHandle
//           isOrientationVertical={isOrientationVertical}
//           subBtn={subBtn}
//           spin={spin}
//           btnStyle={btnStyle}
//         />
//       </div>

//       <div className={classes.iconBox}>
//         <IconButton
//           aria-label="rotation"
//           color="primary"
//           onClick={refreshPage}
//           classes={classes.icon}
//           fontSize="small"
//           style={{ backgroundColor: '#ddd' }}
//         >
//           <BuildIcon fontSize="small" />
//         </IconButton>
//         <p className={classes.landscapeText}>????????????</p>
//       </div>

//       <div className={classes.iconBox}>
//         <OpenPointHandle
//           cashIn={cashIn}
//           handleChange={handleChange}
//           creditLoading={creditLoading}
//           credit={credit}
//           setAutoGame={setAutoGame}
//           landscape
//         />
//       </div>

//       <div>
//         <IconButton
//           aria-label="rotation"
//           style={{ backgroundColor: '#ddd' }}
//           color="primary"
//           onClick={() => {
//             if (directionMode === 'portrait') setDirectionMode('landscape');
//             if (directionMode === 'landscape') setDirectionMode('portrait');
//           }}
//         >
//           <ScreenRotationIcon fontSize="small" />
//         </IconButton>
//         <p className={classes.landscapeText}>??????</p>
//       </div>
//     </Box>
//   );

//   const landscapeManBtnAndNav = () => (
//     <Box
//       className={
//         !isOrientationVertical
//           ? classes.mainAndNavBoxLandscape
//           : `${classes.rotatorHight} ${classes.mainAndNavBoxLandscape}`
//       }
//     >
//       <div className={classes.navBox}>
//         <Nav
//           setReviewState={setReviewState}
//           snackBarPic={snackBarPic}
//           directionMode={directionMode}
//         />
//       </div>

//       <div className={classes.mainBtnHandleLandscape}>
//         {landscapeMinBtnListEl}
//         <div onClick={() => setAutoGame(!autoGame)}>
//           <SquareButton autoGame={autoGame} text={autoGame ? 'STOP' : 'AUTO'} />
//         </div>
//       </div>
//     </Box>
//   );

//   return (
//     <section className={classes.root}>
//       {/* Back Drop Loading... */}
//       {backDrop()}

//       {/* Review */}
//       <Review
//         machine={mapId}
//         leave={leave}
//         userReview={userReview}
//         token={apiToken}
//         selectEgm={selectEgmData}
//       />

//       {/* ?????? */}
//       {directionMode === 'portrait' && (
//         <>
//           <Headers mapId={mapId} setReviewState={setReviewState} snackBarPic={snackBarPic} />

//           <div className={`${classes.slotMachine}`}>
//             {/* Screen */}
//             {portraitScreenAndSnackEl()}

//             {/* Main Button */}
//             <div className={classes.mainBtnBox}>{portraitMainBtn()}</div>
//           </div>

//           {/* option Button */}
//           {portraitOpBtnHandleEl()}
//         </>
//       )}

//       {/* ?????? */}
//       {directionMode === 'landscape' && (
//         <div className={isOrientationVertical && classes.rotatorEl}>
//           <Grid container spacing={0}>
//             <Grid item xs>
//               {/* option Button */}
//               {landscapeOpBtnHandleEl()}
//             </Grid>

//             <Grid item xs={7}>
//               {/* Screen */}
//               {landscapeScreenEl()}
//             </Grid>

//             <Grid item xs={3}>
//               {/* Main Button */}
//               {landscapeManBtnAndNav()}
//             </Grid>
//           </Grid>
//         </div>
//       )}
//     </section>
//   );
// };

// export default GamePlay;
