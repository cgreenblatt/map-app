# Winery Map Application

## Table of Contents

* [Intro](#intro)
* [Downloading](#downloading)
* [Running](#running)
* [Instructions](#instructions)
* [Contributing](#contributing)
* [Details](#details)

## Intro

This is a map application for wineries in the Los Gatos and Santa Cruz Mountains area.

## Downloading

To download this application, enter the following command on the command line in the directory
where you would like to install it:

git clone https://github.com/cgreenblatt/map-app.git

After the above command completes, change your directory to map-app and run the
following command on the command line:

npm install

## Running
To run the application enter the following command on the command line in the map-app
directory

npm start

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Instructions

All clickable screen items can be reached via the tab key and can be activated
by pressing the enter key, including the map markers.

All wineries are displayed initially on the map.  A larger screen will also
display the side bar.  A smaller screen will display a menu icon that when
clicked will display the sidebar.  Smaller screens will also have a close button
to close the sidebar to return to the map.

The sidebar contains a search field, a count of wineries in the list below,
and a list of wineries located within the current bounds of the map that satisfy
any search criteria.  All wineries match an empty search field.  Hovering on a
winery in the list will cause the associated map marker to turn red.  Clicking
on a winery in the list will cause the associated map marker to turn red for
three seconds, an info window to display near the map marker, and will display
the top bar with buttons for either expanding the winery details or removing
the top bar.  Clicking on a winery in a small screen will cause the side bar to
close.  A winery name is followed by a Google icon indicating google data
is available and a FOURSQUARE icon if foursquare data is available for that
winery on the details screen.

Hovering over a map marker causes the name of the winery to be displayed next to
the map marker.  Clicking on a map marker causes the top bar to be displayed.
The top bar provides access to the winery details.  Once the top bar is displayed,
clicking on the down chevron button of the top bar expands the winery details or
clicking on the close button the removes the top bar.  

Clicking on either the google map zoom buttons will filter the
winery list in the side bar to contain the wineries within the
current map boundaries that satisfy any specified search criteria.

## Contributing

No pull requests will be accepted

## Details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
