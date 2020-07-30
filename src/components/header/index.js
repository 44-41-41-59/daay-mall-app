import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import { Link, useHistory } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import Show from '../show';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth';

import './header.css';

//  (REPLACE WITH DROPDOWN instead of an image and a dropdown next to it)

export default function Header(props) {
  const history = useHistory();
  const logedin = useSelector((state) => state.user.logedin);
  const dispatch = useDispatch();
  function handelLogout() {
    dispatch(logout(history));
  }
  return (
    <header>
      <Navbar bg="light" expand="lg" id="header">
        <div id="logoImg">
          <Link to="/">
            <Navbar.Brand>
              <MDBIcon icon="weight-hanging" id="logoIcon" />
              DAAY-mall
            </Navbar.Brand>
          </Link>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div class="form-group has-search" id="searchFormHeader">
            <span
              class="fa fa-search form-control-feedback"
              id="searchIcon"
            ></span>
            <input type="text" class="form-control" placeholder="Search" />
          </div>
          <Nav className="mr-auto">
            <Show condition={!logedin}>
              {' '}
              <Link to="/auth">sign in</Link>{' '}
            </Show>
            <MDBIcon far icon="user" id="userIcon" />
            <NavDropdown id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">My orders</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Favorites</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Settings</NavDropdown.Item>
              <Show condition={logedin}>
                <NavDropdown.Item onClick={handelLogout}>
                  Log out
                </NavDropdown.Item>
              </Show>
            </NavDropdown>

            <NavDropdown title="Cart" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">View Cart</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Help" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Customer Service
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Return Poilicy
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Shipping Policy
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
