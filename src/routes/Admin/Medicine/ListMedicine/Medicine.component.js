import React from 'react';
import classes from './Medicine.component.scss';
import Card from 'components/Card';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';

export const Medicine = (props) =>  (
  <Card
    title={`${props.scientificName} ${props.informalName ? '(' + props.informalName + ')' : ''}`}
    cardStyle={`col-xs-12 col-sm-4 col-sm-offset-4`}>
    <Col xs={12} sm={6}>
      <div className={classes['medicine-image__center']}>
        <Image src={props.image} responsive className={`${classes['medicine-image']}`} />
      </div>
    </Col>
    <Col xs={12} sm={6}>
      <h3>Details:</h3>
      <h6>Medicine is a pill: {props.isPill ? 'Yes' : 'No'}</h6>
      <p>{props.detail}</p>
    </Col>
    <Col xs={12} className={classes['medicine-children__spaceUp']}>
      {props.children}
    </Col>
  </Card>
)
Medicine.propTypes = {
  scientificName: React.PropTypes.string.isRequired,
  informalName: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  detail: React.PropTypes.string.isRequired,
  isPill: React.PropTypes.bool.isRequired
}

export default Medicine;
