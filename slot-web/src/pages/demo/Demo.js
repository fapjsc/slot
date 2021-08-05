import styles from './Demo.module.scss';
import { Container, Box } from '@material-ui/core';

import banner from '../../asset/demo/5-Dragons-Deluxe-new-1440x524.png';

const Demo = () => {
  return (
    <>
      <main className={styles.root}>
        <Container className={styles.container} maxWidth="sm" color="primary">
          <Box className={styles.border}>
            <Box className={styles.bannerBox}>
              <img className={styles.banner} src={banner} alt="banner" />
            </Box>
            <Box className={styles.screen}></Box>
          </Box>
        </Container>
        <div className={styles.optionBox}></div>
      </main>
    </>
  );
};

export default Demo;
