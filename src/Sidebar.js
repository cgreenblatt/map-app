import React from 'react';
import PropTypes from 'prop-types';
import Place from './Place'
import * as mapHelper from './GoogleMapsHelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//https://github.com/udacity/reactnd-contacts-complete/commit/abd5fccf9a69546e75d9c178379d3ef92405719e


class Sidebar extends React.Component {

  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    this.focusTextInput = this.focusTextInput.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleMapBoundsChange = this.handleMapBoundsChange.bind(this)
    //mapHelper.registerCallback(this.handleMapBoundsChange)
    //mapHelper.attachBoundsHandler(this.handleMapBoundsChange)
    //this.state = {boundsChange: false}
    this.handleKeyDownUL = this.handleKeyDownUL.bind(this)
  }

  handleMapBoundsChange() {
    this.setState({boundsChange: true})
  }

  componentDidMount() {
    this.focusTextInput()
  }


  focusTextInput() {
    this.textInput.current.focus();
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.props.hideSidebar()
    }
  }

  handleKeyDownUL(e) {
    if (e.key === 'Tab') {
      if (this.props.places.length === 0) {
        this.props.hideSidebar()
      }
    }
  }


  render() {
    const {places, classes, hideSidebar, showTopbar, updateQuery, query, isLastShowingPlace} = this.props
    let placeIndexes = places.map(place => place.index)
    let role = window.innerWidth < 600 ? "alert" : ""
    return (
      <section role={role} className={classes} >
        <div className="sidebar-content">
        <div className='sidebar-top-grid'>
          <button
            aria-label="close the winery search section"
            id="sidebar-close-icon"
            className="icon-container"
            onClick={hideSidebar}
            onKeyDown={this.handleKeyDown}
            tabIndex="0">
            <FontAwesomeIcon icon={['fas', 'times']} />
          </button>
        </div>
        <input
          role="search"
          ref={this.textInput}
          type="text"
          placeholder="search for winery by name"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
        />
        <div className='sidebar-search-cnt'>{this.props.places.length} of {this.props.totalPlacesCnt}</div>

        <ul
          className="sidebar-places-list"
          onKeyDown={this.handleKeyDownUL}>

          { places.map(function(place, index) {
              return <Place
                key={index}
                place={place}
                hideSidebar={hideSidebar}
                showTopbar={showTopbar}
                lastPlace={index === places.length - 1}
              />
            })
          }
        </ul>
        </div>
        {(window.innerWidth < 600) && <footer className="google-attribution">
          <img src="./powered_by_google_on_white.png" alt="powered by google image" className="image-google"></img>
        </footer>}
      </section>
    )
  }
}

export default Sidebar
