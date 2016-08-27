import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-bootstrap/lib/Popover';
import classes from './CustomNotification.scss';
import { cancelNotify } from './CustomNotification.reducer';
import FontAwesome from 'react-fontawesome';

export class CustomNotification extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let messages = Array.isArray(this.props.message) ?
      this.props.message.map((message,index) => {
        return <div className="row text-left" key={index}>
          <span style={{marginRight:'5px'}}><FontAwesome name='exclamation-circle' /></span>
          {message}
        </div>
      })
      : this.props.message;
    return (
      <Popover
        id="notification"
        title={this.props.title ? this.props.title : 'Message'}
        style={{position:'fixed',zIndex:9999}}
        placement="right"
        className={`
          ${this.props.isActive ? "show" : "hidden"}
          ${this.props.type == 'error' ? classes.error : ''}
          ${this.props.type == 'warn' ? classes.warn : ''}
          ${this.props.type == 'success' ? classes.success : ''}
        `}
        onClick={this.props.handleOnClick}
      >
        {messages}
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
  title: state.noti.title,
  type: state.noti.type || ''
});

CustomNotification.propTypes = {
  isActive: PropTypes.bool.isRequired,
  message: PropTypes.string,
  title: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomNotification);
