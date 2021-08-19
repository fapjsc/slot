import { useEffect, useContext, useState } from 'react';
import ReactPaginate from 'react-paginate';

// Components
import MachineItemNew from './machineItemNew';
import MachineItemHorizontal from './machineItemHorizontal';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import BorderAnimation from '../UI/BorderAnimation';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// Context
import UserContext from '../../context/User/UserContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 50,
    margin: '0 auto',
    maxWidth: '678px',
  },
  rootHorizontal: {
    padding: '60px 12px 0px 12px',
    maxWidth: '678px',
    margin: '0 auto',
  },
  containerHorizontal: {
    justifyContent: 'center',
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MachineList = props => {
  const classes = useStyles();

  // Init State
  const { egmList } = props;
  const [pageCount, setPageCount] = useState(0); //總共多少頁
  const [pageNumber, setPageNumber] = useState(0); //當前選擇的頁數
  const dataPerPage = 3; // 一頁4筆資料
  const pagesVisited = pageNumber * dataPerPage;

  // User Context
  const { pointLading, machineDisplayHorizontal } = useContext(UserContext);

  const renderMachineList = props.egmList
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .map((item, index) => {
      return (
        <Grid key={index} item md={12} xs={12} style={{ margin: '0 auto', maxWidth: '20rem' }}>
          <Box>
            <BorderAnimation>
              <MachineItemNew
                index={index}
                title={item.gameName}
                description={item.gameDesc}
                picName={item.picName}
                machineDetails={item}
                token={props.token}
                pageNumber={pageNumber}
              />
            </BorderAnimation>
          </Box>
        </Grid>
      );
    });

  const renderMachineListHorizontal = props.egmList
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .map((item, index) => {
      return (
        <Grid key={index} item md={10} sm={12}>
          <BorderAnimation key={index}>
            <MachineItemHorizontal
              index={index}
              title={item.gameName}
              description={item.gameDesc}
              picName={item.picName}
              machineDetails={item}
              token={props.token}
              pageNumber={pageNumber}
            />
          </BorderAnimation>
        </Grid>
      );
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    if (egmList) {
      let num = Math.ceil(egmList.length / 3);
      setPageCount(num);
    }
  }, [egmList]);

  return (
    <div className={machineDisplayHorizontal ? classes.rootHorizontal : classes.root}>
      <Backdrop className={classes.backdrop} open={pointLading}>
        <div>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress color="inherit" />
          </div>
          {/* <p>開分中，請稍候...</p> */}
        </div>
      </Backdrop>

      {machineDisplayHorizontal ? (
        <Grid container spacing={3} className={classes.containerHorizontal}>
          {renderMachineListHorizontal}
        </Grid>
      ) : (
        <Grid container className={classes.container} spacing={3}>
          {renderMachineList}
        </Grid>
      )}

      <div className="paginationBox">
        <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          pageCount={pageCount} // 總共多少頁
          containerClassName={'pagination'}
          pageLinkClassName={'modal'}
          onPageChange={changePage}
          initialPage={pageNumber}
          activeClassName={'paginationActive'}
          previousLinkClassName={'previous'}
          nextLinkClassName={'next'}
        />
      </div>
    </div>
  );
};
export default MachineList;
