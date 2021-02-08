import React, {useState, useEffect} from 'react';
import { Link, Redirect, Switch, Route } from "react-router-dom";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import './admin.css';

// components
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import PaymentConfirmation from './Components/PaymentConfirmation';
import PaymentSent from './Components/PaymentSent';
import Footer from './Components/Footer';

// actions


function Admin(props) {

  // get role
  let role;
  if(props.token !== null) {
    role = JSON.parse(atob(props.token.split('.')[1])).user.id_role;
  }
  // get role ends

  return (
    <div>
      {role === 1 ? null : role === 2 ? <Redirect to='/provider/contest' /> : role === 3 ? <Redirect to='/participant/search' /> : <Redirect to='/' />}
			<Navbar />
      <Switch>
        <Route path="/admin/dashboard/contest/:id">
          <PaymentSent />
        </Route>
        <Route path="/admin/dashboard/payment/:id">
          <PaymentConfirmation />
        </Route>
        <Route path="/admin/dashboard">
          <Dashboard />
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

export default connect(mapStateToProps, mapDispatchToProps) (Admin);