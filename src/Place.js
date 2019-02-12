import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './App.css'
import * as mapHelper from './GoogleMapsHelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Place extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handlePlaceSelection() {
    this.props.hideSidebar()
    let place = this.props.place
    mapHelper.changeMarkerColor(place)
    mapHelper.populateInfoWindow(place)
    this.props.showTopbar(place)
  }

  handleClick() {
    this.handlePlaceSelection()
  }

  handleKeyDown(e) {
    if (e.key === 'Tab') {
      if (this.props.lastPlace) {
        this.props.hideSidebar()
      }
    }
    if (e.key === 'Enter') {
      this.handlePlaceSelection()
    }
  }

  handleFocus(e) {
    mapHelper.changeMarkerToRed(this.props.place)
  }

  handleMouseEnter(e) {
    mapHelper.changeMarkerToRed(this.props.place)
  }

  handleBlur(e) {
    mapHelper.changeMarkerToWhite(this.props.place)
  }

  handleMouseLeave(e) {
    mapHelper.changeMarkerToWhite(this.props.place)
  }

  render() {
    let place = this.props.place
    let labelString = `${place.name} details from google`
    if (place.foursquare)
      labelString += ' and foursquare'

    return (
      <li role='button'
          aria-label={labelString}
          className='place'
          key={this.props.index}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          tabIndex='0'>
        <div className='place-name'>{place.name}</div>
        <div className='place-icon place-icon-google'><FontAwesomeIcon icon={['fab', 'google']} /></div>
        {place.foursquare && <span className='place-icon place-icon-foursquare'><FontAwesomeIcon icon={['fab', 'foursquare']} /></span>}
      </li>
      )
  }
}

Place.propTypes = {
  place: PropTypes.object.isRequired,
  hideSidebar: PropTypes.func.isRequired,
  showTopbar: PropTypes.func.isRequired,
  lastPlace: PropTypes.bool.isRequired
}

export default Place;
