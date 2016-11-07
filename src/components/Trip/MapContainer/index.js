'use strict'
import React, { PropTypes } from 'react'
import styles from './styles'
import { View } from 'react-native'
import MapView from 'react-native-maps'
import Immutable from 'immutable'

class MapContainer extends React.Component {

  static propTypes = {
    displayMode: PropTypes.bool,
    lat: PropTypes.number,
    lng: PropTypes.number,
    markers: PropTypes.array,
    polyline: PropTypes.array,
  }

  static defaultProps = {
    displayMode: false,
    lat: 0,
    lng: 0,
    markers: [],
    polyline: [],
  }

  constructor(props) {
    super(props)
    // hack, for toolbars to appear
    this.state = {
      markerPressed: false,
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.lat !== nextProps.lat ||
            this.props.lng !== nextProps.lng ||
            !Immutable.is(this.props.polyline, nextProps.polyline)
  }

  componentDidMount() {
    setTimeout(() => { // let the map view fit all markers
      if (this.props.markers && this.props.markers.length > 1) {
        const markerArr = this.props.markers.map(marker => {
          const { lat, lng } = marker.position
          return {
            latitude: lat,
            longitude: lng,
          }
        })
        this.map.fitToCoordinates(markerArr, {
          edgePadding: {
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
          },
          animated: true,
        })
      }
    }, 1000)
  }

  render() {
    return (
      <View style={styles.mapContainer}>
        <MapView
          ref={ref => { this.map = ref }}
          provider="google"
          style={styles.map}
          initialRegion={{
            latitude: this.props.lat,
            longitude: this.props.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          rotateEnabled={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          toolbarEnabled={true}
          pitchEnabled={false}
        >
          {this.props.markers.map(marker => {
            const { lat, lng } = marker.position
            return (
              <MapView.Marker
                coordinate={{ latitude: lat, longitude: lng }}
                onPress={() => {
                  this.props.onMarkerPress(marker)
                  // hack code, for google toolbars to appear
                  this.setState({ markerPressed: !this.state.markerPressed })
                }} // for Android
                onSelect={() => this.props.onMarkerPress(marker)} // for IOS
                title={marker.name}
                key={marker.name}
              />
            )
          })}
          <MapView.Polyline
            coordinates = {this.props.polyline}
            strokeWidth = {5}
            lineCap = {'round'}
            strokeColor = {'#00B3FD'}
            icons = {[{
              icon: {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: 4,
              },
              offset: '0',
              repeat: '20px',
            }]}
          />
        </MapView>
        {this.state.markerPressed ? (<View/>) : null}
      </View>
    )
  }
}

export default MapContainer
