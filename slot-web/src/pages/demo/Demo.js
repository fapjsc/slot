// import { useState, useEffect } from 'react';
// import styles from './Demo.module.scss';
// import { Container, Box } from '@material-ui/core';

// import banner from '../../asset/demo/5-Dragons-Deluxe-new-1440x524.png';

// const Demo = () => {
//   const [isOrientationVertical, setIsOrientationVertical] = useState(
//     window.innerHeight > window.innerWidth
//   );
//   const [innerWidth, setInnerWidth] = useState(window.innerWidth);
//   const [innerHeight, setinnerHeight] = useState(window.innerHeight);
//   useEffect(() => {
//     window.addEventListener('resize', () => reportWindowSize());
//     return () => window.removeEventListener('resize', reportWindowSize);
//   }, []);

//   const reportWindowSize = () => {
//     let heightOutput = window.innerHeight;
//     let widthOutput = window.innerWidth;
//     setIsOrientationVertical(heightOutput > widthOutput);
//     setInnerWidth(widthOutput);
//     setinnerHeight(heightOutput);
//     console.log('reportWindowSize: ', 'width:', widthOutput, 'xheight: ', heightOutput);
//   };

//   return (
//     <>
//       <main className={styles.root}>
//         <div
//           style={{
//             // transform: 'rotate(90deg)',
//             transform: isOrientationVertical ? 'rotate(90deg)' : '',
//             transition: 'transform 150ms ease', // smooth transition
//           }}
//         >
//           <Container className={styles.container} maxWidth="sm" color="primary">
//             <Box className={styles.border}>
//               <Box className={styles.bannerBox}>
//                 <img className={styles.banner} src={banner} alt="banner" />
//               </Box>
//               <Box className={styles.screen}></Box>
//             </Box>
//           </Container>
//           <div className={styles.optionBox}></div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Demo;
