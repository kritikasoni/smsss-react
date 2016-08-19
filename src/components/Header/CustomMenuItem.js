import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import classes from './Tab.scss'

export const CustomMenuItem = (props) => (
  <LinkContainer to={props.to}>
    <MenuItem>
      {props.name}
    </MenuItem>
  </LinkContainer>
);
export default CustomMenuItem;
