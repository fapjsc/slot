import classes from './Headers.module.scss';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import Nav from './Nav';

const Headers = ({ setReviewState }) => {
  return (
    <header className={classes.header}>
      <div className={classes.infoBox}>
        <FlipCameraAndroidIcon fontSize="large" />
        <div className={classes.machineNum}>
          <span>機台</span>
          <span className={classes.badge}>312</span>
        </div>
      </div>

      <div className={classes.userBox}>
        <div className={classes.user}>UserName</div>
        <div className={classes.credit}>Credit: 124353</div>
      </div>
      <div className={classes.navBox}>
        <Nav setReviewState={setReviewState} />
      </div>
    </header>
  );
};

export default Headers;
