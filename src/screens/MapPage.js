import React from 'react';
import {SafeAreaView} from 'react-native';
import ShowMap from '../components/ShowMap';

function Map(props) {
  const {mapState} = props;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ShowMap mapState={mapState} />
    </SafeAreaView>
  );
}

export default Map;
