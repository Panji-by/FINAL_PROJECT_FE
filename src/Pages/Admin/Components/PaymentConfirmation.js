import React, { useState, useEffect, Component } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import "../../../Assets/icons/css/paymentAdmin.scss";
import Img from "../../../Assets/icons/logo/realizdea-logo.png";
import {
  Container,
  Row,
  Col,
  Spinner,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import logo from '../../../Assets/images/realizdea.png';
import AOS from "aos"

// actions
import {getContestDetail} from '../../../reduxthunk/actions/getContestDetailActions';
import { getPaymentConfirmation } from "../../../reduxthunk/actions/getJsonPayment";
import { getPaymentApprove } from '../../../reduxthunk/actions/getPaymentApprove';
import { getPaymentReject } from '../../../reduxthunk/actions/getPaymentReject'

const PaymentConfirm = () => {

  const dispatch = useDispatch();
  let history = useHistory();
  let {id} = useParams();
  // data contest
  const dataDetail = useSelector(state => state.getContestDetail.dataJson);
  const loadingDetail = useSelector(state => state.getContestDetail.loading);
  // data payment detail
  const dataPaymentConfirmation = useSelector(state => state.getPaymentConfirmation.dataJson);
  const errorPaymentConfirmation = useSelector(state => state.getPaymentConfirmation.error);
  const loadingPaymentConfirmation = useSelector(state => state.getPaymentConfirmation.loading);
  //  data payment approve
  const dataPaymentApprove = useSelector(state => state.getPaymentApprove.dataJson);
  const loadingApprove = useSelector(state => state.getPaymentApprove.loading);
  // data payment reject
  const dataPaymentReject = useSelector((state) => state.getPaymentReject.dataJson);
  const loadingPaymentReject = useSelector((state) => state.getPaymentReject.loading);

  const getApproved = () => {
    dispatch(getPaymentApprove(id));
  };
  if(dataPaymentApprove) {
    history.push(`/admin/dashboard/contest/${id}`);
  }

  const getReject = () => {
    dispatch(getPaymentReject(id));
  };
  if(dataPaymentReject){
    history.push('/admin/dashboard')
  }

  useEffect(() => {
    dispatch(getContestDetail(id));
    dispatch(getPaymentConfirmation(id));
  }, []);
  console.log(dataPaymentConfirmation, 'DATA PAYMENT PROVIDER');
  console.log(errorPaymentConfirmation, 'ERROR PAYMENT PROVIDER');

  //Aos scroll animation
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div className="providerContestDetail">
      <Container className="contestDetail" style={{minHeight:'750px'}}>
        {loadingDetail || loadingPaymentConfirmation ? (
          <div className="loadingLogo">
            <img src={logo} />
          </div>
        ) : (
          <div>
            <Row>
              <Col data-aos="fade-in" sm="12" md={{ size: 8, offset: 2 }} className="contestTemplate">
                <div className='posterContainer'>
                  <div>
                    <a href='#modalPoster'><img src={dataDetail ? 'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${dataDetail.poster}` : null} alt='Contest Poster' className='contestPoster' /></a>
                  </div>
                  <div>
                    <h1>{dataDetail.title}</h1>
                    <h6>
                      Status: <b>{dataDetail.status ? dataDetail.status.status : null}</b>
                    </h6>
                    <h6>
                      Winner Prize: <b>{dataDetail.prize}</b>
                    </h6>
                    <h6>
                      Due Date: <b>{dataDetail.due_date}</b>
                    </h6>
                    <h6>
                      Announcement: <b>{dataDetail.announcement}</b>
                    </h6>
                  </div>
                </div>
                <p>{dataDetail.description}</p>
              </Col>
            </Row>
            <Row>
              <Col data-aos="fade-up"
                sm="12"
                md={{ size: 8, offset: 2 }}
                className="submissions payment-submission"
              >
                {dataPaymentConfirmation && !errorPaymentConfirmation ? (<div>
                  <h1>Payment Submission</h1>
                  <h6>
                    From : <b>{`${dataPaymentConfirmation ?  dataPaymentConfirmation.bank_provider : null} ${dataPaymentConfirmation ?  dataPaymentConfirmation.account_number_provider : null}`}</b>
                  </h6>
                  <h6>
                    Amount : <b>{dataPaymentConfirmation.contest ?  dataPaymentConfirmation.contest.amount : null}</b>
                  </h6>
                  <div className="submissionsContainer submission-child">
                    <div>
                      <img src={dataPaymentConfirmation ? 'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${dataPaymentConfirmation.evidence_provider}` : null} /> 
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 text-center adminPaymentApprove" style={{display:'flex', justifyContent:'center', marginBottom:'50px'}}>
                      <button className="btn btn-primary btn-md approval-button1" onClick={getApproved} disabled={loadingApprove || loadingPaymentReject ? 'true' : ''} style={{cursor:`${loadingApprove || loadingPaymentReject ? 'not-allowed' : 'pointer'}`}} title='Approve Payment Evidence'>
                        {loadingApprove ? <Spinner size="sm" color="light"/> : 'Approve'}
                      </button>
                      <button className="btn btn-danger btn-md approval-button2" onClick={getReject} disabled={loadingPaymentReject || loadingApprove ? 'true' : ''} style={{cursor:`${loadingPaymentReject || loadingApprove ? 'not-allowed' : 'pointer'}`}} title='Reject Payment Evidence'>
                        {loadingPaymentReject ? <Spinner size="sm" color="light"/> : 'Reject'}
                      </button>
                    </div>
                  </div>
                </div>) : <h2 className='errorPaymentConfirmation'>{errorPaymentConfirmation ? errorPaymentConfirmation.id_contest.msg : null}</h2>}
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
};

export default PaymentConfirm;
