// import { useHistory } from 'react-router-dom';
// import { useEffect } from 'react';
// import Screen from '../Screen';

// const GameScreen = () => {
//   // Router Props
//   const history = useHistory();

//   const leave = () => {
//     window.confirm('確定離開嗎?');
//     history.replace('/home');
//   };

//   useEffect(() => {}, []);

//   return (
//     <div className="App">
//       <div className="App-background">
//         {/* <p>{camera}</p> */}
//         <div style={styles.slotBackground}>
//           <img src={'/banner-wolf.png'} />
//           <div style={styles.screen}>
//             <Screen leave={leave} />
//           </div>
//           <div style={styles.buttonTable}>
//             <button style={styles.buttonMax}>Max</button>
//             <button style={styles.buttonSpin}>Spin</button>
//             <button style={styles.buttonOpen}>開分</button>
//             <button style={styles.buttonLeave} onClick={leave}>
//               離開
//             </button>
//           </div>
//           <div style={styles.details}></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   slotBackground: {
//     width: 300,
//     height: 700,
//     background: '#FFFFFF',
//   },
//   screen: {
//     width: 300,
//     height: 360,
//     background: 'gray',
//   },
//   buttonTable: {
//     background: '#4a78ba',
//     display: 'flex',
//     flexdirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   buttonMax: {
//     width: 80,
//     height: 50,
//     background: 'yellow',
//     color: 'gray',
//     fontSize: 35,
//     // display: 'block',
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },
//   buttonSpin: {
//     width: 80,
//     height: 50,
//     background: 'lightblue',
//     // color: 'gray',
//     fontSize: 35,
//     // display: 'block',
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },
//   buttonOpen: {
//     width: 80,
//     height: 50,
//     background: 'lightgreen',
//     color: 'lightred',
//     fontSize: 20,
//     // display: 'block',
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },
//   details: {
//     width: '100%',
//     height: 160,
//     background: '#98aec5',
//   },
// };

// export default GameScreen;
