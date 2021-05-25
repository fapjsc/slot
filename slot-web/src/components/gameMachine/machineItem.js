import { useHistory } from "react-router-dom";

// Style
import machineIcon from '../../asset/egzj1ui37v.jpeg';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 250,
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
  //   const [expanded, setExpanded] = useState(false);

  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

  function selectMachine() {
    history.push("/game");
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            X2
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="麻雀物語2"
        subheader="September 14, 2021"
      />
      <CardMedia className={classes.media} image={machineIcon} title="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{ justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          style={{}}
          onClick={() => selectMachine()}
        >
          開始玩
        </Button>
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>遊戲總數：2750</Typography>
          <Typography paragraph>遊戲數：174</Typography>
          <Typography paragraph>BIG：9</Typography>
          <Typography>REG：15</Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}
