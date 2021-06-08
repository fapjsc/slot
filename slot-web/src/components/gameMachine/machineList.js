// Components
import MachineItemNew from './machineItemNew';
// import MachineItem from './machineItem';
// import WolfGame from './WolfGame';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

// const machineList = [ // 模擬用 機器列表資料
// 	{camera: 0, title: 'Testing', descreption: '機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 1, magnification: 'X4', title: 'ARUZE雄狼', subHeader:"June 1, 2021", machineIcon: './banner-wolf.png', descreption: `機種類型：美國原裝進口 ${<br />}最大押注:Mexbet 500`},
// 	{camera: 2, title: 'Testing', descreption: 'testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 3, title: 'Testing', descreption: 'testing...testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 4, title: 'Testing', descreption: 'testing...testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 5, title: 'Testing', descreption: 'testing...testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 6, title: 'Testing', descreption: 'testing...testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 7, title: 'Testing', descreption: 'testing...testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 8, title: 'Testing', descreption: 'testing...testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 9, title: 'Testing', descreption: 'testing...testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 10, title: 'Testing', descreption: 'testing...testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 11, title: 'Testing', descreption: 'testing...testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 12, title: 'Testing', descreption: 'testing...testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// 	{camera: 13, title: 'Testing', descreption: 'testing...testing...     機種類型：ART TYPE（含擬似BONUS）、純增2.8枚/G 50枚約可遊技轉數：32G'},
// ];

export default function MachineList(props) {
  const classes = useStyles();

  function renderMachineList(egmList) {
    return egmList.map((item, index) => (
      <Grid key={index} item xs={12} sm={4} md={3} className={classes.grid}>
        <MachineItemNew index={index} machineDetails={item} token={props.token} />
      </Grid>
    ));
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ padding: 10 }}>
        {props.egmList.length > 0 ? renderMachineList(props.egmList) : null}
        {/* <WolfGame/> */}
      </Grid>
    </div>
  );
}
