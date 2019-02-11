import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Details extends React.Component {

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

    let place = this.props.place;
    let addressArray = place.formatted_address.split(', ')
    let img, href, source, html
    if (place.photos && place.details[0].photos[0]) {


      img = place.photos[0]
      html = place.photos[0].html_attributions[0]

      href = html.slice(html.indexOf('"') + 1)
      href = href.slice(0, href.indexOf('"'))

      source = html.slice(html.indexOf('>') + 1)
      source = source.slice(0, source.indexOf('<'))
      source = source.replace('&amp;', '&')
    }
    let website = place.details[0].website
    return (
        <section role="alert" className="details" >
        <div className="details-content-container">
          {img && <figure className="details-figure">
            <img src={place.photos[0].getUrl()} className="details-img" alt={place.name}></img>
            <figcaption className="details-figcaption">image source:
              <a aria-label={place.name + " image source"} href={href}>{source}</a>
            </figcaption>
          </figure>}
          <section aria-label={place.name + " address and phone number"} className="details-addr-phone" tabIndex="0">
            <h3>{addressArray[0]}</h3>
            <h3>{addressArray[1]}, {addressArray[2]}</h3>
            <h3 aria-label="phone">{place.details[0].formatted_phone_number}</h3>
            {website &&
              <h3 aria-label="winery website" className='details-website' onKeyDown={this.handleKeyDown}>
                <a aria-label={place.name + "website"}href={website}>{place.name}</a>
              </h3>
            }

          </section>
          {place.details[0].opening_hours && place.details[0].opening_hours.weekday_text &&
          <section aria-label={place.name + " operating hours"} className="details-hours" tabIndex="0">
            {place.details[0].opening_hours.weekday_text.map((wd,index) =>
              <div key={index} className="details-hours-row">
                {wd}
              </div>
            )}
          </section>}
          { place.details[1] && <section aria-label={place.name + " foursquare details"} className="details-foursquare" tabIndex="0">
              <div className="details-foursquare-grid">
                  <div className="foursquare-heading">
                    <img src="./foursquare.svg" alt="powered by foursquare" className="foursquare-attribution"></img>
                  </div>
                  <span className='details-foursquare-icon'>
                    <FontAwesomeIcon icon={['fab', 'foursquare']} />
                  </span>
                  <a className="details-foursquare-data" aria-label={place.name + " foursquare page"} href={place.details[1].canonicalUrl}>{place.name}</a>
                  <span className='details-foursquare-icon'>
                    <FontAwesomeIcon icon={['fab', 'foursquare']} />
                  </span>
                  <span className="details-foursquare-data">
                    likes: {place.details[1].likes.count}
                  </span>
                  <span className='details-foursquare-icon'>
                    <FontAwesomeIcon icon={['fab', 'foursquare']} />
                  </span>
                  <span className="details-foursquare-data">
                    rating: {place.details[1].rating}
                  </span>
              </div>
            </section> }
            </div>

            <footer className="google-attribution">
              <img src="./powered_by_google_on_white.png" alt="powered by google" className="image-google"></img>
            </footer>
        </section>
    )
  }
}

Details.propTypes = {
  place: PropTypes.object.isRequired,
  hideDetails: PropTypes.func.isRequired
}

export default Details
