import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import NavItem from 'react-bootstrap/lib/NavItem';
import classes from './Tab.scss'

export const Tab = (props) => (
  <LinkContainer to={props.to}>
    <NavItem>
      {props.name}
    </NavItem>
  </LinkContainer>
);
export default Tab;



