import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import logo from '../../Assets/images/realizdea.png';
import errorImage from '../../Assets/images/error.svg';

// css
import '../../Assets/icons/css/register.scss'
import '../../Assets/styles/login.scss'

//font awesome
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import '../../Assets/styles/login.scss'
import { connect, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Spinner } from "reactstrap";
import AOS from "aos";

// actions
import {register} from '../../reduxthunk/actions/authActions';
import {toggleModal} from '../../reduxthunk/actions/authActions';

const RegisterPage = (props) => {

  // sign up thunk
  const [state, setState] = useState({
    name: '',
    email: '',
    pass: '',
    passConfirm: '',
    role: null
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmitSignup = (e) => {
    e.preventDefault();
    const newUser = {
      fullname: state.name,
      email: state.email,
      password: state.pass,
      passwordConfirmation: state.passConfirm,
      role: state.role
    }
    props.register(newUser);
  };

  console.log(state.name, 'FULLNAME');
  console.log(state.email, 'EMAIL');
  console.log(state.pass, 'PASS');
  console.log(state.passConfirm, 'PASS CONFIRM');
  console.log(state.role, 'ROLE');
  // sign up thunk ends

  //Aos scroll animation
  useEffect(() => {
    AOS.init({ duration: 750 });
  }, []);

  // get token, and errors
  const isLoading = useSelector(state => state.auth.isLoading);
  const modalError = useSelector(state => state.auth.modalError);
  let token = props.token;
  let errorName, errorEmail, errorPass, errorPassConfirm;
  if(props.error.msg.errors !== undefined) {
    if(props.error.msg.errors.email !== undefined) {
      errorEmail = props.error.msg.errors.email.msg;
    }
    if(props.error.msg.errors.password !== undefined) {
      errorPass = props.error.msg.errors.password.msg;
    }
    if(props.error.msg.errors.passwordConfirmation !== undefined) {
      errorPassConfirm = props.error.msg.errors.passwordConfirmation.msg;
    }
    if(props.error.msg.errors.fullname !== undefined) {
      errorName = props.error.msg.errors.fullname.msg;
    }
  }
  let role;
  if(props.token !== null) {
    role = JSON.parse(atob(props.token.split('.')[1])).user.id_role;
  }
  // get token, and errors ends

  // form validation
  let emailRegex = /^\w\w*@\w\w*\.[a-z][a-z][a-z]*$/i;
  let emailTest = emailRegex.test(state.email);
  let nameRegex = /\d/gi;
  let nameTest = nameRegex.test(state.name);
  console.log(nameTest, 'LOOK');

  const showErrorIcon = (test, state) => {
    return (
      <div>
        {test || state === '' ? null : <i className="fas fa-times-circle"></i>}
        {test && state !== '' ? <i style={{color:'#8FBD4B'}} class="fas fa-check-circle"></i> : null}
      </div>
    );
  }
  // form validation ends

  return (
    <div>
      <div className='sidePage'>
        {token ? <Redirect to={role === 3 ? '/participant/search' : role === 2 ? '/provider/search' : '/admin/dashboard'} /> : null}
        <Form className="form-center" onSubmit={handleSubmitSignup}>
          <div style={{display:'flex', marginBottom:'25px'}}>
            <Link to='/'>
              <img src={logo} className='logoLogin' title='Home'/>
            </Link>
            <h1 className='joinTitle' style={{cursor:'auto'}}>Create an account</h1>
          </div>
          <FormGroup className='form-group join-group'>
            <Label for="name">Full Name</Label>
            <div>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
                className={!nameTest || state.name === '' ? null : 'errorLogin'}
              />
              {showErrorIcon(!nameTest, state.name)}
            </div>
            <FontAwesomeIcon className="errspan" icon={faUserCheck} />
            <p className={!nameTest || state.name === '' ? 'errorAnimateGone' : 'errorAnimateShow'}>
              Full name must be alphabet only.
            </p>
          </FormGroup>
          <FormGroup className='form-group join-group'>
            <Label for="email">Email</Label>
            <div>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                className={emailTest || state.email === '' ? null : 'errorLogin'}
              />
              {showErrorIcon(emailTest, state.email)}
            </div>
            <FontAwesomeIcon className="errspan" icon={faEnvelope} />
            <p className={emailTest || state.email === '' ? 'errorAnimateGone' : 'errorAnimateShow'}>
              Input is not a valid e-mail!
            </p>
          </FormGroup>
          <FormGroup className='form-group join-group'>
            <Label for="pass">Password</Label>
            <div>
              <Input
                type="password"
                name="pass"
                id="pass"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className={state.pass.length > 7 || state.pass === '' ? null : 'errorLogin'}
              />
            </div>
            {showErrorIcon(state.pass.length > 7, state.pass)}
            <FontAwesomeIcon className="errspan" icon={faUnlock} />
            <p className={state.pass.length > 7 || state.pass === '' ? 'errorAnimateGone' : 'errorAnimateShow'}>
              Password must be at least 8 characters!
            </p>
          </FormGroup>
          <FormGroup data-aos="fade-right" className='form-group join-group'>
            <Label for="passConfirm">Confirm Password</Label>
            <div>
              <Input
                type="password"
                name="passConfirm"
                id="passConfirm"
                placeholder="Confirm your password"
                onChange={handleChange}
                required
                className={state.passConfirm === state.pass || state.passConfirm === '' ? null : 'errorLogin'}
              />
              {showErrorIcon(state.passConfirm === state.pass, state.passConfirm)}
            </div>
            <FontAwesomeIcon className="errspan" icon={faUnlock} />
            <p className={state.passConfirm === state.pass || state.passConfirm === '' ? 'errorAnimateGone' : 'errorAnimateShow'}>
              Password confirmation does not match!
            </p>
          </FormGroup>
          <h5 className='joinus'>Join As</h5>
          <FormGroup data-aos="fade-right" check >
            <Label check className="radioCenter radio1" style={{cursor:'pointer'}} title='Join as Provider'>
              <Input
                value='2'
                type="radio"
                name="role"
                onChange={handleChange}
                required
                style={{cursor:'pointer'}}
              /> Provider
            </Label>
            <Label check className="radioCenter radio2" style={{cursor:'pointer'}} title='Join as Participant'>
              <Input
                value='3'
                type="radio"
                name="role"
                onChange={handleChange}
                required
                style={{cursor:'pointer'}}
              /> Participant
            </Label>
          </FormGroup>
          <Button color="light" className='loginButton' disabled={isLoading ? 'true' : ''} style={{cursor:`${isLoading ? 'not-allowed' : 'pointer'}`}} title='Join'>
            {isLoading ? <Spinner size="sm" color="secondary" /> : <b>Join</b>}
          </Button>
          <p>Already have an account? <a href="/signin" title='Sign In'>Sign In</a></p>
        </Form>
      </div>
      {modalError ? (
        <div className='modalError'>
          <div className='errorBody'>
            <p style={{margin:'0'}}>Hmmm...</p>
            {errorName ? (
              <p>You have <b>number</b> in your name? Suspicious.</p>
            ) : errorEmail ? (
              <p>That <b>email</b> was taken, try another one.</p>
            ) : errorPass ? (
              <p>You have to make your <b>password</b> longer.</p>
            ) : (
              <p>Password confirmation isn't match, try again.</p>
            )}
            <img src={errorImage} alt='Error Image' />
            <button onClick={() => props.toggleModal()}>OK</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    token: state.auth.token
  };
};

export default connect(mapStateToProps, {register, toggleModal})(RegisterPage);