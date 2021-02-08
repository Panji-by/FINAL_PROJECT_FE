import React, {useState, useEffect} from 'react';
import { Link, Redirect } from "react-router-dom";
import {connect, useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Container, Row, Col, Button} from 'reactstrap';
import AOS from 'aos';

// actions
import {getAdminDashboard} from '../../../reduxthunk/actions/getAdminDashboardActions';
import {getAdminDashboardPaid} from '../../../reduxthunk/actions/getDashboardPaidActions';
import {getAdminDashboardUnpaid} from '../../../reduxthunk/actions/getDashboardUnpaidActions';

function Dashboard(props) {
  
  // dashboard tabs
  const [activeTabs, setActiveTabs] = useState(1);
  const activeStyle = {
    borderBottom: '2px solid #191919',
    color: '#191919',
    fontWeight: '700'
  }
  // dashboard tabs ends

  // get data
  const dispatch = useDispatch();
  // data all
  const dataDashboard = useSelector(state => state.getAdminDashboard.dataJson);
  const loadDashboard = useSelector(state => state.getAdminDashboard.loading);
  const errorDashboard = useSelector(state => state.getAdminDashboard.error);
  const totalResult = useSelector(state => state.getAdminDashboard.total);
  const totalPages = useSelector(state => state.getAdminDashboard.pages);
  // data paid
  const dataDashboardPaid = useSelector(state => state.getAdminDashboardPaid.dataJson);
  const loadDashboardPaid = useSelector(state => state.getAdminDashboardPaid.loading);
  const errorDashboardPaid = useSelector(state => state.getAdminDashboardPaid.error);
  const totalResultPaid = useSelector(state => state.getAdminDashboardPaid.total);
  const totalPagesPaid = useSelector(state => state.getAdminDashboardPaid.pages);
  // data unpaid
  const dataDashboardUnpaid = useSelector(state => state.getAdminDashboardUnpaid.dataJson);
  const loadDashboardUnpaid = useSelector(state => state.getAdminDashboardUnpaid.loading);
  const errorDashboardUnpaid = useSelector(state => state.getAdminDashboardUnpaid.error);
  const totalResultUnpaid = useSelector(state => state.getAdminDashboardUnpaid.total);
  const totalPagesUnpaid = useSelector(state => state.getAdminDashboardUnpaid.pages);

  console.log(dataDashboard, 'DATA ALL');
  console.log(dataDashboardPaid, 'DATA PAID');
  console.log(dataDashboardUnpaid, 'DATA UNPAID');
  // console.log(totalResult, 'TOTAL RESULT');
  // console.log(totalPages, 'TOTAL PAGES');
  // get data ends

  // rows per page
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPage, setRowsPage] = useState('5');
  const [rowsPagePrev, setRowsPagePrev] = useState(1);
  const [rowsPageNext, setRowsPageNext] = useState(5);
  const setRows = (e) => {
    setRowsPage(e.target.value);
    setRowsPagePrev(1);
    setRowsPageNext(e.target.value);
  }
  const setNext = (total) => {
    if(rowsPageNext < total) {
      setRowsPagePrev(parseInt(rowsPagePrev) + parseInt(rowsPage));
      setRowsPageNext(parseInt(rowsPageNext) + parseInt(rowsPage));
      setCurrentPage(currentPage + 1);
    }
  }
  const setPrev = () => {
    if(rowsPagePrev !== 1) {
      setRowsPagePrev(parseInt(rowsPagePrev) - parseInt(rowsPage));
      setRowsPageNext(parseInt(rowsPageNext) - parseInt(rowsPage));
      setCurrentPage(currentPage - 1);
    }
  }
  console.log(rowsPage, 'ROWS');
  console.log(rowsPagePrev, 'ROWS PREV');
  console.log(rowsPageNext, 'ROWS NEXT');

  let rows = [];
  let rowsPaid = [];
  let rowsUnpaid = [];
  if(activeTabs === 1) {
    if(totalResult <= 10 && totalResult > 0) {
      for(let i = 0; i < totalResult; i++) {
        rows.push(i+1);
      }
    } else if(totalResultUnpaid > 10) {
      for(let i = 0; i < 10; i++) {
        rows.push(i+1);
      }
    }
  }
  if(activeTabs === 2) {
    if(totalResultPaid <= 10 && totalResultPaid > 0) {
      for(let i = 0; i < totalResultPaid; i++) {
        rowsPaid.push(i+1);
      }
    } else if(totalResultUnpaid > 10) {
      for(let i = 0; i < 10; i++) {
        rowsPaid.push(i+1);
      }
    }
  }
  if(activeTabs === 3) {
    if(totalResultUnpaid <= 10 && totalResultUnpaid > 0) {
      for(let i = 0; i < totalPagesUnpaid; i++) {
        rowsUnpaid.push(i+1);
      }
    } else if(totalResultUnpaid > 10) {
      for(let i = 0; i < 10; i++) {
        rowsUnpaid.push(i+1);
      }
    }
  }
  console.log(rows, 'ROWS');
  console.log(rowsPaid, 'ROWS PAID');
  console.log(rowsUnpaid, 'ROWS UNPAID');
  // rows per page ends

  useEffect(() => {
    AOS.init({ duration: 500 });
    if(activeTabs === 1) {
      dispatch(getAdminDashboard(currentPage));
    }
    if(activeTabs === 2) {
      dispatch(getAdminDashboardPaid(currentPage));
    }
    if(activeTabs === 3){
      dispatch(getAdminDashboardUnpaid(currentPage));
    }
  }, [activeTabs, currentPage]);

  const content = (data) => data.map(list => {
    return (
      <div className='tableContent'>
        <div className='contentTable contentCheck'>
          <input type='checkbox' />
        </div>
        <div className='contentTable contentTitle'>
          <p className='contentTitleName'>{list.contest.title}</p>
          <p className='contentTitleBy'>{list.user.provider}</p>
        </div>
        <div className='contentTable contentStatus'>
          <div className={`statusIcon ${list.status.status === 'Closed' ? 'statusIconClosed' : list.status.status === 'Open' ? null : 'statusIconPending'}`}>
            <p>{list.status.status === 'Closed' ? 'Closed' : list.status.status === 'Open' ? 'Open' : 'Pending'}</p>
          </div>
        </div>
        <div className='contentTable contentPayment'>
          <div className='paidStatus'>
            <div className={list.status_provider_payment === 'Paid' ? 'paidIcon' : 'unpaidIcon'}>
              <i className="fas fa-circle"></i>
              <p>{list.status_provider_payment === 'Paid' ? 'Paid' : 'Unpaid'}</p>
            </div>
          </div>
          <div className='paidDate'>
            <span>{list.status_provider_payment === 'Paid' ? 'Paid' : 'Dued'} on {list.status_provider_payment === 'Paid' ? list.payment_date_provider : list.due_date_provider}</span>
          </div>
        </div>
        <div className='contentTable contentPayment'>
          <div className='paidStatus'>
            <div className={list.status_winner_payment === 'Paid' ? 'paidIcon' : 'unpaidIcon'}>
              <i className="fas fa-circle"></i>
              <p>{list.status_winner_payment === 'Paid' ? 'Paid' : 'Unpaid'}</p>
            </div>
          </div>
          <div className='paidDate'>
            <span>{list.status_winner_payment === 'Paid' ? 'Paid' : 'Dued'} on {list.status_winner_payment === 'Paid' ? list.payment_date_winner : list.due_date_winner}</span>
          </div>
        </div>
        <div className='contentTable contentAmount'>
          <p className='amountMoney'>{list.contest.amount.slice(4, list.contest.amount.length)}</p>
          <p className='amountCurrency'>IDR</p>
        </div>
        <div className='contentTable contentMore'>
          <a href={list.status.status === 'Pending' ? `/admin/dashboard/payment/${list.id_contest}` : `/admin/dashboard/contest/${list.id_contest}`} title='View Contest Detail'><span>View</span> More</a>
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>
    );
  });

  const loadingDashboard = () => {
    return (
      <div className='tableContent'>
        <div className='contentTable contentCheck loadingContainer'>
          <div className='loadingBox' style={{width:'20px',height:'20px', margin:'auto 20px'}}></div>
        </div>
        <div className='contentTable contentTitle loadingContainer'>
          <div className='loadingBox'></div>
        </div>
        <div className='contentTable contentStatus loadingContainer'>
          <div className='loadingBox'></div>
        </div>
        <div className='contentTable contentPayment loadingContainer'>
          <div className='loadingBox'></div>
        </div>
        <div className='contentTable contentPayment loadingContainer'>
          <div className='loadingBox'></div>
        </div>
        <div className='contentTable contentAmount loadingContainer'>
          <div className='loadingBox' style={{width:'100%'}}></div>
        </div>
        <div className='contentTable contentMore loadingContainer'>
          <div className='loadingBox'style={{marginLeft:'10px', width:'80%'}}></div>
        </div>
      </div>
    );
  }

  // small table
  const [expand, setExpand] = useState({
    expand1: false,
    expand2: false,
    expand3: false,
    expand4: false,
    expand5: false
  })
  const showSmallTable = e => {
    setExpand({
      ...expand,
      [e.currentTarget.id]: !expand[e.currentTarget.id]
    });
  }
  const smallTable = data => {
    let result = [];
    for(let i = 0; i < data.length; i++) {
      result.push(
        <div className='contentSmallTable'>
          <div className='contentTitle' id={`expand${i}`} onClick={showSmallTable}>
            <i className='fas fa-chevron-right' style={{transform:`rotate(${expand[`expand${i}`] ? '90deg' : '0deg'})`}}></i>
            <p><b>{data[i] ? data[i].contest.title : null}</b> by {data[i] ? data[i].user.provider : null}</p>
            <Link to={data[i] ? data[i].status.status === 'Pending' ? `/admin/dashboard/payment/${data[i].id_contest}` : `/admin/dashboard/contest/${data[i].id_contest}` : null}><button>Detail</button></Link>
          </div>
          <div className={`contentDesc ${expand[`expand${i}`] ? 'contentDescShow' : null}`}>
            <p style={{marginTop:'10px'}}>Contest Status: <b>{data[i] ? data[i].status.status === 'Closed' ? 'Closed' : data[i].status.status === 'Open' ? 'Open' : 'Pending' : null}</b></p>
            <p>Provider Payment Status: <b>{data[i] ? data[i].status_provider_payment === 'Paid' ? 'Paid' : 'Unpaid' : null}</b></p>
            <p>Provider Payment Date: <b>{data[i] ? data[i].status_provider_payment === 'Paid' ? data[i].payment_date_provider : data[i].due_date_provider : null}</b></p>
            <p>Winner Payment Status: <b>{data[i] ? data[i].status_winner_payment === 'Paid' ? 'Paid' : 'Unpaid' : null}</b></p>
            <p>Winner Payment Date: <b>{data[i] ? data[i].status_winner_payment === 'Paid' ? data[i].payment_date_winner : data[i].due_date_winner : null}</b></p>
            <p>Payment Amount: <b>{data[i] ? data[i].contest.amount : null}</b></p>
          </div>
        </div>
      );
    }
    return result;
  }
  // small table ends

  return (
    <div>
      <Container className='adminDashboard' style={{minHeight:'750px'}} data-aos='fade'>
        <Row>
          <Col>
            <h5>CONTEST</h5>
            <div className='tabsContainer'>
              <div className='tabs' style={activeTabs === 1 ? activeStyle : null} onClick={() => setActiveTabs(1)} title='All Contest'>
                <p>All</p>
              </div>
              <div className='tabs' style={activeTabs === 2 ? activeStyle : null} onClick={() => setActiveTabs(2)} title='Paid Contest'>
                <p>Paid</p>
              </div>
              <div className='tabs' style={activeTabs === 3 ? activeStyle : null} onClick={() => setActiveTabs(3) } title='Unpaid Contest'>
                <p>Unpaid</p>
              </div>
            </div>
            <div className='table'>
              <div className='tableHeader'>
                <div className='header headerCheck'>
                  <input type='checkbox' />
                </div>
                <div className='header headerTitle'>
                  <p>TITLE</p>
                </div>
                <div className='header headerStatus'>
                  <p>CONTEST STATUS</p>
                </div>
                <div className='header headerPayment'>
                  <p>PROVIDER PAYMENT</p>
                </div>
                <div className='header headerPayment'>
                  <p>WINNER PAYMENT</p>
                </div>
                <div className='header headerAmount'>
                  <p>AMOUNT</p>
                </div>
                <div className='header headerMore'>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
              </div>
              <div className='tableContentContainer' style={{minHeight:'60px'}}>
                {loadDashboard || loadDashboardPaid || loadDashboardUnpaid ? loadingDashboard() : (
                  <div>
                    {dataDashboard && activeTabs === 1 ? ( dataDashboard.length === 0 ? <p className='errorAdmin'>- No Contest Yet -</p> :
                      content(dataDashboard)
                    ) : dataDashboardPaid && activeTabs === 2 ? ( dataDashboardPaid.length === 0 ? <p className='errorAdmin'>- No Contest Yet -</p> :
                      content(dataDashboardPaid)
                    ) : dataDashboardUnpaid && activeTabs === 3 ? ( dataDashboardUnpaid.length === 0 ? <p className='errorAdmin'>- No Contest Yet -</p> :
                      content(dataDashboardUnpaid)
                    ) : null}
                  </div>
                )}
              </div>
              <div className='tableFooter'>
                <div className='tableFooterContent contentCount'>
                  <p>{rowsPagePrev}-{rowsPageNext} of {activeTabs === 1 ? totalResult : activeTabs === 2 ? totalResultPaid : activeTabs === 3 ? totalResultUnpaid : null}</p>
                </div>
                <div className='tableFooterContent tablePagination'>
                  <i className="fas fa-chevron-left" onClick={setPrev} title='Previous Page'></i>
                  <i className="fas fa-chevron-right" onClick={activeTabs === 1 ? () => setNext(totalResult) : activeTabs === 2 ? () => setNext(totalResultPaid) : activeTabs === 3 ? () => setNext(totalResultUnpaid) : null} title='Next Page'></i>
                </div>
              </div>
            </div>
            
            <div className='smallTable'>
              <div className='tableHeader'>
                <p>CONTEST LIST</p>
              </div>
              <div className='tableContentContainer'>
                <div className='tableContent'>
                  {dataDashboard && activeTabs === 1 ? ( dataDashboard.length === 0 ? <p className='errorAdmin'>- No Contest Yet -</p> :
                      smallTable(dataDashboard)
                    ) : dataDashboardPaid && activeTabs === 2 ? ( dataDashboardPaid.length === 0 ? <p className='errorAdmin'>- No Contest Yet -</p> :
                      smallTable(dataDashboardPaid)
                    ) : dataDashboardUnpaid && activeTabs === 3 ? ( dataDashboardUnpaid.length === 0 ? <p className='errorAdmin'>- No Contest Yet -</p> :
                      smallTable(dataDashboardUnpaid)
                    ) : null}
                </div>
              </div>
              <div className='tableFooter'>
                <div className='tableFooterContent contentCount'>
                  <p>{rowsPagePrev}-{rowsPageNext} of {activeTabs === 1 ? totalResult : activeTabs === 2 ? totalResultPaid : activeTabs === 3 ? totalResultUnpaid : null}</p>
                </div>
                <div className='tableFooterContent tablePagination'>
                  <i className="fas fa-chevron-left" onClick={setPrev} title='Previous Page'></i>
                  <i className="fas fa-chevron-right" onClick={activeTabs === 1 ? () => setNext(totalResult) : activeTabs === 2 ? () => setNext(totalResultPaid) : activeTabs === 3 ? () => setNext(totalResultUnpaid) : null} title='Next Page'></i>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({});
  return {
    ...actions, dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);