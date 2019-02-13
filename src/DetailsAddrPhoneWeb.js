import React from 'react'
import PropTypes from 'prop-types'

const DetailsAddrPhoneWeb = (props) => {

  let place = props.place
  let addressArray = place.formatted_address.split(', ')
  let website = place.details[0].website

  return (
    <section aria-label={`${place.name} address and phone number`} className='details-addr-phone' tabIndex='0'>
      <h3>{addressArray[0]}</h3>
      <h3>{addressArray[1]}, {addressArray[2]}</h3>
      <h3 aria-label='phone'>{place.details[0].formatted_phone_number}</h3>
      {website &&
        <h3 aria-label='winery website' className='details-website' >
          <a aria-label={place.name + "website"}href={website}>{place.name}</a>
        </h3>
      }
    </section>
  )
}

DetailsAddrPhoneWeb.propTypes = {
  place: PropTypes.object.isRequired,
}

export default DetailsAddrPhoneWeb
