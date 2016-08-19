import React, { PropTypes } from 'react';
import classes from './Card.scss';

const Card = (props) => {
  let viewBtn;
  if(props.buttonName != '' && props.onButtonClick) {
    viewBtn = (
      <button
        onClick={props.onButtonClick}
        className='btn btn-block btn-lg btn-secondary'
      >
        {props.buttonName}
      </button>
    )
  }
  return (
  <div className={props.cardStyle == '' ? 'col-xs-12 col-sm-4' : props.cardStyle}>
    <div className={classes.card}>
      <div className='card-block'>
        <h4 className={`${classes['card-title']} text-center`}>{props.title}</h4>
        <div className='card-body'>{props.children}</div>
        {viewBtn}
      </div>
    </div></div>
)
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  onButtonClick: PropTypes.func,
  cardStyle: PropTypes.string
}
export default Card;
