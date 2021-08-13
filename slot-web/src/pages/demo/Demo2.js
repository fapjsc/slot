import { Grid, Box } from '@material-ui/core';
import styles from './Demo2.module.scss';

const Demo2 = () => {
  return (
    <main className={styles.root}>
      <Grid className={styles.container} container>
        <Grid item xs={2}>
          <Box className={styles.optionBox}>Option</Box>
        </Grid>

        <Grid item xs={8}>
          <Box className={`${styles.box} ${styles.screenBorder}`}>
            <Box className={styles.screen}>screen</Box>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box className={styles.optionBox}>Option</Box>
        </Grid>
      </Grid>
    </main>
  );
};

export default Demo2;
