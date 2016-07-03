import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName={classes.activeRoute}>
      Counter
    </Link>
    {' · '}
    <Link to='/admin/doctors' activeClassName={classes.activeRoute}>
      Doctors
    </Link>
    {' · '}
    <Link to='/admin/doctors/add' activeClassName={classes.activeRoute}>
      Add Doctor
    </Link>
    {' · '}
    <Link to='/admin/medicines' activeClassName={classes.activeRoute}>
      Medicines
    </Link>
    {' · '}
    <Link to='/admin/medicines/add' activeClassName={classes.activeRoute}>
      Add Medicine
    </Link>
    {' · '}
  </div>
)

export default Header
