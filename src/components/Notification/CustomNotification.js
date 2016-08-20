import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-bootstrap/lib/Popover';
import { cancelNotify } from './CustomNotification.reducer';
import FontAwesome from 'react-fontawesome';
export class CustomNotification extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let messages = Array.isArray(this.props.message) ?
      this.props.message.map((message,index) => {
        return <div className="row text-center" key={index}>
          <span style={{marginRight:'5px'}}><FontAwesome name='exclamation-circle' /></span>
          {message}
        </div>
      })
      : this.props.message;
    return (
      <Popover
        id="notification"
        title={this.props.title ? this.props.title : 'Message'}
        style={{position:'fixed',zIndex:100}}
        placement="right"
        className={`${this.props.isActive ? "show" : "hidden"}`}
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
  title: state.noti.title
});

CustomNotification.propTypes = {
  isActive: PropTypes.bool.isRequired,
  message: PropTypes.any,
  title: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomNotification);
