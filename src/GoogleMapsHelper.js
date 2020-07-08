import * as model from './Model'
import { API } from './src/api-keys'

let map
let google
let service
let googleMapsPromise
let MarkerOverlay
let infoWindow
let markers
let boundsCallback

/**
* @description Sets focus on map marker for specified place
* @param {object} place - Set focus on map marker for this place
*/
export function setMapMarkerFocus(place) {
  markers[place.index].setFocus()
}

/**
* @description Filters places within the map's bounds
* @param {array} places - All places
* @return {array} Places within the map's bounds
*/
export function getPlacesInBounds(places) {
  if (!map) return []
  let bounds = map.getBounds()
  return places.filter(place => bounds.contains(place.geometry.location))
}

/**
* @description Loads google maps API
* @return {object} A promise that resolves with google maps
* https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
*/
export function getGoogleMapsPromise() {
  if (!googleMapsPromise) {
    googleMapsPromise = new Promise(resolve => {
    // Create a new function to call resolve
      window.resolveGoogleMapsPromise = () => {
        // Resolve the promise
        resolve(window.google)
      }
    })

    // start load of google maps api
    const script = document.createElement('script')
  
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=geometry,places&callback=resolveGoogleMapsPromise`;
    script.async = true
    document.body.appendChild(script)
  }

  // Return a promise for the Google Maps API
  return googleMapsPromise;
}

/**
* @description Stores reference to a callback for map bounds change event
* @param {function} callback - Function to be called when a bounds change event occurs
*/
export function registerCallback(callback) {
  boundsCallback = callback
}

/**
* @description Gets google and foursquare details for a place
* @param {object} place - Get details for this place
* @return {object} A promise that resolves with the place with details
*/
export function getDetails(place) {
    return model.getPlaceDetails(place, service)
}

/**
* @description Puts place data in google maps infowindow
* @param {object} place - Infowindow populated with this place's data
*/
export function populateInfoWindow(place) {
  let nameStr = `<h2 id="info-window-title">${place.name}</h2>`
  let addrStr = ''
  if (place.formatted_address) {
    let addressArray = place.formatted_address.split(', ')
    addrStr = `<h3>${addressArray[0]}</h3><h3>${addressArray[1]}, ${addressArray[2]}</h3>`
  }
  let ratingStr = place.rating

  infoWindow.setContent(
      `<div tabIndex="0">
        ${nameStr}
        ${addrStr}
      <div>
      <div>${place.rating}
      </div>`)
  infoWindow.setPosition(place.geometry.location)
  infoWindow.open(map)
} // end populateInfoWindow

/**
* @description Closes the google maps infowindow
*/
export function closeInfoWindow() {
  infoWindow.close()
}

/**
* @description Extends the google map to include the places
* @param {array} places - Extend google map to include these places
*/
function setMapBounds(places) {
  let bounds = new google.maps.LatLngBounds()
  places.forEach(place => {
    bounds.extend(place.geometry.location)
  })
  map.fitBounds(bounds)
}

/**
* @description Initializes the map, service, and infowindow objects
* @return {object} Google maps service object
*/
function initializeGoogleMapsVars(googleAPI) {
        google = googleAPI
        map = new google.maps.Map(document.getElementById('map'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          mapTypeControl: false
        })
        google.maps.event.addListener(map, 'bounds_changed',
          () => {boundsCallback();});
        service = new google.maps.places.PlacesService(map)
        infoWindow = new google.maps.InfoWindow()
        infoWindow.setOptions({pixelOffset: (new google.maps.Size(0,-24))});
      infoWindow.open(map)
      return service;
  }

/**
* @description Gets the google places, creates the google map marker
* custom overlays, sets the map's bounds, and returns the places
* @param {function} hideTopbar - a function to hide the topbar React component
* @param {function} showTopbar - a function to show the topbar React component
* @return {object} A promise that resolves with an array of places
*/
export function getGoogleMapsPlaces(hideTopbar, showTopbar) {

  return getGoogleMapsPromise()
    .then(googleAPI => {
      return initializeGoogleMapsVars(googleAPI);
    })
    .then(googleMapsService => {
      return model.initializeData(googleMapsService)
    })
    .then(googlePlaces => {
      defineMarkerOverlayClass(hideTopbar, showTopbar, map)
      createMarkers(googlePlaces, infoWindow);
      setMapBounds(googlePlaces);
      return {places: googlePlaces};
    });
}

/**
* @description Creates a custom marker overlay for each marker and stores
all markers in the marker array
* @param {array} places - Markers are created for these places
* @param {object} infoWindow - infowindow that displays place data
*/
function createMarkers(places, infoWindow) {
  // create overlay markers
  markers = places.map(place => {
    let marker = new MarkerOverlay(place, infoWindow)
    marker.setMap(map)
    return marker
  })
}

/**
* @description Changes a marker's color from white to red
* @param {object} place - Change this place's marker color
*/
export function changeMarkerColor(place) {
  markers[place.index].changeColor()
}

/**
* @description Changes map marker color to red
* @param {object} place - Change this place's map marker to red
*/
export function changeMarkerToRed(place) {
  markers[place.index].changeToRed()
}

/**
* @description Changes a marker's color from red to white
* @param {object} place - Change this place's map marker to white
*/
export function changeMarkerToWhite(place) {
  markers[place.index].changeToWhite()
}

/**
* @description Displays specified markers on map
* @param {array} allPlaces - All places
* @param {array} placesToDisplay - Display these markers on the map
*/
export function handleMarkers(allPlaces, placesToDisplay) {
  if (!map) {
    return
  }
  // get array of indexes to places whose markers should be displayed
  const indexArray = placesToDisplay.map(place => place.index)
  // filter out places whose markers should not be displayed
  const placesNotToDisplay = allPlaces.filter(place => !indexArray.includes(place.index))
  // set the map markers to null for places whose markers should not be displayed
  placesNotToDisplay.forEach(place => markers[place.index].setMap(null))
  // display these markers
  placesToDisplay.forEach(place => {
    markers[place.index].setMap(map)
  })
}

/**
* @description Defines the Marker overlay class
* @param {function} hideTopbar - The hideTopbar function from the React Topbar Component
* @param {function} showTopbar - The showTopbar function from the React Topbar Component
* from https://developers.google.com/maps/documentation/javascript/examples/overlay-popup
*/
function defineMarkerOverlayClass(hideTopbar, showTopbar, map) {
  /**
  * @constructor A customized Label on the map.
  * @param {object} place - A place
  */
  function LabelOverlay(place) {
    this.position = place.geometry.location
    this.place = place

    let markerLabel = document.createElement('h2')
    this.markerLabel = markerLabel;
    markerLabel.textContent = this.place.name
    markerLabel.classList.add('marker-label')

    // Optionally stop clicks, etc., from bubbling up to the map.
    this.stopEventPropagation()
  }

  // NOTE: google.maps.OverlayView is only defined once the Maps API has
  // loaded. That is why Popup is defined inside initMap().
  LabelOverlay.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the MarkerOverlay is added to the map. */
  LabelOverlay.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.markerLabel)
  }

  /** Called when the MarkerOverlay is removed from the map. */
  LabelOverlay.prototype.onRemove = function() {
    if (this.markerLabel.parentElement) {
      this.markerLabel.parentElement.removeChild(this.markerLabel);
    }
  }

   /** Called when the MarkerOverlay needs to draw itself. */
  LabelOverlay.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    // Hide the MarkerOverlay when it is far out of view.
    var display =
      Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
        'block' :
        'none';

    if (display === 'block') {
      this.markerLabel.style.left = divPosition.x + 'px'
      this.markerLabel.style.top = divPosition.y + 'px'
    }
    if (this.markerLabel.style.display !== display) {
      this.markerLabel.style.display = display
    }
  };

 /** Stops clicks/drags from bubbling up to the map. */
  LabelOverlay.prototype.stopEventPropagation = function() {
    let markerLabel = this.markerLabel;

    ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart', 'pointerdown'].forEach(function(event) {
      markerLabel.addEventListener(event, (e) => {
        e.stopPropagation()
      })
    })
  }

  /**
  * @constructor A customized marker on the map.
  * @param {object} place - A place
  * @param {object} infoWindow - The google maps infowindow
  */
  MarkerOverlay = function(place, infoWindow) {
    this.position = place.geometry.location
    this.place = place
    this.infoWindow = infoWindow
    this.label =  new LabelOverlay(place)
    let label = this.label
    let markerImg = document.createElement('img')
    this.markerImg = markerImg
    // from https://stackoverflow.com/questions/7095574/google-maps-api-3-custom-marker-color-for-default-dot-marker/7686977#7686977
    markerImg.setAttribute('src', 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ffffff')
    markerImg.classList.add('marker-img')
    markerImg.setAttribute('tabIndex' ,'0')
    markerImg.setAttribute('role', 'button')
    markerImg.setAttribute('alt', this.place.name + ' map marker')

    this.markerImg.addEventListener('mouseenter', event => {
      label.setMap(map)
    })

    this.markerImg.addEventListener('mouseout', event => {
        label.setMap(null)
    })

    this.markerImg.addEventListener('focus', event =>  {
      label.setMap(map)
    })

    this.markerImg.addEventListener('blur', event => {
      label.setMap(null)
    })

    this.markerImg.addEventListener('keypress', event => {
      populateInfoWindow(place)
      showTopbar(place)
    })

    markerImg.addEventListener('click', event => {
      showTopbar(place)
      populateInfoWindow(place)
    })

    // Optionally stop clicks, etc., from bubbling up to the map.
    this.stopEventPropagation()
  };

  // NOTE: google.maps.OverlayView is only defined once the Maps API has
  // loaded. That is why Popup is defined inside initMap().
  MarkerOverlay.prototype = Object.create(google.maps.OverlayView.prototype)

  /** Called when the MarkerOverlay is added to the map. */
  MarkerOverlay.prototype.onAdd = function() {
    this.getPanes().overlayMouseTarget.appendChild(this.markerImg)
  }

  /** Called when the MarkerOverlay is removed from the map. */
  MarkerOverlay.prototype.onRemove = function() {
    if (this.markerImg.parentElement) {
      this.markerImg.parentElement.removeChild(this.markerImg)
    }
  }

  /** Called when the MarkerOverlay needs to draw itself. */
  MarkerOverlay.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position)
    // Hide the MarkerOverlay when it is far out of view.
    var display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
        'block' :
        'none';

    if (display === 'block') {
      this.markerImg.style.left = divPosition.x + 'px'
      this.markerImg.style.top = divPosition.y + 'px'
    }
    if (this.markerImg.style.display !== display) {
      this.markerImg.style.display = display
    }
  };

  MarkerOverlay.prototype.changeColor = function() {
    setTimeout(() => {this.changeToWhite()}, 3000)
    this.changeToRed()
  }

  MarkerOverlay.prototype.changeToRed = function() {
    this.markerImg.setAttribute('src', 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e60000')
  }

  MarkerOverlay.prototype.changeToWhite = function() {
    this.markerImg.setAttribute('src', 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ffffff')
  }

  MarkerOverlay.prototype.setFocus = function() {
    this.markerImg.focus()
  }

  /** Stops clicks/drags from bubbling up to the map. */
  MarkerOverlay.prototype.stopEventPropagation = function() {
    let markerImg = this.markerImg;

    ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart',
     'pointerdown']
        .forEach(event => {
          markerImg.addEventListener(event, e => {
            e.stopPropagation()
          })
        })
  }
}
