import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { role } from 'Config';
import { Tab } from './Tab'
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss'
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import CustomMenuItem from './CustomMenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import { logout } from './../../routes/Authentication/Login/Login.reducer';

export class Header extends Component {
  constructor(props,context) {
    super(props, context);
    this._logout = this._logout.bind(this);
  }

  _logout() {
    const { router } = this.context;
    this.props.logout();
    router.push('/login');
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to='/' activeClassName={classes.activeRoute}>
              SMART MEDICAL SERVICES SUPPORTING SYSTEM
            </IndexLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem>{
            this.props.isLoggedIn ?
              `${this.props.user.role.name} ${this.props.user.firstName} ${this.props.user.lastName}`
              : ''
          }</NavItem>
          {
            this.props.isLoggedIn ?
              <NavItem onClick={this._logout}>Log out</NavItem>
              : <Tab to='/login' name='Login' />
          }
        </Nav>
        {/*admin*/}
        {
          this.props.isLoggedIn && (this.props.user.role.name == role.ADMIN) ?
            (
              <div>
                <Nav>
                  {/*<Tab to="/patients" name="Patients" />*/}
                  <NavDropdown title="Manage Department" id="admin-menu">
                    <CustomMenuItem to="/admin/departments" name="Department list"/>
                    <CustomMenuItem to="/admin/departments/add" name="Add department" />
                  </NavDropdown>

                  <NavDropdown title="Manage Doctor" id="admin-menu-manage-doctors">
                    <CustomMenuItem to="/admin/doctors" name="Doctor list"/>
                    <CustomMenuItem to="/admin/doctors/add" name="Add doctor" />
                  </NavDropdown>
                  <NavDropdown eventKey={3} title="Manage Medicine" id="admin-menu-manage-medicine">
                    <CustomMenuItem to="/admin/medicines" name="Medicine list"/>
                    <CustomMenuItem to="/admin/medicines/add" name="Add medicine" />
                  </NavDropdown>
                  <NavDropdown eventKey={3} title="Manage Nurse" id="admin-menu-manage-nurse">
                    <CustomMenuItem to="/admin/nurses" name="Nurse list"/>
                    <CustomMenuItem to="/admin/nurses/add" name="Add nurse" />
                  </NavDropdown>
                </Nav>
                <Nav>
                  <NavDropdown title="Manage Patient" id="admin-menu-manage-patients">
                    <CustomMenuItem to="/admin/patients" name="Patients list"/>
                    <CustomMenuItem to="/admin/patients/add" name="Add patient" />
                  </NavDropdown>
                  <NavDropdown eventKey={3} title="Manage Position" id="admin-menu-manage-position">
                    <CustomMenuItem to="/admin/positions" name="Position list"/>
                    <CustomMenuItem to="/admin/positions/add" name="Add position" />
                  </NavDropdown>
                  <NavDropdown eventKey={3} title="Manage Room" id="admin-menu-manage-room">
                    <CustomMenuItem to="/admin/rooms" name="Room list"/>
                    <CustomMenuItem to="/admin/rooms/add" name="Add room" />
                  </NavDropdown>
                </Nav>
              </div>
            )
            :
            null
        }
        {/*doctor*/}
        {
          this.props.isLoggedIn && (this.props.user.role.name == role.DOCTOR) ?
            (<div>
                <Nav>
                  <Tab to='/admin/patients' name='Patients' />
                  <Tab to='/admin/medicines' name='Medicines' />
                </Nav>
              </div>)
            : null
        }
        {/*nurse*/}
        {
          this.props.isLoggedIn && (this.props.user.role.name == role.NURSE) ?
            (<div>
              <Nav>
                <Tab to='/admin/patients' name='Patients' />
                <Tab to='/nurse/queues/list' name='Queues' />
              </Nav>
            </div>)
            : null
        }
      </Navbar>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}
Header.contextTypes = {
  router: PropTypes.any.isRequired
}

const mapStateToProps = (state) =>({
  user: state.auth ? state.auth.user : undefined,
  isLoggedIn: state.auth ? state.auth.isLoggedIn : false
});
const mapDispatchToProps = {
  logout: logout
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
