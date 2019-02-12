import React from 'react'
import PropTypes from 'prop-types'
import DetailsFoursquare from './DetailsFoursquare'
import DetailsImage from './DetailsImage'
import DetailsAddrPhoneWeb from './DetailsAddrPhoneWeb'

const Details = function(props) {

  let place = props.place;

  return (
    <section role='alert' className='details' >
      <div className='details-content-container'>
        {place.photos[0] && <DetailsImage place={place} />}
        <DetailsAddrPhoneWeb place={place} hideDetails={props.hideDetails}/>
        {place.details[0].opening_hours && place.details[0].opening_hours.weekday_text &&
        <section aria-label={`${place.name} operating hours`} className='details-hours' tabIndex='0'>
          {place.details[0].opening_hours.weekday_text.map((wd,index) =>
            <div key={index} className="details-hours-row">
              {wd}
            </div>
          )}
        </section>}
        {place.details[1] && <DetailsFoursquare place={place}/>}
      </div>
      <footer className='google-attribution'>
        <img src='./powered_by_google_on_white.png' alt='powered by google' className='image-google'></img>
      </footer>
    </section>
  )
}

Details.propTypes = {
  place: PropTypes.object.isRequired,
  hideDetails: PropTypes.func.isRequired
}

export default Details
