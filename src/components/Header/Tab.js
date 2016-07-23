import React from 'react';
import { Link } from 'react-router';
import classes from './Tab.scss'

export const Tab = (props) => (
  <li role="presentation">
    <Link to={props.to} activeClassName={classes.activeRoute}>
      {props.name}
    </Link>
  </li>
);
export default Tab;
