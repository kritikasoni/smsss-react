import React from 'react'
import Header from '../../components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import Notification from 'components/Notification';

export const CoreLayout = ({ children }) => (
  <div className={`container-fluid text-center ${classes.noPadding}`}>
    <Header />
    <div className={`${classes.mainContainer}`}>
      <div className={`${classes['notification-bar']} row`}>
        <div className="col-xs-6 col-sm-3 pull-right">
          <Notification />
        </div>
      </div>
      {children}
    </div>

  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
