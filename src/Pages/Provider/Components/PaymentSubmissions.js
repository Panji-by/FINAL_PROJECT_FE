import React, {useState, useEffect} from 'react';
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import {connect, useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Container, Row, Col, Spinner, Button} from 'reactstrap';
import AOS from 'aos';

// actions
import {getContestDetail} from '../../../reduxthunk/actions/getContestDetailActions';
import {postPaymentProvider} from '../../../reduxthunk/actions/postPaymentProviderActions';

function PaymentSubmissions(props) {

  const dispatch = useDispatch();
  let history = useHistory();
  let {contest} = useParams();
  const dataDetail = useSelector(state => state.getContestDetail.dataJson);
  console.log(dataDetail, 'GOT IT');

  useEffect(() => {
    dispatch(getContestDetail(contest));
    AOS.init({ duration: 500 });
  }, []);

  // post payment
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [evidence, setEvidence] = useState(null);
  // const data = {
  //   bank_provider: bank,
  //   account_number_provider: account,
  //   evidence: evidence
  // }
  // console.log(data, 'INPUT');
  const dataPayment = useSelector(state => state.postPaymentProvider.dataJson);
  const loading = useSelector(state => state.postPaymentProvider.loading);
  const error = useSelector(state => state.postPaymentProvider.error);
  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('bank_provider', bank);
    formData.append('account_number_provider', account);
    formData.append('evidence', evidence);
    console.log(formData, 'DATA');
    dispatch(postPaymentProvider(contest, JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user.id, formData))
  }
  if(dataPayment) {
    // history.push(`/provider/contest/waitpayment/${contest}`);
    // history.push(`/provider/contest`);
  }
  // post payment ends

  // error
  let errorMain, errorBank, errorAccount, errorImage;
  if(error) {
    if(error.id_contest) {
      errorMain = error.id_contest.msg;
    }
    if(error.bank_provider) {
      errorBank = error.bank_provider.msg;
    }
    if(error.account_number_provider) {
      errorAccount = error.account_number_provider.msg;
    }
    if(error.evidence) {
      errorImage = error.evidence.msg
    }
  }
  // error ends

  return (
    <div>
      <Container className='formTemplate' style={{minHeight:'750px'}} data-aos='fade'>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <h1>Payment Submission</h1>
            <p>Amount to transfer: <b>{dataDetail? dataDetail.prize : null}</b></p>
            <form>
              <div className='inputContainer'>
                <div>
                  <label for='bank'>Bank</label>
                  <input type='text' id='bank' name='bank' placeholder='Bank' onChange={e => setBank(e.target.value)} className={errorBank ? 'errorInput' : null}/>
                  <p className='errorText'>{errorBank ? errorBank : null}</p>
                </div>
                <div>
                  <label for='account'>Account Number</label>
                  <input type='number' id='account' name='account' placeholder='1234567890'  onChange={e => setAccount(e.target.value)} className={errorAccount ? 'errorInput' : null}/>
                  <p className='errorText'>{errorAccount ? errorAccount : null}</p>
                </div>
                <div>
                  <label for='evidence'>Upload payment evidence</label>
                  <input type='file' id='evidence' name='evidence'  onChange={e => setEvidence(e.target.files[0])} className={errorImage ? 'errorInput' : null}/>
                  <p className={errorImage ? 'errorText' : 'errorTextNo'}>{errorImage ? errorImage : 'File must be jpg, jpeg, or png with maximum size of 2MB.'}</p>
                </div>
              </div>
              <p className='errorText errorPaymentSubmission'>{errorMain ? errorMain : null}</p>
              <button className='button' onClick={submit} disabled={loading ? 'true' : ''} style={{cursor:`${loading ? 'not-allowed' : 'pointer'}`, backgroundColor:`${loading ? '#A8CC74' : '#8FBD4B'}`, marginBottom:'0',marginTop:'30px'}} title='Submit Payment Evidence'>
                {loading ? <Spinner size="sm" color="light" className='spinner'/> : 'Submit'}
              </button>
              <div style={{height:'70px', margin:'10px 0 -20px'}}>
                {dataPayment ? <p className='success'><i class="fas fa-check-circle"></i>success submit your payment<br/>wait until your payment approved by admin and your contest will be opened</p> : null}
              </div>
            </form>
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

export default connect(mapStateToProps, mapDispatchToProps) (PaymentSubmissions);