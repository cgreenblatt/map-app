import * as model from './Model'


let map;
let google;
let service;
let googleMapsPromise;
let MarkerOverlay;
let infoWindow;
let markers;
let googleMarkers;
let googleMaps;
let boundsCallback;

let styles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ff0000"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7d7973"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ff0000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d2cbbd"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#ff0000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e3dbcf"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#948a7a"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#82a6b0"
            }
        ]
    }
]

/*
let styles = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4d2800"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b18a64"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#8a9933"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#666666"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#595959"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#666666"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#666666"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#787b80"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
]

let styles = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#fcfcfc"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#fcfcfc"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#dddddd"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#dddddd"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#dddddd"
            }
        ]
    }
]
*/

export function changeMarkerToRed(place) {
  markers[place.index].changeToRed();
}

const uluru = {lat: 37.1093391, lng: -121.930481};


export function getPlacesInBounds(places) {

    if (!map) return [];
    let bounds = map.getBounds();
    let tempPlaces = places.filter(place => bounds.contains(place.geometry.location));
    return tempPlaces;

}

export function getGoogleMapsPromise() {

  if (!googleMapsPromise) {
    googleMapsPromise = new Promise((resolve, reject) => {
    // Create a new function to call resolve
      window.resolveGoogleMapsPromise = () => {
        // Resolve the promise
        resolve(window.google);
      }
    });

    // start load of google maps api    // Load the Google Maps API
    const script = document.createElement('script');
    const API = 'AIzaSyABZfonyfQfBxa63C2F-1T2P_yvmt9pbzE';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=geometry,places&callback=resolveGoogleMapsPromise`;
    script.async = true;
    //script.addEventListener('error', e => {console.log("now we have an error")})
    document.body.appendChild(script);
  }

  // Return a promise for the Google Maps API
  return googleMapsPromise;
}

export function registerCallback(callback) {
  boundsCallback = callback;
}

export function getDetails(place) {
    return model.getPlaceDetails(place, service)
}

export function populateInfoWindow(place) {
  let nameStr = `<h2 id="info-window-title">${place.name}</h2>`;
  let addrStr = '';
  if (place.formatted_address) {
    let addressArray = place.formatted_address.split(', ');
    addrStr = `<h3>${addressArray[0]}</h3><h3>${addressArray[1]}, ${addressArray[2]}</h3>`;
  }

  infoWindow.setContent(
      `<div role="alert" tabIndex="0">
        ${nameStr}
        ${addrStr}
      <div>`)
  infoWindow.setPosition(place.geometry.location);
  infoWindow.open(map);
} // end populateInfoWindow

export function closeInfoWindow() {
  infoWindow.close();
}

function setMapBounds(places) {
  let bounds = new google.maps.LatLngBounds();
  places.forEach(place => {
    bounds.extend(place.geometry.location);
  });
  map.fitBounds(bounds);
}

function getGoogleMaps() {
  if (googleMaps) {
    Promise.resolve(googleMaps);
  } else {
      return getGoogleMapsPromise().then(googleAPI => {
      google = googleAPI;
      map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false
      });
      google.maps.event.addListener(map, 'bounds_changed',
      function() {
         boundsCallback();
      });
      service = new google.maps.places.PlacesService(map);
      infoWindow = new google.maps.InfoWindow();
      infoWindow.setOptions({pixelOffset: (new google.maps.Size(0,-24))});
      infoWindow.open(map);
    });
  }
}

export function getGoogleMapsPlaces(hideTopbar, showTopbar) {
        return getGoogleMaps().then(() => {
          defineMarkerOverlayClass(hideTopbar, showTopbar, map);
          return model.initializeData2(service, uluru).then(function(places) {
            createMarkers(places, infoWindow);
            setMapBounds(places);
            return {places: places};
          });
        });
}

function createMarkers(places, infoWindow) {

  // create overlay markers
  markers = places.map(place => {
    let marker = new MarkerOverlay(place, infoWindow);
    marker.setMap(map);
    return marker;
  })
}

export function animateMarker(place) {
  markers[place.index].animate();
}

export function changeMarkerToWhite(place) {
  markers[place.index].changeToWhite();
}

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


  placesToDisplay.forEach(place => {
    markers[place.index].setMap(map);
  })
}



/** Defines the Marker overlay class. */
function defineMarkerOverlayClass(hideTopbar, showTopbar, map) {
  /**
   * A customized popup on the map.
   * @param {!google.maps.LatLng} position
   * @param {!Element} content
   * @constructor
   * @extends {google.maps.OverlayView}
   */

   let LabelOverlay = function(place) {
   this.position = place.geometry.location;
   this.place = place;

   let markerLabel = document.createElement('h2');
   this.markerLabel = markerLabel;
   markerLabel.textContent = this.place.name;
   markerLabel.classList.add('marker-label');

   // Optionally stop clicks, etc., from bubbling up to the map.
   this.stopEventPropagation();

 };
 // NOTE: google.maps.OverlayView is only defined once the Maps API has
 // loaded. That is why Popup is defined inside initMap().
 LabelOverlay.prototype = Object.create(google.maps.OverlayView.prototype);

 /** Called when the MarkerOverlay is added to the map. */
 LabelOverlay.prototype.onAdd = function() {
   this.getPanes().floatPane.appendChild(this.markerLabel);
 };

 /** Called when the MarkerOverlay is removed from the map. */
 LabelOverlay.prototype.onRemove = function() {
   if (this.markerLabel.parentElement) {
     this.markerLabel.parentElement.removeChild(this.markerLabel);
   }
 };

 /** Called when the MarkerOverlay needs to draw itself. */
 LabelOverlay.prototype.draw = function() {
   var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
   // Hide the MarkerOverlay when it is far out of view.
   var display =
       Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
       'block' :
       'none';

   if (display === 'block') {
     this.markerLabel.style.left = divPosition.x + 'px';
     this.markerLabel.style.top = divPosition.y + 'px';
   }
   if (this.markerLabel.style.display !== display) {
     this.markerLabel.style.display = display;
   }

 };

 /** Stops clicks/drags from bubbling up to the map. */
 LabelOverlay.prototype.stopEventPropagation = function() {
   let markerLabel = this.markerLabel;

   ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart',
    'pointerdown']
       .forEach(function(event) {
         markerLabel.addEventListener(event, function(e) {
           e.stopPropagation();
         });
       });
 };


    MarkerOverlay = function(place, infoWindow) {
    this.position = place.geometry.location;
    let position = this.position;
    this.place = place;
    this.infoWindow = infoWindow;
    this.label =  new LabelOverlay(place);
    let label = this.label
    let markerImg = document.createElement('img');
    this.markerImg = markerImg;
    // from https://stackoverflow.com/questions/7095574/google-maps-api-3-custom-marker-color-for-default-dot-marker/7686977#7686977
    markerImg.setAttribute('src', 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ffffff');
    //markerImg.setAttribute('src', 'http://image.flaticon.com/icons/svg/252/252025.svg');
    //markerImg.setAttribute('src', 'map-marker.svg');

    markerImg.classList.add('marker-img');
    markerImg.setAttribute('tabIndex' ,'0');
    markerImg.setAttribute('role', 'button')
    markerImg.setAttribute('alt', this.place.name + ' map marker')

    this.markerImg.addEventListener('mouseenter', function( event ) {
      label.setMap(map);
    });


    this.markerImg.addEventListener('mouseout', function( event ) {
        label.setMap(null);
    });

    this.markerImg.addEventListener('focus', function ( event ) {
      label.setMap(map);
    })

    this.markerImg.addEventListener('blur', event => {
      label.setMap(null);
    });

    this.markerImg.addEventListener('keypress', function(event) {
    //  markerLabel.style.opacity = 0;
      populateInfoWindow(place);
      showTopbar(place);
    })

    markerImg.addEventListener('click', e => {
      //this.infoWindow.setContent(`<h2 tabIndex="0" id="infowindow">${this.place.name}</h2>`);
      //this.infoWindow.setContent(this.el);
      //this.infoWindow.setPosition(this.position);
      //this.infoWindow.open(map);
      showTopbar(place);
      populateInfoWindow(place);
    })


    // Optionally stop clicks, etc., from bubbling up to the map.
    this.stopEventPropagation();
  };
  // NOTE: google.maps.OverlayView is only defined once the Maps API has
  // loaded. That is why Popup is defined inside initMap().
  MarkerOverlay.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the MarkerOverlay is added to the map. */
  MarkerOverlay.prototype.onAdd = function() {
    this.getPanes().overlayMouseTarget.appendChild(this.markerImg);
  };

  /** Called when the MarkerOverlay is removed from the map. */
  MarkerOverlay.prototype.onRemove = function() {
    if (this.markerImg.parentElement) {
      this.markerImg.parentElement.removeChild(this.markerImg);
    }
  };

  /** Called when the MarkerOverlay needs to draw itself. */
  MarkerOverlay.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    // Hide the MarkerOverlay when it is far out of view.
    var display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
        'block' :
        'none';

    if (display === 'block') {
      this.markerImg.style.left = divPosition.x + 'px';
      this.markerImg.style.top = divPosition.y + 'px';
    }
    if (this.markerImg.style.display !== display) {
      this.markerImg.style.display = display;
    }
  };

  MarkerOverlay.prototype.animate = function() {
    setTimeout(() => {this.changeToWhite()}, 3000);
    this.changeToRed();
  }

  MarkerOverlay.prototype.changeToRed = function() {
    this.markerImg.setAttribute('src', 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e60000');
  }

  MarkerOverlay.prototype.changeToWhite = function() {
    this.markerImg.setAttribute('src', 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ffffff');

  }

  /** Stops clicks/drags from bubbling up to the map. */
  MarkerOverlay.prototype.stopEventPropagation = function() {
    let markerImg = this.markerImg;
    //markerContainer.style.cursor = 'auto';

    ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart',
     'pointerdown']
        .forEach(function(event) {
          markerImg.addEventListener(event, function(e) {
            e.stopPropagation();
          });
        });
  };

}
