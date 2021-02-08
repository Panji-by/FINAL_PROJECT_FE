import React, {useState, useEffect} from 'react';
import { Link, Redirect, Switch, Route } from "react-router-dom";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import './provider.css';

// components
import Navbar from './Components/Navbar';
import Contest from './Components/Contest';
import CreateContest from './Components/CreateContest';
import ContestDetailOpen from './Components/ContestDetailOpen';
import ContestDetailPayment from './Components/ContestDetailPayment';
import PaymentSubmissions from './Components/PaymentSubmissions';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
import Search from './Components/Search';
import ContestDetail from './Components/ContestDetail';

// actions


function Provider(props) {

  // get role
  let role;
  if(props.token !== null) {
    role = JSON.parse(atob(props.token.split('.')[1])).user.id_role;
  }
  // get role ends

  return (
    <div>
      {role === 1 ? <Redirect to='/admin/dashboard' /> : role === 2 ? null : role === 3 ? <Redirect to='/participant/search' /> : <Redirect to='/' />}
      <Navbar />
      <Switch>
        <Route path="/provider/profile">
          <Profile />
        </Route>
        <Route path="/provider/contest/create">
          <CreateContest />
        </Route>
        <Route path="/provider/contest/waitpayment/:contest">
          <ContestDetailPayment />
        </Route>
        <Route path="/provider/contest/paymentsubmissions/:contest">
          <PaymentSubmissions />
        </Route>
        <Route path="/provider/contest/detail/:detail">
          <ContestDetailOpen />
        </Route>
        <Route path="/provider/detail/:detail">
          <ContestDetail />
        </Route>
        <Route path="/provider/contest">
          <Contest />
        </Route>
        <Route path="/provider/search">
          <Search />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({});
  return {
    ...actions, dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Provider);