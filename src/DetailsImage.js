import React from 'react'
import PropTypes from 'prop-types'

const DetailsImage = (props) => {
  let place = props.place
  let img = place.photos[0]
  let html = place.photos[0].html_attributions[0]

  let href = html.slice(html.indexOf('"') + 1)
  href = href.slice(0, href.indexOf('"'))

  let source = html.slice(html.indexOf('>') + 1)
  source = source.slice(0, source.indexOf('<'))
  source = source.replace('&amp;', '&')

  return (
    <figure className='details-figure'>
      <img src={place.photos[0].getUrl()} className='details-img' alt={place.name}></img>
      <figcaption className='details-figcaption'>image source:
        <a aria-label={`${place.name} image source`} href={href}>{source}</a>
      </figcaption>
    </figure>)
}

DetailsImage.propTypes = {
  place: PropTypes.object.isRequired
}

export default DetailsImage
