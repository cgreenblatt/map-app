import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.props.showSidebar()
    }
  }

  render() {
    return (
      <header className='header'>
        {this.props.renderMenuButton && <button
          aria-label='open the winery search form'
          className='menu-icon icon-container'
          onClick={this.props.showSidebar}
          onKeyDown={this.handleKeyDown}
          tabIndex='0'>
          <FontAwesomeIcon icon={['fas', 'bars']} />
        </button>}
        <h1 className='heading-h1'>Wineries</h1>
        <h2 className='heading-h2'>the los gatos and santa cruz mountains</h2>
      </header>
    )
  }
}

Header.propTypes = {
  showSidebar: PropTypes.func.isRequired,
  renderMenuButton: PropTypes.bool
}

export default Header
