import React from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DetailsFoursquare = (props) => {
  let place = props.place
  return (
  <section aria-label={`${place.name} foursquare details`} className='details-foursquare' tabIndex='0'>
    <div className='details-foursquare-grid'>
      <div className='foursquare-heading'>
        <img src='./foursquare.svg' alt='powered by foursquare' className='foursquare-attribution'></img>
      </div>
      <span className='details-foursquare-icon'>
        <FontAwesomeIcon icon={['fab', 'foursquare']} />
      </span>
      <a className='details-foursquare-data' aria-label={`${place.name} foursquare page`} href={place.details[1].canonicalUrl}>{place.name}</a>
      <span className='details-foursquare-icon'>
        <FontAwesomeIcon icon={['fab', 'foursquare']} />
      </span>
      <span className='details-foursquare-data'>
        likes: {place.details[1].likes.count}
      </span>
      <span className='details-foursquare-icon'>
        <FontAwesomeIcon icon={['fab', 'foursquare']} />
      </span>
      <span className='details-foursquare-data'>
        rating: {place.details[1].rating}
      </span>
    </div>
  </section>)
}

DetailsFoursquare.propTypes = {
  place: PropTypes.object.isRequired
}

export default DetailsFoursquare
