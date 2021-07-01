// import React, { useState, useEffect, useContext } from 'react';

// // Style
// import './GameStartMobile.css';
// import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Background from '../../asset/bg.png';
// import wolf from '../../asset/wolf-bg.png';
// import cleopatra from '../../asset/cleopatra-bg.png';
// import dragons from '../../asset/dragons-bg.png';

// // Components
// import Screen from '../../Screen';

// // Context
// import UserContext from '../../context/User/UserContext';

// const useStyles = makeStyles({
//   root: {
//     backgroundColor: '#15161B',
//     padding: 10,
//   },
//   machine: {
//     Width: '500px',
//     height: '500px',
//     backgroundImage: 'url(' + Background + ')',
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//   },
//   machineCleopatra: {
//     Width: '500px',
//     height: '500px',
//     backgroundImage: 'url(' + cleopatra + ')',
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//   },
//   machineWolf: {
//     Width: '500px',
//     height: '500px',
//     backgroundImage: 'url(' + wolf + ')',
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//   },

//   machineDragons: {
//     Width: '500px',
//     height: '500px',
//     backgroundImage: 'url(' + dragons + ')',
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//   },
//   buttonBox: {
//     backgroundColor: '#ddd',
//     width: '100%',
//     paddingTop: '30px',
//     paddingBottom: '30px',
//   },
//   maxButton: {
//     backgroundColor: '#042a5f',
//     padding: '10px',
//     margin: '0 10px',
//     paddingBottom: '10px',
//     color: 'rgb(255, 240, 240)',
//     fontSize: '.8rem',
//     fontWeight: 'bold 5px',
//     borderColor: '#073370',
//     borderRadius: '10px',
//     marginRight: 'auto',
//   },
//   pointText: {
//     fontSize: '.8rem',
//     color: 'white',
//     fontWeight: 'bold',
//     padding: '3px',
//   },
//   slotButton: {
//     backgroundColor: '#042a5f',
//     padding: '10px',
//     margin: '0 10px',
//     paddingBottom: '10px',
//     fontSize: '.8rem',
//     color: 'azure',
//     fontWeight: 'bold 5px',
//     borderColor: '#073370',
//     borderRadius: '10px',
//   },
//   accountButton: {
//     backgroundColor: '#ebdada',
//     padding: '10px',
//     margin: '0 10px',
//     paddingBottom: '10px',
//     color: 'rgb(14, 0, 0)',
//     fontSize: '.8rem',
//     fontWeight: 'bold',
//     borderColor: '#d2e9bf',
//     borderRadius: '10px',
//     marginRight: 'auto',
//   },

//   autoSpinButton: {
//     backgroundColor: '#e01313',
//     padding: '10px',
//     margin: '0 10px',
//     paddingBottom: '10px',
//     color: 'azure',
//     fontWeight: 'bold 5px',
//     borderColor: '#81f722',
//     borderRadius: '50%',
//   },

//   spinButton: {
//     backgroundColor: '#0d6349',
//     padding: '10px',
//     margin: '0 10px',
//     paddingBottom: '10px',
//     color: 'azure',
//     fontWeight: 'bold 5px',
//     borderColor: '#81f722',
//     borderRadius: '50%',
//   },
//   bottomBox: {
//     marginTop: 20,
//     display: 'flex',
//     justifyContent: 'flex-start',
//   },
//   screenBox: {
//     position: 'absolute',
//     top: 150,
//     left: 11,
//     height: 330,
//   },
// });

// const GameStartMobile = props => {
//   const userContext = useContext(UserContext);
//   const { selectEgm } = userContext;

//   const classes = useStyles();

//   // Init State
//   const [imgObj, setImgObj] = useState();

//   const [state, setState] = useState({
//     left: false,
//   });
//   const [cashIn, setCashIn] = useState('');

//   const toggleDrawer = (anchor, open) => event => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const handleChange = e => {
//     setCashIn(Number(e.target.value));
//   };

//   // 動態加載圖片
//   const getImg = () => {
//     // webPack api 獲取圖片資料夾的上下文，遞歸尋找符合jpg的圖片
//     const imgContext = require.context('../../asset', true, /\.jpg$/);
//     // 過濾符合props給的picName
//     const imgPath = imgContext.keys().filter(path => path.includes(selectEgm.picName));
//     // 轉成 es6 import obj
//     const images = imgPath.map(path => imgContext(path));
//     // return react 可以用的src obj
//     if (images[0]) setImgObj(images[0].default);
//   };

//   useEffect(() => {
//     getImg();
//     console.log(props);
//     // alert(selectEgm.egmId);
//     return () => {
//       // props.leave();
//     };

//     // eslint-disable-next-line
//   }, []);

//   return (
//     <Box className={classes.root}>
//       <Box className={selectEgm.egmId === 10 ? classes.machineDragons : selectEgm.egmId === 9 ? classes.machineWolf : selectEgm.egmId === 12 ? classes.machineCleopatra : classes.machine}></Box>

//       {/* <Box className={classes.machine}></Box> */}
//       <Box className={classes.screenBox}>
//         <Screen />{' '}
//       </Box>
//       <Box className={classes.buttonBox}>
//         <Box style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
//           <button className={classes.maxButton} type="primary">
//             {/* <button className="mobileButtonPosition" type="primary" onClick={props.maxBet}> */}
//             MAX BET
//           </button>
//           <span className={classes.pointText}>點數</span>
//           <input value={cashIn} onChange={e => handleChange(e)} style={{ width: 100 }} />
//           <button className={classes.slotButton} type="primary" onClick={() => props.pointCash(cashIn)}>
//             投幣
//           </button>
//         </Box>

//         <Box className={classes.bottomBox}>
//           <button className={classes.accountButton} type="primary" onClick={props.leave}>
//             {/* <button className="mobileButtonPosition2" type="primary" onClick={props.leave}> */}
//             結算
//           </button>

//           <button className={classes.autoSpinButton} type="primary">
//             AUTO SPIN
//           </button>

//           <button className={classes.spinButton} type="primary" onClick={props.spin}>
//             {/* <button className="mobileButtonPosition3" type="primary" onClick={props.spin}> */}
//             SPIN
//           </button>
//         </Box>

//         {/* <button className="mobileButtonPosition2" type="primary">
//           結算
//         </button>
//         <button className="mobileButtonPosition3" type="primary">
//           SPIN
//         </button>
//         <button className="mobileButtonPosition4" type="primary">
//           AUTO SPIN
//         </button>
//         <div className="mobileGameTab">
//           <span
//             style={{
//               fontSize: '1.0rem',
//               color: 'white',
//               fontWeight: 'bold',
//               padding: '5px',
//             }}
//           >
//             點數
//           </span>
//           <input />
//           <button className="mobileGameTabButton" type="primary">
//             投入代幣
//           </button>
//         </div> */}
//         {/* <button className="mobileGameTabButton" type="primary" onClick={props.pointCash}> */}
//       </Box>
//     </Box>
//   );
// };

// export default GameStartMobile;
