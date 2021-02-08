import React, {useState, useEffect} from 'react';
import { Link, Redirect, useParams } from "react-router-dom";
import {connect, useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Container, Row, Col, Button} from 'reactstrap';
import logo from '../../../Assets/images/realizdea.png';
import AOS from 'aos';

// actions
import {getContestDetail} from '../../../reduxthunk/actions/getContestDetailActions';

function ContestDetailPayment(props) {

  const dispatch = useDispatch();
  let {contest} = useParams();
  const dataDetail = useSelector(state => state.getContestDetail.dataJson);
  const loading = useSelector(state => state.getContestDetail.loading);
  console.log(dataDetail, 'GOT IT');

  useEffect(() => {
    dispatch(getContestDetail(contest));
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div>
      <Container className='providerContestPayment' style={{minHeight:'750px'}}>
        {loading ? (
          <div className="loadingLogo">
            <img src={logo} />
          </div>
        ) : (
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }} className='contestTemplate' data-aos='fade'>
              <div className='posterContainer'>
                <div>
                  <a href='#modalPoster'><img src={dataDetail ? 'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${dataDetail.poster}` : null} alt='Contest Poster' className='contestPoster' /></a>
                </div>
                <div>
                  <h1>{dataDetail? dataDetail.title : null}</h1>
                  <h6>Status: <b>Waiting for payment confirmation</b></h6>
                  <h6>Winner Prize: <b>{dataDetail? dataDetail.prize : null}</b></h6>
                  <h6>Due Date: <b>{dataDetail? dataDetail.due_date : null}</b></h6>
                  <h6>Announcement: <b>{dataDetail? dataDetail.announcement : null}</b></h6>
                </div>
              </div>
              <p>{dataDetail? dataDetail.description : null}</p>
              <div className='paymentBox'>
                <p>Please submit the payment evidence to open the contest</p>
              </div>
              <a href={`/provider/contest/paymentsubmissions/${contest}`}><button title='Contest Payment Submission'>Payment</button></a>
            </Col>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps) (ContestDetailPayment);