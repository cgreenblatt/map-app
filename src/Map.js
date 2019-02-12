import React from 'react'
import PropTypes from 'prop-types';
import * as mapHelper from './GoogleMapsHelper'

const Map = (props) => {

  mapHelper.handleMarkers(props.allPlaces, props.showingPlaces)
  return (
    <section
      role='application'
      aria-label='google map of the los gatos and santa cruz mountains'
      id='map'
      className={props.classes}
      onFocus={()=> {
        props.hideDetails()
      }}
      tabIndex='0'>
    </section> )
}

Map.propTypes = {
  classes: PropTypes.string.isRequired,
  allPlaces: PropTypes.array.isRequired,
  showingPlaces: PropTypes.array.isRequired,
  hideDetails: PropTypes.func.isRequired
}

export default Map
