import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Navbar, Nav } from 'react-bootstrap'

export const NavbarPanel = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand href="/">ШАРАЖ-ЧАТ</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/account" className="nav-link">Аккаунт</Link>
          <Link to="/chat" className="nav-link">Чат</Link>
          <Link to="/" className="nav-link" onClick={logoutHandler}>Выйти</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}