import React from 'react';
import classes from './Department.component.scss';
import Card from 'components/Card';

export const Department = (props) =>  (
  <Card
    title={`${props.name}`}
    cardStyle={`col-xs-12 col-sm-4 col-sm-offset-4`}>
    {props.children}
  </Card>
)
Department.propTypes = {
  name: React.PropTypes.string.isRequired,
}

export default Department;
