import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { onSubmit } from './Login.reducer';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Spinner from 'react-spinner';
import 'react-spinner/react-spinner.css';

export class Login extends Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
      email: '',
      password: ''
    }
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onPasswordChange = this._onPasswordChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillUpdate (nextProps) {
    const { router } = this.context;
    const { isLoggedIn } = nextProps;
    if (isLoggedIn)
      router.push(`/`);
  }

  componentWillMount () {
    const { router } = this.context;
    if (this.props.isLoggedIn)
      router.push(`/`);
  }

  _onEmailChange(e){
    this.setState({email: e.target.value});
  }
  _onPasswordChange(e) {
    this.setState({password: e.target.value});
  }
  _onSubmit(e){
    e.preventDefault();
    this.props.onSubmit(this.state.email, this.state.password)
  }
  render() {
    return (
      <Form horizontal onSubmit={this._onSubmit}>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2} md={1} mdOffset={4}>
            Email
          </Col>
          <Col sm={8} md={3}>
            <FormControl type="email" placeholder="Email" value={this.state.email} onChange={this._onEmailChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2} md={1} mdOffset={4}>
            Password
          </Col>
          <Col sm={8} md={3}>
            <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this._onPasswordChange} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={8} md={3} mdOffset={5}>
            {
              this.props.loading ?
             <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> :
              <Button type="submit" bsStyle="primary">
                Log in
              </Button>
            }
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
    loading: state.auth.fetching,
    user: state.auth ? state.auth.user : undefined,
    isLoggedIn: state.auth.isLoggedIn
});
const mapDispatchToProps = {
  onSubmit
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.any,
  isLoggedIn: PropTypes.bool.isRequired
}

Login.contextTypes = {
  router: PropTypes.any
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
