import sortBy from 'sort-by'

// yelp mTqHejL_zR8O_UDls8G_sA client-id
const foursquareID = 'MHIUGFMI0DATTMMYCPZUPTUPJE0J1FAWFRLMBY3GLMNAGTIN'
const foursquareSecret = 'ZXYFLE2WKRWPTSRVPNP1TVDZTVIHWD1IXYLCJ0TVYHIAAOXF'

var foursquare = require('react-foursquare')({
  clientID: foursquareID,
  clientSecret: foursquareSecret
});

let params = {
//  "ll": "37.77,-122.41"
  "ll": "37.1093391,-121.930481",
  "intent": "browse",
  "radius": 10000,
  "categoryId": "4bf58dd8d48988d14b941735"
}

let params2 = {
  "venue_id": "4d320c8098336dcbfd411ff0"
}

function getFoursquareData(googlePlaces, location) {
  // TODO fix params -
    return foursquare.venues.getVenues(params).then(foursquarePlaces => {
      if (foursquarePlaces.meta.code === 200) {
        addFoursquareData(googlePlaces, foursquarePlaces.response.venues)
        return googlePlaces
      }
    })
}

function addFoursquareData(googlePlaces, foursquarePlaces) {
  googlePlaces.forEach((place, index) => {
    for (let i = 0, found = false; i < foursquarePlaces.length && !found; i++) {
      if (place.formatted_address.split(', ')[0] === foursquarePlaces[i].location.address) {
        found = true
        //TODO why googlePlaces[index]. and not place. ?
        googlePlaces[index].foursquare = foursquarePlaces[i]
      }
    }
  })
  return googlePlaces
}

export function getPlaceDetails(place, service) {
  let promises = []
  // TODO error handling
  promises.push(getGoogleDetailsPromise(place, service))
  if (place.foursquare) {
    promises.push(foursquare.venues.getVenue({"venue_id": place.foursquare.id})
      .then(details => {
        if (details.meta.code === 200) {
          place.foursquareDetails = details.response.venue
          return details.response.venue
        }
      })
    )
  }
  return Promise.all(promises)
}

function getGoogleDetailsPromise(place, service) {
  return new Promise(function(resolve, reject) {
    function callback(details, status) {
      // TODO google reference - howto deal with it
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        place.googleDetails = details
        resolve(details)
      } else {
        reject("Unable to get details")
      }
    }
    service.getDetails({"placeId": place.place_id, fields: ['name', 'rating', 'formatted_phone_number', 'opening_hours',
  'review', 'photo', 'website']}, callback)
  })
}

function addIndexToPlaces(places) {
  places.forEach((place, index) => {place.index = index})
}

function getGoogleData(service, location) {
  let placesPromise = new Promise(function(resolve, reject) {
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
        addIndexToPlaces(googlePlaces)
        resolve(googlePlaces)
      }
    }

     service.textSearch({
         location: location,
         radius: 2500,
         query: 'winery'
      }, callback)
  })
  return placesPromise
}


export function initializeData2(service, location) {
  // TODO add syntax for sideeffects
    return getGoogleData(service, location)
    .then(googlePlaces => getFoursquareData(googlePlaces, location))
}
