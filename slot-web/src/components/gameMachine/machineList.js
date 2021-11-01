import React, { useEffect, useContext, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { useHistory } from 'react-router-dom';

// Components
import MachineItemNew from './machineItemNew';
import MachineItemHorizontal from './machineItemHorizontal';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BorderAnimation from '../UI/BorderAnimation';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';

// Context
import UserContext from '../../context/User/UserContext';

// Hooks
import useHttp from '../../hooks/useHttp';

// Api
import { chooseEgm } from '../../lib/api';

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

  container: {
    justifyContent: 'center',
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MachineList = props => {
  const classes = useStyles();

  const history = useHistory();

  // Hooks
  // choose egm
  const {
    status: chooseEgmStatus,
    error: chooseEgmError,
    data: chooseEgmData,
    sendRequest: chooseEgmRequest,
  } = useHttp(chooseEgm);

  const { egmList, setShowGameLoading } = props;

  // Init State
  const [pageCount, setPageCount] = useState(0); //總共多少頁
  const [pageNumber, setPageNumber] = useState(0); //當前選擇的頁數

  const dataPerPage = 3; // 一頁4筆資料
  const pagesVisited = pageNumber * dataPerPage;

  // User Context
  const { machineDisplayHorizontal } = useContext(UserContext);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    if (chooseEgmStatus !== 'completed') return;

    if (chooseEgmError) {
      alert(chooseEgmError);
      return;
    }

    if (chooseEgmData.code === 2) {
      setShowGameLoading(true);
      // history.push('/v2');
    }
  }, [chooseEgmData, chooseEgmError, chooseEgmStatus, setShowGameLoading]);

  //=== Jsx Element ====//
  const renderMachineList = props.egmList
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .map((item, index) => {
      return (
        <Grid key={index} item sm={12} style={{ margin: '0 auto', maxWidth: '20rem' }}>
          <BorderAnimation>
            <MachineItemNew
              index={index}
              title={item.gameName}
              description={item.gameDesc}
              picName={item.picName}
              machineDetails={item}
              token={props.token}
              pageNumber={pageNumber}
              chooseEgmRequest={chooseEgmRequest}
            />
          </BorderAnimation>
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
              chooseEgmRequest={chooseEgmRequest}
            />
          </BorderAnimation>
        </Grid>
      );
    });

  useEffect(() => {
    if (egmList) {
      let num = Math.ceil(egmList.length / 3);
      setPageCount(num);
    }
  }, [egmList]);

  return (
    <div className={machineDisplayHorizontal ? classes.rootHorizontal : classes.root}>
      {/* <Backdrop className={classes.backdrop} open={pointLading}>
        <div>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress color="inherit" />
          </div>
          <p>開分中，請稍候...</p>
        </div>
      </Backdrop> */}

      {machineDisplayHorizontal ? (
        <Grid container spacing={3} className={classes.containerHorizontal}>
          {renderMachineListHorizontal}
        </Grid>
      ) : (
        <Grid container spacing={0}>
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
