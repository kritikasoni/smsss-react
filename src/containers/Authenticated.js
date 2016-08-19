import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn || false
});

export function Authenticated (component) {
  class Authenticated extends Component {
    static propTypes = {
      isLoggedIn: React.PropTypes.bool.isRequired
    }

    static contextTypes = {
      store: React.PropTypes.any,
      router: React.PropTypes.any
    }

    constructor (props, context) {
      super(props, context);
    }

    componentDidMount () {
      this.checkAuth();
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth();
    }

    checkAuth () {
      const { router }  = this.context;
      if (!this.props.isLoggedIn) {
        router.push('/login');
      }
    }

    render () {
      return (<div>
        {this.props.isLoggedIn === true
          ? <component {...this.props} />
          : null
        }
      </div>);
    }
  }
  return connect(mapStateToProps)(Authenticated);
}
export default Authenticated;
