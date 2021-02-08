import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Container,
  Col,
  Row,
  Spinner,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "./saras.css";
import Assetsfoto from "../../../AssetsSaras/orang.jpg";
import { useDispatch, useSelector } from "react-redux";
import logo from '../../../Assets/images/realizdea.png';
import AOS from 'aos';

// actions
import {
  getJsonProfile,
  patchProfile,
} from "../../../reduxthunk/actions/getProfile";

function Profile(props) {

  // const [update, setUpdate] = useState(false); 

  const dispatch = useDispatch();
  // data get profile
  const jsonData = useSelector((state) => state.getProfile.dataJson);
  const loadingGet = useSelector((state) => state.getProfile.loading);
  // data patch profile
  const errorPatch = useSelector(state => state.patchProfile.error);
  const dataPatch = useSelector(state => state.patchProfile.dataJson);
  const loading = useSelector(state => state.patchProfile.loading);

  const [input, setInput] = useState({
    account_number: '',
    bank: '',
    firstname: "",
    lastname: "",
    location: ''
  });
  const [picture, setPicture] = useState({
    picture: null
  });

  let formData = new FormData();
  formData.append("picture", picture.picture);
  formData.append("firstname", input.firstname);
  formData.append("lastname", input.lastname);
  formData.append("location", input.location);
  formData.append("account_number", input.account_number);
  formData.append("bank", input.bank);

  const handleChange = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handlePicture = (e) => {
    setPicture({
      picture: e.target.files[0]
    });
  };
  if(picture.picture) {
    dispatch(patchProfile(formData, JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user.id));
    setPicture({
      picture: null
    })
  }

  const [submitted, setSubmited] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    dispatch(patchProfile(formData, JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user.id));
    setSubmited(!submitted);
  }
  if(dataPatch) {
    window.location.reload();
  }
  // console.log(update, 'LOOK')
  // const updateData = useSelector(state => state.patchProfile.dataJson);;
  // console.log(updateData, 'UPDATED')

  // get error
  let errorAccount, errorImage;
  if(errorPatch) {
    if(errorPatch.account_number) {
      errorAccount = errorPatch.account_number.msg;
    }
    if(errorPatch.picture) {
      errorImage = errorPatch.picture.msg
    }
  }
  console.log(submitted, 'SUBMIT')
  console.log(errorAccount, 'ERROR ACCOUNT')
  console.log(errorImage, 'ERROR IMAGE')
  // get error ends

  useEffect(() => {
    dispatch(getJsonProfile());
    AOS.init({ duration: 500 });
  }, [submitted]);

  return (
    <>
      <Container className="formTemplate" style={{minHeight:'750px'}} data-aos='fade'>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <form>
              {loadingGet || loading ? (
                <div className='noPP'>
                  <div className='qCircle-top-left'></div>
                  <div className='qCircle-top-right'></div>
                  <div className='qCircle-bottom-left'></div>
                  <div className='qCircle-bottom-right'></div>
                </div>
              ) : (
                <div className="profilePicture" title='Change Profile Picture'>
                  <img src={'https://api.allorigins.win/raw?url='+`http://13.228.25.124:3000${jsonData.picture}`} className={errorImage ? 'errorImage' : null}/>
                  <label for="changePP">
                    <i class="fas fa-camera"></i>
                    <br />
                    Change Profile Picture
                  </label>
                  <input type="file" id="changePP" name="changePP"  onChange={handlePicture}/>
                  <p className='errorText' style={{textAlign: 'center'}}>{errorImage ? errorImage : null}</p>
                </div>
              )}
              <div className="inputContainer">
                <div>
                  <label for="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstname"
                    placeholder={jsonData.firstname}
                    value={input.firstname}
                    onChange={(e) => handleChange("firstname", e.target.value)}
                  />
                </div>
                <div>
                  <label for="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastname"
                    placeholder={jsonData.lastname}
                    value={input.lastname}
                    onChange={(e) => handleChange("lastname", e.target.value)}
                  />
                </div>
                <div className="location">
                  <label for="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder={jsonData.location}
                    value={input.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                </div>
                <div>
                  <label for="bank">Bank</label>
                  <input
                    type="text"
                    id="bank"
                    name="bank"
                    placeholder={jsonData.bank}
                    value={input.bank}
                    onChange={(e) => handleChange("bank", e.target.value)}
                  />
                </div>
                <div>
                  <label for="account">Account Number</label>
                  <input
                    type="number"
                    id="account"
                    name="account_number"
                    placeholder={jsonData.account_number}
                    value={input.account_number}
                    onChange={(e) => handleChange("account_number", e.target.value)}
                    className={errorAccount ? 'errorInput' : null}
                  />
                  <p className='errorText'>{errorAccount}</p>
                </div>
              </div>
              {/* <div style={{height:'25px', marginBottom:'0'}}>
                {dataPatch ? <p className='success'><i class="fas fa-check-circle"></i>success updating your profile</p> : null}
              </div> */}
              <button className="button" onClick={submit} disabled={loading ? 'true' : ''} style={{cursor:`${loading ? 'not-allowed' : 'pointer'}`, backgroundColor:`${loading ? '#A8CC74' : '#8FBD4B'}`}} title='Update Profile'>
                {loading ? <Spinner size="sm" color="light" className='spinner'/> : 'Update'}
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({});
  return {
    ...actions,
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
