import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavbarText, NavLink } from 'reactstrap';
import { Link, Outlet } from 'react-router-dom';

const Navigation = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    window.open(`${process.env.REACT_APP_BACKEND_DOMAIN}/auth/logout`, '_self');
  };

  return (
    <>
      <Navbar color='dark' dark={true} expand={true}>
        <Link className='navbar-brand' to='/'>LMS</Link>
        <NavbarToggler onClick={toggle}/>
        <Collapse className='justify-content-end' isOpen={isOpen} navbar>
          <Nav navbar>
            {user ? (
              <>
                {user.picture ? (
                  <>
                    <img src={user.picture} className='rounded' height={40} alt={user.name}/>
                    &nbsp;
                  </>
                ) : (
                  <></>
                )}
                <NavbarText>{user.name}</NavbarText>
                <NavItem>
                  <NavLink href='#' onClick={logout}>Logout</NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem><Link className='nav-link' to='/login'>Login</Link></NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Outlet/>
    </>
  );
};

export default Navigation;
