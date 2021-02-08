import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import "../../Assets/styles/login.scss";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies, { set } from "js-cookie";
import "../../Assets/styles/login.scss";
import AOS from "aos";
import logo from '../../Assets/images/realizdea.png';
import errorImage from '../../Assets/images/error.svg';

// actions
import { login } from "../../reduxthunk/actions/authActions";
import {toggleModal} from '../../reduxthunk/actions/authActions';

function LoginPage(props) {

  // sign in thunk
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, "EMAIL");
  console.log(password, "PASS");

  const handleSubmitSignin = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    dispatch(login(user));
    // setPatokan(true);
  };
  // sign in thunk ends

  //Aos scroll animation
  useEffect(() => {
    AOS.init({ duration: 750 });
  }, []);

  // get token,role, and errors
  const isLoading = useSelector(state => state.auth.isLoading);
  const token = useSelector(state => state.auth.token);
  const modalError = useSelector(state => state.auth.modalError);
  let error = props.error.msg.message;
  let errorEmail, errorPass;
  if(props.error.msg.errors !== undefined) {
    if(props.error.msg.errors.email !== undefined) {
      errorEmail = props.error.msg.errors.email.msg;
    }
    if(props.error.msg.errors.password !== undefined) {
      errorPass = props.error.msg.errors.password.msg;
    }
  }
  let role;
  if(token !== null) {
    role = JSON.parse(atob(token.split('.')[1])).user.id_role;
  };
  // get token,role, and errors ends

  // form validation
  let emailRegex = /^\w\w*@\w\w*\.[a-z][a-z][a-z]*$/i;
  let emailTest = emailRegex.test(email);
  const [showPass, setShowPass] = useState('password');
  // form validation ends
  
  // console.log('ERROR PASS', error);
  // console.log('ERROR EMAIL', errorEmail);
  // console.log('MODAL ERROR', modalError);
  console.log(showPass, 'SHOW PASS');

  return (
    <div>
      <div data-aos="fade-right">
        {token ? <Redirect to={role === 3 ? '/participant/search' : role === 2 ? '/provider/search' : '/admin/dashboard'} /> : null}
        {/* <button onClick={toggle}>COBA</button> */}
        <Form className="form-center form-login" onSubmit={handleSubmitSignin}>
          <div style={{display:'flex', marginBottom:'25px'}}>
            <Link to='/'>
              <img src={logo} className='logoLogin' alt='RealizDea' title='Home'/>
            </Link>
            <h1 className='joinTitle' style={{cursor:'auto'}}>Sign in to your account</h1>
          </div>
          <FormGroup name="form">
            <div
              className={
                "form-group"
              }
            >
              <Label for="email">Email</Label>
                <div style={{position:'relative'}}>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    required="required"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={emailTest || email === '' ? null : 'errorLogin'}
                  />
                  {emailTest || email === '' ? null : <i className="fas fa-times-circle"></i>}
                  {emailTest && email !== '' ? <i style={{color:'#8FBD4B'}} className="fas fa-check-circle"></i> : null}
                </div>
              <FontAwesomeIcon className="errspan" icon={faEnvelope} />
              <p className={emailTest || email === '' ? 'errorAnimateGone' : 'errorAnimateShow'}>
                Input is not a valid e-mail!
              </p>
            </div>
          </FormGroup>
          <FormGroup name="form">
            <div
              className={
                "form-group"
              }
            >
              <Label for="password">Password</Label>
              <div style={{position:'relative'}}>
                <Input
                  type={showPass}
                  name='password'
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className={password.length > 7 || password === '' ? null : 'errorLogin'}
                />
                {password.length > 7 || password === '' ? null : <i className="fas fa-times-circle"></i>}
                {password.length > 7 && password !== '' ? <i style={{color:'#8FBD4B'}} className="fas fa-check-circle"></i> : null}
                {showPass === 'password' ? <i className="far fa-eye-slash eyeIcon" onClick={() => setShowPass('text')} title='Show Password'></i> : <i class="far fa-eye eyeIcon" onClick={() => setShowPass('password')} style={{right:'29px'}} title='Hide Password'></i>}
              </div>
              <FontAwesomeIcon className="errspan" icon={faUnlock} />
              <p className={password.length > 7 || password === '' ? 'errorAnimateGone' : 'errorAnimateShow'}>
                Password must be at least 8 characters!
              </p>
            </div>
          </FormGroup>
          <div>
            <Button color="light" className='loginButton' disabled={isLoading ? 'true' : ''} style={{cursor:`${isLoading ? 'not-allowed' : 'pointer'}`}} title='Sign In'>
              {isLoading ? <Spinner size="sm" color="secondary" /> : <b>Sign In</b>}
            </Button>
          </div>
          <p>
            Don't have an account? <a href="/join" title='Join'>Join here</a>
          </p>
        </Form>
      </div>
      {modalError ? (
        <div className='modalError'>
          <div className='errorBody'>
            <p style={{margin:'0'}}>Hmmm...</p>
            {errorEmail ? (
              <p>I think you mispelled your <b>email</b>.</p>
            ) : errorPass ? (
              <p>You have to make your <b>password</b> longer.</p>
            ) : (
              <p>Your <b>password</b> is incorrect, did you forget?</p>
            )}
            <img src={errorImage} alt='Error Image' />
            <button onClick={() => dispatch(toggleModal())}>OK</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.error
  };
};

export default connect(mapStateToProps)(LoginPage);