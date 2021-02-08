import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import {Provider} from 'react-redux';

// import components
import LandingPage from './Pages/Landing/index';
import SignIn from './Pages/Signin/index';
import Join from './Pages/Register/index';
import Participant from './Pages/Participant/index';
import ProviderPage from './Pages/Provider/index';
import Admin from './Pages/Admin/index';

// import css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/icons/css/all.min.css';

// import redux
import store from './reduxthunk/store';

function App() {
  
  return (
    <div className='container1'>
      <Provider store={store}>
        <Switch>
          <Route path="/admin/:admin">
            <Admin />
          </Route>
          <Route path="/provider/:provider">
            <ProviderPage />
          </Route>
          <Route path="/participant/:participant">
            <Participant />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
