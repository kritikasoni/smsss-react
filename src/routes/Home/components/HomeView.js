import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'

export const HomeView = () => (
  <div className={`${classes.welcome}`}>


    <div className="intro-text">
      <div className="intro-lead-in">HOSPITAL</div>
      <div className="intro-heading">It's Nice To Meet You</div>
      <img src="http://i651.photobucket.com/albums/uu238/ummz_min/medical-board_1280x800_1.jpg"
           alt="HOSPITAL" />

    </div>

  </div>
)

export default HomeView
