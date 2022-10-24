import React from 'react';
import {SafeAreaView} from 'react-native';
import ShowMap from '../components/ShowMap';

function Map({navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ShowMap />
    </SafeAreaView>
  );
}

export default Map;
