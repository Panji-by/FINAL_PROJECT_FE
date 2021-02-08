import React, { Component, useState, useEffect } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
// import '../Component/Layout/landingPage.scss'
import "../../../Assets/icons/css/paymentSent.scss";
import { Container, Row, Card, Col, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import logo from "../../../Assets/images/realizdea.png";
import AOS from "aos";

//action
import { postAdminPayment } from "../../../reduxthunk/actions/paymentSentAction";
import { getWinner } from "../../../reduxthunk/actions/getWinnerActions";
import { getContestDetail } from "../../../reduxthunk/actions/getContestDetailActions";
import {getPaymentStatus} from '../../../reduxthunk/actions/getPaymentStatusActions';

function PaymentSent(props) {

  const dispatch = useDispatch();
  const [isUploaded, setIsUploaded] = useState(false);
  // data winner
  const dataWinner = useSelector((state) => state.getWinner.dataJson);
  const loadingWinner = useSelector((state) => state.getWinner.loading);
  // data contest detail
  const dataContest = useSelector((state) => state.getContestDetail.dataJson);
  const loadingContest = useSelector((state) => state.getContestDetail.loading);
  // data post admin payment
  const data = useSelector((state) => state.postAdminPayment.dataJson);
  const errors = useSelector((state) => state.postAdminPayment.error);
  const loadingPayment = useSelector((state) => state.postAdminPayment.loading);
  // data payment status
  const dataStatus = useSelector(state => state.getPaymentStatus.dataJson);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getWinner(id));
    dispatch(getContestDetail(id));
    dispatch(getPaymentStatus(id));
  }, []);

  const [evidence, setEvidence] = useState({
    evidence: null,
  });

  const handleEvidence = (e) => {
    setEvidence({
      evidence: e.target.files[0],
    });
  };

  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("evidence", evidence.evidence);
    console.log("ini form data", formData);
    dispatch(postAdminPayment(formData, id, dataWinner.id_winner));
    setIsUploaded(true);
  };

  if(data) {
    window.location.reload();
  }

  let errorEvidence;
  if (errors) {
    errorEvidence = errors.evidence.msg;
  }

  console.log("ini errors", errors);
  console.log('STATUS', dataStatus);

  // let btn_class = input.green === true ? "button-winner" : "winner-sent";
  let form_class = data ? "sorrow" : "display-none";
  //Aos scroll animation
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div className="providerContestDetail">
      <Container className="contestDetail" style={{ minHeight: "750px" }}>
        {loadingContest || loadingWinner ? (
          <div className="loadingLogo">
            <img src={logo} />
          </div>
          ) : (
          <div>
            <Row>
              <Col data-aos="fade-in"
                sm="12"
                md={{ size: 8, offset: 2 }}
                className="contestTemplate"
              >
                <div className='posterContainer'>
                  <div>
                    <a href='#modalPoster'><img src={dataContest ? 'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${dataContest.poster}` : null} alt='Contest Poster' className='contestPoster' /></a>
                  </div>
                  <div>
                    <h1>{dataContest ? dataContest.title : null}</h1>
                    <h6>
                      Status:{" "}
                      <b>
                        {dataContest
                          ? dataContest.status
                            ? dataContest.status.status
                            : null
                          : null}
                      </b>
                    </h6>
                    <h6>
                      Winner Prize: <b>{dataContest ? dataContest.prize : null}</b>
                    </h6>
                    <h6>
                      Due Date: <b>{dataContest ? dataContest.due_date : null}</b>
                    </h6>
                    <h6>
                      Announcement:{" "}
                      <b>{dataContest ? dataContest.announcement : null}</b>
                    </h6>
                  </div>
                </div>
                <p>{dataContest ? dataContest.description : null}</p>
              </Col>
            </Row>
            {dataWinner ? (
              <div>
                <Row>
                  <Col data-aos="fade-up"
                    sm="12"
                    md={{ size: 8, offset: 2 }}
                    className="winner-info"
                  >
                    <h1>Winner</h1>
                    <div className="winner-info-child">
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "20px",
                          marginBottom: "0",
                        }}
                      >
                        {dataWinner
                          ? dataWinner.user
                            ? dataWinner.user.winner
                            : null
                          : null}
                      </p>
                      <h6>
                        Bank:{" "}
                        <b>
                          {
                            (dataWinner
                              ? dataWinner.user
                                ? dataWinner.user.bank
                                : null
                              : null,
                            " ",
                            dataWinner
                              ? dataWinner.user
                                ? dataWinner.user.account_number
                                : null
                              : null)
                          }{" "}
                        </b>
                      </h6>
                      <h6>
                        Amount: <b>{dataContest ? dataContest.prize : null}</b>
                      </h6>
                    </div>


                    <div data-aos="fade-in" className="row">
                      {dataStatus ? dataStatus.status_winner_payment === 'Paid' ? (
                        <div className='payment'>
                          <p>Payment Sent</p>
                        </div>
                      ) : (
                        <div className="col-sm-12 text-center ">
                          <p style={{ fontWeight: "700", color:'#212529', textAlign:'center', paddingBottom:'20px !important', marginTop:'30px' }}>
                            Upload payment evidences
                          </p>
                          <form style={{display:'flex',marginTop:'20px !important', padding:'0 20px'}}>
                            <input
                              type="file"
                              className="custom-file-input"
                              id="validatedCustomFile"
                              required
                              onChange={handleEvidence}
                            />
                            <label
                              className="custom-file-label input-admin-payment"
                              for="validatedCustomFile"
                              style={{margin:'70px auto', width:'100%'}}
                            >
                              Choose file...
                            </label>
                          </form>
                          <p className={errorEvidence ? "errorText" : "errorTextNo"}>{errorEvidence ? errorEvidence : 'File must be jpg, jpeg, or png with maximum size of 2MB.'}</p>

                          <button
                            className="button-winner"
                            onClick={submit}
                            style={{ width: "150px", height: "40px", cursor:`${loadingPayment ? 'not-allowed' : 'pointer'}` }}
                            disabled={loadingPayment ? 'true' : ''}
                            title='Upload Payment Evidence'
                          >
                            {loadingPayment ? (
                              <Spinner size="sm" color="light" />
                            ) : (
                              "Upload"
                            )}
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </div>
            ) : (
              <h2 data-aos="fade-up" className="errorPaymentSent">
                This contest doesn't have a winner yet.
              </h2>
            )}
          </div>
        )}
      </Container>
      <div id='modalPoster' className='modalPoster'>
        <a href='#'><i className="fas fa-times-circle"></i></a>
        <img src={dataContest ? 'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${dataContest.poster}` : null} alt='Contest Poster' className='modalPosterContent' />
      </div>
    </div>
  );
}

export default PaymentSent;
