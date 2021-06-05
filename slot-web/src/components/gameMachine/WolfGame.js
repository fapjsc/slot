import { useHistory } from 'react-router-dom';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

// Image
import machineIcon from '../../asset/egzj1ui37v.jpeg';
import wolfImg from '../../asset/wolf.png';

const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
    backgroundColor: '#f2f2f2',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: '',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function MachineItem() {
  const classes = useStyles();

  let history = useHistory();

  const selectMachine = () => {
    history.replace('/gameScreen');
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            X4
          </Avatar>
        }
        title="ARUZE雄狼"
        subheader="September 14, 2021"
      />
      <CardMedia className={classes.media} image={wolfImg} title="Paella dish" />
      <CardContent style={{ height: 90 }}>
        <Typography variant="body2" color="textSecondary" component="p">
          機種類型：美國原裝進口...
          <br />
          最大押注:Mexbet 500
          {/* 機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{ justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={selectMachine}>
          開始玩
        </Button>
      </CardActions>
    </Card>
  );
}
