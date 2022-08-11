import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarToggler, NavbarText, NavLink } from 'reactstrap';
import { Link, Outlet } from 'react-router-dom';

const Navigation = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    window.open(`${process.env.REACT_APP_BACKEND_DOMAIN}/auth/logout`, '_self');
  };

  return (
    <>
      <Navbar color='dark' dark expand>
        <Link className='navbar-brand' to='/'>LMS</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className='d-flex flex-grow-1'>
              {user ? (
                <>
                  {user.superAdmin ? (
                    <>
                      <Link className='nav-link' to='/users'>Users</Link>
                      <Link className='nav-link' to='/schools'>Schools</Link>
                    </>
                  ) : (
                    <></>
                  )}

                  {user.schoolAdmin ? (
                    <>
                      <Link className='nav-link' to={`/schools/${user.school.id}/users`}>School Users</Link>
                      <Link className='nav-link' to={`/schools/${user.school.id}/courses`}>Courses</Link>
                    </>
                  ) : (
                    <></>
                  )}

                  {user.teacher ? (
                    <>
                      <Link className='nav-link' to={`/teachers/${user.teacher.id}/courses`}>My Courses</Link>
                    </>
                  ) : (
                    <></>
                  )}

                  {user.student ? (
                    <>
                      <Link className='nav-link' to={`/students/${user.student.id}/courses`}>My Courses</Link>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className='d-flex ms-auto'>
                    {user.picture ? (
                      <>
                        <img src={user.picture} className='rounded ms-auto' height={40} alt={user.name}/>
                        &nbsp;
                      </>
                    ) : (
                      <></>
                    )}
                    <NavbarText>{user.name}{user.school ? (' (' + user.school.name + ')') : ''}</NavbarText>
                    <NavLink href='#' onClick={logout}>Logout</NavLink>
                  </div>
                </>
              ) : (
                <Link className='nav-link ms-auto' to='/login'>Login</Link>
              )}
          </Nav>
        </Collapse>
      </Navbar>

      <Outlet/>
    </>
  );
};

export default Navigation;
