import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-bootstrap/lib/Popover';

import { cancelNotify } from './CustomNotification.reducer';

export class CustomNotification extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Popover
        id="notification"
        title={this.props.title ? this.props.title : 'Message'}
        style={{position:'fixed',zIndex:9999}}
        placement="right"
        className={`${this.props.isActive ? "show" : "hidden"}`}
        onClick={this.props.handleOnClick}
      >
        {this.props.message}
      </Popover>
    );
  }
}

const mapDispatchToProps = {
  handleOnClick: cancelNotify
};
const mapStateToProps = (state) => ({
  isActive: state.noti.show,
  message: state.noti.message,
  title: state.noti.title
});

CustomNotification.propTypes = {
  isActive: PropTypes.bool.isRequired,
  message: PropTypes.string,
  title: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomNotification);
