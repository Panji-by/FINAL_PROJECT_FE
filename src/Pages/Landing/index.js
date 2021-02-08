import react, {useState} from 'react'
import { connect } from "react-redux";
import Navbar from './header';
import Landing from './landingPage';
import Search from './Search';
import About from './about'
import Footer from './Footer';
import { Link, Redirect, useParams, Switch, Route } from "react-router-dom";
import '../../Assets/styles/landing-Page.scss';

function App(props) {

  // get role
  let role;
  if(props.token !== null) {
    role = JSON.parse(atob(props.token.split('.')[1])).user.id_role;
  }
  // get role ends

  // scroll
  const [scroll, setScroll] = useState(false);
  const myFunc = () => {
    setScroll(true);
  }
  console.log(scroll, 'LOOK')
  // scroll ends

  return (
    <div className='landingPage' onScroll={myFunc}>
      {props.token ? <Redirect to={role === 3 ? '/participant/search' : role === 2 ? '/provider/contest' : '/admin/dashboard'} /> : null}
      <Navbar />
      <Switch>
        <Route path="/search/:input">
          <Search />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(App);