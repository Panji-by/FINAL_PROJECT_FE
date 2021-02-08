import React, {useState, useEffect} from 'react';
import { Link, Redirect, Switch, Route } from "react-router-dom";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import './participant.css';

// components
import Navbar from './Components/Navbar';
import Contest from './Components/Contest';
import ContestDetail from './Components/ContestDetail';
import ContestSubmissions from './Components/ContestSubmissions';
import ContestWinner from './Components/ContestWinner';
import Profile from './Components/Profile';
import Search from './Components/Search';
import Footer from './Components/Footer'


// actions


function Participant(props) {

  // get role
  let role;
  if(props.token !== null) {
    role = JSON.parse(atob(props.token.split('.')[1])).user.id_role;
  }
  // get role ends
  console.log(role, typeof role, 'ROLE PARTICIPANT')

  return (
    <div>
      {role === 1 ? <Redirect to='/admin/dashboard' /> : role === 2 ? <Redirect to='/provider/contest' /> : role === 3 ? null : <Redirect to='/' />}
			<Navbar />
      <Switch>
        <Route path="/participant/contest/winner/:winner">
          <ContestWinner />
        </Route>
        <Route path="/participant/contest/submissions/:submissions">
          <ContestSubmissions />
        </Route>
        <Route path="/participant/contest/detail/:detail">
          <ContestDetail />
        </Route>
        <Route path="/participant/contest">
          <Contest />
        </Route>
        <Route path="/participant/profile">
          <Profile />
        </Route>
        <Route path="/participant/search">
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

export default connect(mapStateToProps, mapDispatchToProps) (Participant);