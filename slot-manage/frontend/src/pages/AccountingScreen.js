import { useState, useEffect } from 'react';

import AccountReport from '../components/account/AccountReport';
import Loader from '../components/element/Loader';

import ReactPaginate from 'react-paginate';
import TimePicker from '../components/account/TimePicker';

import { Card, Alert } from 'react-bootstrap';

import { getAccountReport } from '../lib/api';
import useHttp from '../hooks/useHttp';

const AccountingScreen = () => {
  const {
    status,
    data: reportData,
    error,
    sendRequest: AccountReportRequest,
  } = useHttp(getAccountReport, true);

  // 分頁
  const [pageCount, setPageCount] = useState(0); //總共多少頁
  const [pageNumber, setPageNumber] = useState(0); //當前選擇的頁數

  const dataPerPage = 20; // 一頁10筆資料
  const pagesVisited = pageNumber * dataPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    AccountReportRequest();
  }, [AccountReportRequest]);

  return (
    <>
      <Card style={{ padding: '3rem', marginTop: '3rem' }}>
        <Card.Header as="h2" className="text-center">
          報表
        </Card.Header>

        {status === 'pending' && <Loader />}

        {status === 'completed' && error && (
          <Alert className="mt-4" variant="danger">
            {error}
            <Alert.Link className="p-4" href="/">
              回首頁
            </Alert.Link>
          </Alert>
        )}

        {status === 'completed' && !error && reportData && reportData.length === 0 && (
          <Alert className="mt-4" variant="info">
            目前沒有資料
            <Alert.Link className="p-4" href="/">
              回首頁
            </Alert.Link>
          </Alert>
        )}

        {status === 'completed' && !error && reportData && reportData.length > 0 && (
          <>
            <Card.Body className="">
              <TimePicker filterType="開分" />
              <br />
              <br />
              <TimePicker filterType="洗分" />

              <div className="divider-line my-big" />

              <AccountReport
                dataPerPage={dataPerPage}
                pagesVisited={pagesVisited}
                setPageCount={setPageCount}
                reportData={reportData}
              />
            </Card.Body>

            <Card.Footer>
              <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={pageCount} // 總共多少頁
                pageRangeDisplayed={1}
                onPageChange={changePage}
                initialPage={pageNumber}
                containerClassName={'pagination pagination-lg'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeClassName={'page-item active'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
              />
            </Card.Footer>
          </>
        )}
      </Card>
    </>
  );
};

export default AccountingScreen;
