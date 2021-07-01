// import { useHistory } from 'react-router-dom';
// import { useContext, useEffect, useState } from 'react';
// import Screen from '../Screen';
// import ApiController from '../api/apiController';
// import UserContext from '../context/User/UserContext';

// const GameScreen = () => {
//   const [configId, setConfigId] = useState();
//   const [egmId, setEgmId] = useState(9);
//   const [egmIP, setEgmIP] = useState('192.168.10.71');
//   // User Context
//   const userContext = useContext(UserContext);
//   const { apiToken } = userContext;
//   // Router Props
//   const history = useHistory();

//   const leave = async () => {
//     window.confirm('確定離開嗎?', apiToken);
//     // history.replace('/home');

//     try {
//       let responseData = await ApiController()
//       .endGameApi(configId, egmId, egmIP, apiToken);
//       if (responseData.code > 100000000) {
//         alert('ERROR!');
//       }
//       if (responseData.code < 100000000) {
//       }
//     } catch (error) {
//       alert('ERROR message: ', error);
//     }
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
