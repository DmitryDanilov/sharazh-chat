import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap'

export const MyNavbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  /*return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" class="brand-logo">ШАРАЖ-ЧАТ</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><NavLink to="/account">Аккаунт</NavLink></li>
          <li><NavLink to="/room">Чат</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )*/

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/chat">ШАРАЖ-ЧАТ</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/account">Аккаунт</Nav.Link>
          <Nav.Link href="/chat">Чат</Nav.Link>
          <Nav.Link href="/" onClick={logoutHandler}>Выйти</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}