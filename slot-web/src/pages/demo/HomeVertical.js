import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    justifySelf: 'center',
    justifyItems: 'center',
  },
  paper: {
    backgroundColor: 'red',
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    margin: '4px',
  },
  image: {
    width: 138,
    height: 138,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  gridControl: {
    backgroundColor: '#43f',
  },
  gridControl2: {
    backgroundColor: '#f97',
    alignItems: 'center',
  },
}));

export default function HomeLevel() {
  const classes = useStyles();

  return (
    <Grid container xs spacing={1}>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Grid className={classes.gridControl} item xs>
            <ButtonBase className={classes.image}>圖片</ButtonBase>
          </Grid>
          <Grid item xs>
            <Grid
              className={classes.gridControl2}
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              spacing={1}
            >
              <Grid item>
                <Typography gutterBottom variant="h3">
                  標題
                </Typography>
                <Typography variant="body2" gutterBottom>
                  遊戲內容
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  按鈕
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Grid className={classes.gridControl} item xs>
            <ButtonBase className={classes.image}>圖片</ButtonBase>
          </Grid>
          <Grid item xs>
            <Grid
              className={classes.gridControl2}
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              spacing={1}
            >
              <Grid item>
                <Typography gutterBottom variant="h3">
                  標題
                </Typography>
                <Typography variant="body2" gutterBottom>
                  遊戲內容
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  按鈕
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
