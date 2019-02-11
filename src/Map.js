import React from 'react'
import PropTypes from 'prop-types';
import * as mapHelper from './GoogleMapsHelper'

class Map extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    mapHelper.handleMarkers(this.props.allPlaces, this.props.showingPlaces)
    return <section role='application' aria-label='google map of the los gatos and santa cruz mountains' id='map' className={this.props.classes} tabIndex="0"></section>
  }
}

export default Map
