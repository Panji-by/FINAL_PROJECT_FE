import React, {useState, useEffect} from 'react';
import { Link, Redirect, useParams } from "react-router-dom";
import {connect, useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import"./saras.css";
import {Container, Row, Col, Button} from 'reactstrap';
import logo from '../../../Assets/images/realizdea.png';
import AOS from 'aos';

// actions
import {getContestDetail} from '../../../reduxthunk/actions/getContestDetailActions';
import {getWinner} from '../../../reduxthunk/actions/getWinnerActions';
import {getPaymentStatus} from '../../../reduxthunk/actions/getPaymentStatusActions';

function ContestWinner(props) {

  const dispatch = useDispatch();
  let {winner} = useParams();
  // data contest detail
  const dataDetail = useSelector(state => state.getContestDetail.dataJson);
  const loadingDetail = useSelector(state => state.getContestDetail.loading);
  // data winner
  const dataWinner = useSelector(state => state.getWinner.dataJson);
  const loadingWinner = useSelector(state => state.getWinner.loading);
  // data status
  const dataStatus = useSelector(state => state.getPaymentStatus.dataJson);

  console.log(dataDetail, 'GOT IT');
  console.log(dataWinner, 'WINNER');

  useEffect(() => {
    dispatch(getContestDetail(winner));
    dispatch(getWinner(winner));
    dispatch(getPaymentStatus(winner));
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div>
      <Container className='contestDetail' style={{minHeight:'750px'}}>
        {loadingDetail || loadingWinner ? (
          <div className="loadingLogo">
            <img src={logo} />
          </div>
        ) : (
          <div>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }} className='contestTemplate' data-aos='fade'>
                <div className='posterContainer'>
                  <div>
                    <a href='#modalPoster'><img src={dataDetail ? 'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${dataDetail.poster}` : null} alt='Contest Poster' className='contestPoster' /></a>
                  </div>
                  <div>
                    <h1>{dataDetail? dataDetail.title : null}</h1>
                    <h6>Status: <b>{dataDetail ? dataDetail.status ? dataDetail.status.status : null : null }</b></h6>
                    <h6>Winner Prize: <b>{dataDetail? dataDetail.prize : null}</b></h6>
                    <h6>Due Date: <b>{dataDetail? dataDetail.due_date : null}</b></h6>
                    <h6>Announcement: <b>{dataDetail? dataDetail.announcement : null}</b></h6>
                  </div>
                </div>
                <p>{dataDetail? dataDetail.description : null}</p>
                <div className='winner'>
                  <h1>Congratulations! you are the winner!</h1>
                  <h6><span>{dataWinner ? dataWinner.user.winner : null}</span></h6>
                  <h6>Bank: <b>{dataWinner ? dataWinner.user.bank : null} {dataWinner ? dataWinner.user.account_number : null}</b></h6>
                  <h6>Amount: <b>{dataDetail? dataDetail.prize : null}</b></h6>
                  {dataStatus ? (
                    <div className='payment'>
                      <p>Payment Sent</p>
                    </div>
                  ) : (
                    <div className='payment paymentNot'>
                      <p>Payment Have Not Been Sent Yet</p>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Container>

      <div id='modalPoster' className='modalPoster'>
        <a href='#'><i className="fas fa-times-circle"></i></a>
        <img src={dataDetail ? 'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${dataDetail.poster}` : null} alt='Contest Poster' className='modalPosterContent' />
      </div>
      
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

export default connect(mapStateToProps, mapDispatchToProps) (ContestWinner);