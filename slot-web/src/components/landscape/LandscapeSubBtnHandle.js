// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

// import IconButton from '@material-ui/core/IconButton';
// import TouchAppIcon from '@material-ui/icons/TouchApp';
// // import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// // Button Components
// import ButtonGroup from '../buttonType/ButtonGroup';

// // import classes from './LandscapeSubBtnHandle.module.scss';

// const useStyles = makeStyles({
//   list: {
//     width: 160,
//     height: '100%',
//     backgroundImage: 'linear-gradient(#2a2619, #a7a2a2, #2a2619)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fullList: {
//     // width: 'auto',
//   },

//   listOrientation: {
//     width: '100%',
//     height: '11.2rem',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundImage: 'linear-gradient(#2a2619, #a7a2a2, #2a2619)',
//   },
// });

// const LandscapeSubBtnHandle = ({ subBtn, spin, btnStyle, isOrientationVertical }) => {
//   const styles = useStyles();
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => event => {
//     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = anchor => (
//     <div
//       className={clsx(styles.list, {
//         [styles.fullList]: anchor === 'left' || anchor === 'bottom' || 'right',
//       })}
//       role="presentation"
//     >
//       <div
//         className=""
//         style={{
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <ButtonGroup LandscapeMode={true} spin={spin} subBtn={subBtn} btnStyle={btnStyle} />
//       </div>
//     </div>
//   );

//   const listOrientation = anchor => (
//     <div
//       className={clsx(styles.listOrientation, {
//         [styles.fullList]: anchor === 'top' || anchor === 'bottom' || 'right',
//       })}
//       role="presentation"
//     >
//       <div className="">
//         <ButtonGroup
//           isOrientationVertical={isOrientationVertical}
//           LandscapeMode={true}
//           spin={spin}
//           subBtn={subBtn}
//           btnStyle={btnStyle}
//         />
//       </div>
//     </div>
//   );

//   if (!isOrientationVertical) {
//     return (
//       <div>
//         {['right'].map(anchor => (
//           <React.Fragment key={anchor}>
//             <IconButton
//               style={{ backgroundColor: '#ddd' }}
//               aria-label="add to shopping cart"
//               onClick={toggleDrawer(anchor, true)}
//               fontSize="small"
//               color="primary"
//             >
//               <TouchAppIcon fontSize="small" />
//             </IconButton>
//             <p style={{ color: '#fff', marginTop: 5, fontSize: '12px' }}>操作</p>

//             <SwipeableDrawer
//               BackdropProps={{ invisible: true }}
//               anchor={anchor}
//               open={state[anchor]}
//               onClose={toggleDrawer(anchor, false)}
//               onOpen={toggleDrawer(anchor, true)}
//             >
//               {list(anchor)}
//             </SwipeableDrawer>
//           </React.Fragment>
//         ))}
//       </div>
//     );
//   }

//   if (isOrientationVertical) {
//     return (
//       <div>
//         {['bottom'].map(anchor => (
//           <React.Fragment key={anchor}>
//             <IconButton
//               style={{ backgroundColor: '#ddd' }}
//               aria-label="add to shopping cart"
//               onClick={toggleDrawer(anchor, true)}
//               fontSize="small"
//               color="primary"
//             >
//               <TouchAppIcon fontSize="small" />
//             </IconButton>
//             <p style={{ color: '#fff', marginTop: 5, fontSize: '12px' }}>操作</p>

//             <SwipeableDrawer
//               BackdropProps={{ invisible: true }}
//               anchor={anchor}
//               open={state[anchor]}
//               onClose={toggleDrawer(anchor, false)}
//               onOpen={toggleDrawer(anchor, true)}
//             >
//               {listOrientation(anchor)}
//             </SwipeableDrawer>
//           </React.Fragment>
//         ))}
//       </div>
//     );
//   }
// };

// export default React.memo(LandscapeSubBtnHandle);
