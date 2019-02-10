import React, { Component } from 'react';
import * as mapHelper from './GoogleMapsHelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Topbar extends React.Component {

  constructor(props) {
    super(props)
    this.chevronKeyDownHandler = this.chevronKeyDownHandler.bind(this)
    this.closeKeyDownHandler = this.closeKeyDownHandler.bind(this)
  }

  chevronKeyDownHandler(e) {
    if (e.key === 'Enter') {
      this.props.chevronClickHandler()
      e.preventDefault()
    }
  }

  closeKeyDownHandler(e) {
    if (e.key === 'Enter') {
      this.props.closeClickHandler()
      e.preventDefault()
    }
  }

  render() {
    return (
        <nav role="alert" className={this.props.classes}>
          <h2 className="topbar-h2">{this.props.place.name}</h2>
          <div className="topbar-button-container">
            <button
              id="topbar-chevron-icon"
              aria-label={this.props.iconAriaLabel + " for " + this.props.place.name}
              className="icon-container"
              tabIndex="0"
              onKeyDown={this.chevronKeyDownHandler}
              onClick={this.props.chevronClickHandler}>
              <FontAwesomeIcon icon={this.props.icon} />
            </button>
            <button id="topbar-close-icon"
              aria-label={"remove details" + " for " + this.props.place.name}
              className="icon-container"
              tabIndex="0"
              onKeyDown={this.closeKeyDownHandler}
              onClick={this.props.closeClickHandler}>
              <FontAwesomeIcon icon={['fas', 'times']} />
            </button>
          </div>
        </nav>
    )
  }

}

export default Topbar
