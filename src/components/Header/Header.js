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
    <Link to='/admin/patients' activeClassName={classes.activeRoute}>
      Patient
    </Link>
    {' · '}
    <Link to='/admin/patients/add' activeClassName={classes.activeRoute}>
      Add Patient
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
    <Link to='/admin/doctors' activeClassName={classes.activeRoute}>
      Nurses
    </Link>
    {' · '}
    <Link to='/admin/doctors/add' activeClassName={classes.activeRoute}>
      Add Nurse
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
    <Link to='/doctor/appointments/add/patient/1' activeClassName={classes.activeRoute}>
      Add appointment
    </Link>
    {' · '}
    <Link to='/doctor/prescriptions/add/patient/1' activeClassName={classes.activeRoute}>
      Add Prescription
    </Link>
    {' · '}
    <Link to='/doctor/symptoms/add/patient/1' activeClassName={classes.activeRoute}>
      Add Symptom
    </Link>
    {' · '}
    <Link to='/admin/rooms/add' activeClassName={classes.activeRoute}>
      Add Room
    </Link>
    {' · '}
    <Link to='/admin/rooms' activeClassName={classes.activeRoute}>
      Rooms
    </Link>
    {' · '}
    <Link to='/nurse/queues/add/patient/1' activeClassName={classes.activeRoute}>
      Add Queue
    </Link>
    {' · '}
    <Link to='/nurse/queues/list/patient/1' activeClassName={classes.activeRoute}>
      Queues
    </Link>
    {' · '}
  </div>
)

export default Header
