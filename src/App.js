import React, { Component } from 'react'
import './App.css'
import Sidebar from './Sidebar'
import Map from './Map'
import Header from './Header'
import Topbar from './Topbar'
import Details from './Details'
import * as mapHelper from './GoogleMapsHelper'
import escapeRegExp from 'escape-string-regexp'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab)

class App extends Component {

  constructor(props) {
    super(props)
    this.showSidebar = this.showSidebar.bind(this)
    this.hideSidebar = this.hideSidebar.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
    this.showTopbar = this.showTopbar.bind(this)
    this.hideTopbar = this.hideTopbar.bind(this)
    this.showDetails = this.showDetails.bind(this)
    this.hideDetails = this.hideDetails.bind(this)
    this.handleMapBoundsChange = this.handleMapBoundsChange.bind(this)
    mapHelper.registerCallback(this.handleMapBoundsChange)

    this.state = {
      places: [],
      query: '',
      renderSidebar: false,
      renderMenuButton: true,
      sidebarClassList: ['sidebar'],
      mapClassList: ['map'],
      topbarClassList: ['topbar'],
      selectedPlace: undefined,
      renderDetails: false,
      topbarIcon: ['fas', 'chevron-down'],
      topbarClickHandler: this.showDetails,
      topbarIconAriaLabel: 'expand details'
    }
  }

  componentWillMount() {
    mapHelper.getGoogleMapsPromise()
  }

  componentDidMount() {
    mapHelper.getGoogleMapsPlaces(this.hideTopbar, this.showTopbar)
      .then(results => {
        this.setState({places: results.places})
      }).catch(error => {
        window.alert("The network may be down. Winery data is not available at this time.")
      })
   }

   handleMapBoundsChange() {
     this.setState({boundsChange: true})
   }

  showSidebar() {
    if (!this.state.sidebarClassList.includes('sidebar-show')) {
      this.setState({
        renderSidebar: true,
        sidebarClassList: this.state.sidebarClassList.concat(['sidebar-show']),
        renderMenuButton: false,
      })
    }
    this.hideTopbar()
    mapHelper.closeInfoWindow()
  }

  hideSidebar() {
    this.setState({
      sidebarClassList: this.state.sidebarClassList.filter(c => c !== 'sidebar-show'),
      renderMenuButton: true
    })
  }

  showTopbar(place) {
    // fetch details if haven't done so already
    if (!place.details) {
      mapHelper.getDetails(place).then((details) => {
        place.details = details
        this.setState({
          selectedPlace: place,
          mapClassList: this.state.mapClassList.concat(['map-reduced-height']),
          topbarClassList: this.state.topbarClassList.concat(['topbar-show'])
        })
      }).catch(error => {
        if (!place.details || !place.details[0]) {
          this.setState({selectedPlace: undefined,
            mapClassList: this.state.mapClassList.filter(c => c !== 'map-reduced-height'),
            topbarClassList: this.state.topbarClassList.filter(c => c !== 'topbar-show')
          })
          window.alert(`Details for ${place.name} are not available at this time.`)
        } else {
          window.alert(`Details for ${place.name} are not available from FOURSQUARE at this time.`)
        }
      })
    } else {
      this.setState({
        selectedPlace: place,
        mapClassList: this.state.mapClassList.concat(['map-reduced-height']),
        topbarClassList: this.state.topbarClassList.concat(['topbar-show'])
      })
    }
    this.hideDetails()
  }

  hideTopbar() {
    if (this.state.selectedPlace) {
     this.setState({selectedPlace: undefined,
       mapClassList: this.state.mapClassList.filter(c => c !== 'map-reduced-height'),
       topbarClassList: this.state.topbarClassList.filter(c => c !== 'topbar-show')
     })
     this.hideDetails();
     mapHelper.closeInfoWindow();
    }
  }

  showDetails() {
    this.setState({
      renderDetails: true,
      topbarIcon: ['fas', 'chevron-up'],
      topbarClickHandler: this.hideDetails,
      topbarIconAriaLabel: 'collapse details'
    })
  }

  hideDetails() {
    this.setState({
      renderDetails: false,
      topbarIcon: ['fas', 'chevron-down'],
      topbarClickHandler : this.showDetails,
      topbarIconAriaLabel: 'expand details'
    })
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim(),
    })
    this.hideTopbar()
    mapHelper.closeInfoWindow()
  }

  render() {
    let renderSidebar = false;
    if (this.state.sidebarClassList.includes('sidebar-show') || window.innerWidth > 599)
      renderSidebar = true;
    let showingPlaces
    /* get all places that match the query */
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingPlaces = this.state.places.filter((place) => match.test(place.name))
    } else {
      showingPlaces = this.state.places
    }
    // filter places that are in map bounds
    showingPlaces = mapHelper.getPlacesInBounds(showingPlaces)

    return (
      <div>
        <Header showSidebar={this.showSidebar} renderMenuButton={this.state.renderMenuButton}/>
        <main className='main' >
          {renderSidebar && <Sidebar
            places={showingPlaces}
            classes={this.state.sidebarClassList.join(' ')}
            hideSidebar={this.hideSidebar}
            showTopbar={this.showTopbar}
            updateQuery={this.updateQuery}
            query={this.state.query}
            totalPlacesCnt={this.state.places.length}/>}
          {this.state.selectedPlace && <Topbar
            place={this.state.selectedPlace}
            classes={this.state.topbarClassList.join(' ')}
            chevronClickHandler={this.state.topbarClickHandler}
            closeClickHandler={this.hideTopbar}
            icon={this.state.topbarIcon}
            iconAriaLabel={this.state.topbarIconAriaLabel}/>}
          {this.state.renderDetails && <Details place={this.state.selectedPlace} hideDetails={this.hideDetails}/>}
          <Map
            classes={this.state.mapClassList.join(' ')}
            allPlaces={this.state.places}
            showingPlaces={showingPlaces}
            hideDetails={this.hideDetails}/>
        </main>
      </div>
    )
  }
}

export default App;
