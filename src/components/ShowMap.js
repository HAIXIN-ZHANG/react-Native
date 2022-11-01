import React, {useState} from 'react';
import {StyleSheet, Appearance, View, SafeAreaView, Text} from 'react-native';
import MapView, {Circle} from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nearbyLocationSafeAreaView: {
    backgroundColor: 'black',
  },
  nearbyLocationView: {
    padding: 20,
  },
  nearbyLocationText: {
    color: 'white',
    lineHeight: 25,
  },
});

function NearbyLocation(props) {
  if (typeof props.location !== 'undefined') {
    return (
      <SafeAreaView style={styles.nearbyLocationSafeAreaView}>
        <View style={styles.nearbyLocationView}>
          <Text style={styles.nearbyLocationText}>{props.location}</Text>
          {props.distance.nearby && (
            <Text
              style={{
                ...styles.nearbyLocationText,
                fontWeight: 'bold',
              }}>
              Within 100 Metres!
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

// Main component for displaying the map and markers
export default function ShowMap(props) {
  const {mapState} = props;
  return (
    <>
      <MapView
        camera={{
          center: mapState?.userLocation,
          pitch: 0, // Angle of 3D map
          heading: 0, // Compass direction
          altitude: 3000, // Zoom level for iOS
        }}
        showsUserLocation={true}
        style={styles.container}>
        {mapState?.locations.map(location => (
          <Circle
            key={location.id}
            center={location.coordinates}
            radius={100}
            strokeWidth={3}
            strokeColor="#A42DE8"
            fillColor={'rgba(210,169,210,0.5)'}
          />
        ))}
      </MapView>
      <NearbyLocation {...mapState?.nearbyLocation} />
    </>
  );
}
