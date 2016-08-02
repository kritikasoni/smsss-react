import React from 'react'
import { Tab } from './Tab'
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss'

export const Header = () => (

  <div className={`${classes.head1}`}>
    <h1>SMART MEDICAL SERVICES SUPPORTING SYSTEM</h1>
    <div className={`${classes.head2}`}>
      <ul className="nav nav-tabs">
        <div className="row">
          <div className="col col-md-12">
            <li className="col-md-2 col-xs-12" role="presentation">
              <IndexLink to='/' activeClassName={classes.activeRoute}>
                HOME
              </IndexLink>
            </li>
            <div className="col-md-2 col-xs-12"><Tab to='/admin/patients' name='PATIENTS' /></div>
            <div className="col-md-2 col-xs-12"><Tab to='/admin/patients/add' name='ADD PATIENT' /></div>
            <div className="col-md-2 col-xs-12"><Tab to='/admin/doctors' name='DOCTORS' /></div>
            <div className="col-md-2 col-xs-12"><Tab to='/admin/doctors/add' name='ADD DOCTORS' /></div>
          </div>
        </div>
      </ul>
      <ul className="nav nav-tabs">
        <div className="row">
          <div className="col col-md-12">
            <div className="col-md-2 col-xs-12"> <Tab to='/admin/nurses' name='NURSES'/></div>
            <div className="col-md-2 col-xs-12"><Tab to='/admin/nurses/add' name='ADD NURSE' /></div>
            <div className="col-md-2 col-xs-12"><Tab to='/admin/medicines/add' name='ADD MEDICINE' /></div>
            <div className="col-md-2 col-xs-12"><Tab to='/doctor/appointments/add/patient/1' name='ADD APPOINTMENT' /></div>
            <div className="col-md-2 col-xs-12"><Tab to='/doctor/prescriptions/add/patient/1' name='ADD PRESCRIPTION' /></div>
            <div className="col-md-2 col-xs-12"><Tab to='/doctor/symptoms/add/patient/1' name='ADD SYMPTOM' /></div>
          </div>
        </div>
      </ul>
      <ul className="nav nav-tabs">
        <div className="row">
          <div className="col col-md-12">
            <div className="col-md-2 col-xs-12"> <Tab to='/admin/rooms/add' name='ADD ROOM' /></div>
            <div className="col-md-2 col-xs-12"> <Tab to='/admin/rooms' name='ROOMS' /></div>
            <div className="col-md-2 col-xs-12"> <Tab to='/nurse/queues/add/patient/1' name='ADD QUEUE' /></div>
            <div className="col-md-2 col-xs-12"> <Tab to='/admin/medicines' name='MEDICINES' /></div>
            <div className="col-md-2 col-xs-12"> <Tab to='/nurse/queues/list' name='QUEUES' /></div>
          </div>
        </div>
      </ul>
    </div>
  </div>

) //เพิ่ม '/admin/departments/add' name='ADD DEPARTMENT'
//เพิ่ม'/admin/departments' name='DEPARTMENT'

export default Header
