import React from 'react'
import PropTypes from 'prop-types';


class DetailsAddrPhoneWeb extends React.Component {

  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(e) {
    if (e.key === 'Tab') {
      this.props.hideDetails()
    }
  }

  render() {
    let place = this.props.place
    let addressArray = place.formatted_address.split(', ')
    let website = place.details[0].website

    return (
      <section aria-label={`${place.name} address and phone number`} className='details-addr-phone' tabIndex='0'>
        <h3>{addressArray[0]}</h3>
        <h3>{addressArray[1]}, {addressArray[2]}</h3>
        <h3 aria-label='phone'>{place.details[0].formatted_phone_number}</h3>
        {website &&
          <h3 aria-label='winery website' className='details-website' onKeyDown={this.handleKeyDown}>
            <a aria-label={place.name + "website"}href={website}>{place.name}</a>
          </h3>
        }
      </section>
    )
  }
}

DetailsAddrPhoneWeb.propTypes = {
  place: PropTypes.object.isRequired,
  hideDetails: PropTypes.func.isRequired
}

export default DetailsAddrPhoneWeb
