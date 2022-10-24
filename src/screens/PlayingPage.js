import React from 'react';
import {SafeAreaView, View, Button, Text} from 'react-native';

function PlayingPage({navigation}) {
  function handleChangePress() {}
  function HasMusic({location}) {
    if (!location) {
      return (
        <View>
          <Text>No Music Nearby</Text>
          <Text>It's Oh So Quiet...</Text>
        </View>
      );
    } else {
      return (
        <View>
          <View>
            <Text>{location.location}</Text>
            <Text>{location.state + ', ' + location.suburb}</Text>
            <Button onPress={handleChangePress} title={'Play Music'} />
          </View>
          <View>
            <Text>Currently At This Location:</Text>
          </View>
        </View>
      );
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <HasMusic />
    </SafeAreaView>
  );
}

export default PlayingPage;
