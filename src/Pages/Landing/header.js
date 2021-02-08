import React, { useState } from 'react';
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
  NavbarText,
  Button
} from 'reactstrap';
import logo from '../../Assets/images/realizdea.png'

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" className='navbarParticipant'>
        <NavbarBrand href="/" title='RealizDea'>
          <img src={logo} className='logo' />
          <span>RealizDea</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                href="/signin"
                title='Sign In'
              >Sign In</NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                href="/join"
                title='Join'
                className='joinButton'
              ><button className='joinButton'>Join</button></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;
