import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Alert extends Component {

  constructor(props) {
    super(props)
    this.button = React.createRef()
    this.focusButton = this.focusButton.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    this.focusButton()
  }

  focusButton() {
    this.button.current.focus()
  }

  handleClick() {
    this.props.hideAlert()
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.props.hideAlert()
    }
      e.preventDefault()

  }

  render() {
    return (
    <div role='alert' className='alert'>
      <p className='alert-content'>
        The app is unable to get the winery details at this time.
        The network may be down.  Click or press the button to return
        to the map.</p>
      <button
        ref={this.button}
        id='alert-button'
        onClick={this.handleClick}
        onKeyDown={this.handleKeyPress}
        tabIndex='0'>OK
      </button>
    </div>)
  }
}

Alert.propTypes = {
  hideAlert: PropTypes.func.isRequired
}

export default Alert
