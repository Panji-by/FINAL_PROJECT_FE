import React, {useState, useEffect} from 'react';
import { Link, Redirect, useParams } from "react-router-dom";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import logo from '../../../Assets/images/realizdea.png';
import Cookies from 'js-cookie';

// actions
import {logout} from '../../../reduxthunk/actions/authActions';

function NavbarPage(props) {

  // navbar
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // navbar ends

  // tabs
  let {participant} = useParams();
  // console.log(participant, 'PARAMS GOT');
  const activeStyle = {
    color: '#8FBD4B',
    borderBottom: '2px solid #8FBD4B'
  }
  // tabs ends

  // sign out
  const handleSignOut = () => {
    props.dispatch(logout());
    // Cookies.remove('token');
    // localStorage.clear();
  }
  // console.log(localStorage.getItem('token'), 'LOCAL');
  // sign out ends

  return (
    <div>
      <Navbar light expand="md" className='navbarParticipant'>
        <NavbarBrand href="/participant/search" title='Search Contest Page'>
          <img src={logo} className='logo' />
          <span>RealizDea</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                style={participant === 'contest' ? activeStyle : null}
                href="/participant/contest"
                title='My Contest Page'
              >My Contest</NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/participant/profile"
                style={participant === 'profile' ? activeStyle : null}
                title='Profile Page'
              >Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href='/'
                onClick={handleSignOut}
                title='Log Out'
              >Log Out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({logout});
  return {
    ...actions, dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (NavbarPage);