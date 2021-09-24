import { useState } from 'react';

import AccountReport from '../components/account/AccountReport';
import ReactPaginate from 'react-paginate';

import TimePicker from '../components/account/TimePicker';
import { Card } from 'react-bootstrap';

const AccountingScreen = () => {
  // 分頁
  const [pageCount, setPageCount] = useState(0); //總共多少頁
  const [pageNumber, setPageNumber] = useState(0); //當前選擇的頁數

  const dataPerPage = 20; // 一頁10筆資料
  const pagesVisited = pageNumber * dataPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Card style={{ padding: '3rem', marginTop: '3rem' }}>
        <Card.Header as="h2" className="text-center">
          報表
        </Card.Header>

        <Card.Body className="bg-info">
          <TimePicker filterType="開分" />
          <br />
          <br />
          <TimePicker filterType="洗分" />

          <div className="divider-line my-big" />

          <AccountReport
            dataPerPage={dataPerPage}
            pagesVisited={pagesVisited}
            setPageCount={setPageCount}
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
      </Card>
    </>
  );
};

export default AccountingScreen;
