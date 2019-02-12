import sortBy from 'sort-by'
const foursquareID = 'MHIUGFMI0DATTMMYCPZUPTUPJE0J1FAWFRLMBY3GLMNAGTIN'
const foursquareSecret = 'ZXYFLE2WKRWPTSRVPNP1TVDZTVIHWD1IXYLCJ0TVYHIAAOXF'
const radius = 5000
const location = {lat: 37.1093391, lng: -121.930481}

var foursquare = require('react-foursquare')({
  clientID: foursquareID,
  clientSecret: foursquareSecret
})

/**
* @description Gets foursquare places; if a google place exists corresponding
* to that place, the foursquare place data is added to the place data
* @param {array} googlePlaces - places from google
* @return {object} a promise that resolves with an array of places from google with foursquare data added
*/
function getFoursquareData(googlePlaces) {
  const params = {
    ll: `${location.lat.toString()},${location.lng.toString()}`,
    intent: 'browse',
    radius: radius,
    categoryId: '4bf58dd8d48988d14b941735'
  }
  return foursquare.venues.getVenues(params).then(foursquarePlaces => {
    if (foursquarePlaces.meta.code === 200) {
      addFoursquareData(googlePlaces, foursquarePlaces.response.venues)
      return googlePlaces
    }
  })
}

/**
* @description Adds foursquare place data to google place data if a google
* place exists corresponding to the foursquare place
* @param {array} googlePlaces - places from google
* @param {array} foursquarePlaces - places from foursquare
* @param {array} places from google with foursquare data added
*/
function addFoursquareData(googlePlaces, foursquarePlaces) {
  googlePlaces.forEach(place => {
    for (let i = 0, found = false; i < foursquarePlaces.length && !found; i++) {
      if ((place.formatted_address.split(', ')[0] === foursquarePlaces[i].location.address) ||
         (place.name.split(' '))[0] === foursquarePlaces[i].name.split(' ')[0]) {
        found = true
        place.foursquare = foursquarePlaces[i]
      }
    }
  })
  return googlePlaces
}

/**
* @description Gets place details from google and foursquare
* @param {object} place - A google place
* @param {object} service - A google.maps.places.PlacesService object
* @return {object} A Promise that resolves with google details and foursquare
* details for a place
*/
export function getPlaceDetails(place, service) {
  let promises = []
  promises.push(getGoogleDetailsPromise(place, service))
  if (place.foursquare) {
    promises.push(foursquare.venues.getVenue({'venue_id': place.foursquare.id})
      .then(details => {
        if (details.meta.code === 200) {
          return details.response.venue
        }
      })
    )
  }
  return Promise.all(promises)
}

/**
* @description Gets google details for a place
* @param {object} place - A google place
* @param {object} service - A google.maps.places.PlacesService object
* @return {object} A promise that resolves with google place details
*/
function getGoogleDetailsPromise(place, service) {
  return new Promise((resolve, reject) => {
    function callback(details, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(details)
      } else {
        reject('Unable to get details')
      }
    }
    service.getDetails({'placeId': place.place_id, fields: ['name', 'rating', 'formatted_phone_number', 'opening_hours',
    'photos', 'website']}, callback)
  })
}

/**
* @description Gets google data for wineries in the Los Gatos and Santa Cruz mountains
* @param {object} service - A google.maps.places.PlacesService object
* @return {object} A promise that resolves with selected wineries
*/
function getGoogleData(service) {
  let placesPromise = new Promise((resolve, reject) => {
    function callback(googlePlaces, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        googlePlaces = googlePlaces.filter(gp =>
          gp.name.includes('Burrell') ||
          gp.name.includes('Loma Prieta') ||
          gp.name.includes('Regale') ||
          gp.name.includes('Silver') ||
          gp.name.includes('Villa') ||
          gp.name.includes('Wright') ||
          gp.name.includes('MJA') ||
          gp.name.includes('Testa') ||
          gp.name.includes('Grant') ||
          gp.name.includes('Bottle Jack')
        )
        googlePlaces.sort(sortBy('name'))
        googlePlaces.forEach((place, index) => {place.index = index})
        resolve(googlePlaces)
      }
    }
  service.textSearch({location: location, radius: radius, query: 'winery'}, callback)})
  return placesPromise
}

/**
* @description Gets google and foursquare winery eata
* @param {object} service - A google.maps.places.PlacesService object
* @return {object} - A promise that resolves with an array of wineries
*/
export function initializeData(service) {
  return getGoogleData(service)
  .then(googlePlaces => getFoursquareData(googlePlaces))
}
