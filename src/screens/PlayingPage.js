import React, {useState, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  Pressable,
  Dimensions,
} from 'react-native';
import {colors, sizes, fonts} from '../data/theme';
import {locations} from '../data/locations';
import {getDistance} from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import icons from '../data/icons';

function PlayingPage({navigation}) {
  const [webViewState, setWebViewState] = useState({
    loaded: false,
    actioned: false,
  });
  const webViewRef = useRef();

  function webViewLoaded() {
    setWebViewState({
      ...webViewState,
      loaded: true,
    });
  }

  function handleReloadPress() {
    webViewRef.current.reload();
  }

  function handleActionPress() {
    if (!webViewState.actioned) {
      webViewRef.current.injectJavaScript('startPlayback()');
    } else {
      webViewRef.current.injectJavaScript('stopPlayback()');
    }
    setWebViewState({
      ...webViewState,
      actioned: !webViewState.actioned,
    });
  }
  const [text, setText] = useState('Enter Your name');
  function handleChangeText(text) {
    setText(text);
  }
  // Convert string-based latlong to object-based on each location
  const updatedLocations = locations.map(location => {
    const latlong = location.latlong.split(', ');
    location.coordinates = {
      latitude: parseFloat(latlong[0]),
      longitude: parseFloat(latlong[1]),
    };
    return location;
  });

  // Setup state for map data
  const initialMapState = {
    locationPermission: true,
    locations: updatedLocations,
    userLocation: {
      latitude: -27.499526188402154,
      longitude: 152.9728129460468,
      // Starts at "Indooroopilly Shopping Centre"
    },
    nearbyLocation: {},
  };

  const [mapState, setMapState] = useState(initialMapState);
  function calculateDistance(userLocation) {
    const nearestLocations = mapState.locations
      .map(location => {
        const metres = getDistance(userLocation, location.coordinates);
        location['distance'] = {
          metres: metres,
          nearby: metres <= 100 ? true : false,
        };
        return location;
      })
      .sort((previousLocation, thisLocation) => {
        return previousLocation.distance.metres - thisLocation.distance.metres;
      });
    return nearestLocations.shift();
  }
  if (mapState.locationPermission) {
    Geolocation.watchPosition(
      position => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const nearbyLocation = calculateDistance(userLocation);
        setMapState({
          ...mapState,
          userLocation,
          nearbyLocation: nearbyLocation,
        });
      },
      error => console.log(error),
    );
  }
  function handleChangePress() {}
  function HasMusic() {
    if (!mapState.nearbyLocation?.distance?.nearby) {
      return (
        <View>
          <Text
            style={{
              ...fonts.body1,
              padding: sizes.padding,
              fontWeight: '700',
              color: colors.purpleColorLighter,
            }}>
            No Music Nearby
          </Text>
          <Text
            style={{
              ...fonts.body3,
              paddingLeft: 22,
              color: colors.purpleColorLighter,
            }}>
            It's Oh So Quiet...
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 80,
                width: 50,
                flex: 1,
              }}>
              <Image
                source={icons.iconPinDarkPurple}
                resizeMode="contain"
                style={{
                  marginTop: 40,
                  width: 40,
                  height: 40,
                }}
              />
            </View>
            <View
              style={{
                flex: 5,
              }}>
              <Text
                style={{
                  ...fonts.body1,
                  padding: sizes.padding,
                  fontWeight: '700',
                  color: colors.purpleColorLighter,
                }}>
                {mapState.nearbyLocation.location}
              </Text>
              <Text
                style={{
                  ...fonts.body4,
                  paddingLeft: sizes.padding,
                  fontWeight: '500',
                  color: colors.purpleColorLighter,
                }}>
                {mapState.nearbyLocation.state +
                  ', ' +
                  mapState.nearbyLocation.suburb}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={handleActionPress}
            style={{
              width: 320,
              height: 30,
              marginLeft: 30,
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.purpleColorLighter,
              borderRadius: 8,
            }}>
            <Text
              style={{
                color: '#ffffff',
                ...fonts.body4,
                fontWeight: '600',
              }}>
              {!webViewState.actioned ? 'Play Music' : 'Stop Music'}
            </Text>
          </Pressable>
          <View
            style={{
              marginTop: 230,
              paddingLeft: sizes.padding,
            }}>
            <Text
              style={{
                ...fonts.body3,
                fontWeight: '700',
                color: colors.purpleColorLighter,
              }}>
              Currently At This Location:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 80,
              }}>
              <Image
                source={icons.cat}
                resizeMode="contain"
                style={{
                  width: 65,
                  height: 65,
                  flex: 2,
                }}
              />
              <View
                style={{
                  borderRadius: 5,
                  marginLeft: 40,
                  height: 40,
                  flex: 4,
                }}>
                <TextInput
                  style={{
                    ...fonts.body3,
                    fontWeight: '700',
                    color: colors.purpleColorLighter,
                  }}
                  value={text}
                  onChangeText={handleChangeText}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 80,
                marginTop: 5,
              }}>
              <Image
                source={icons.iconSmileyLightPurple}
                resizeMode="contain"
                style={{
                  width: 65,
                  height: 65,
                  flex: 2,
                }}
              />
              <Text
                style={{
                  ...fonts.body,
                  fontWeight: '700',
                  color: colors.purpleColorLighter,
                  flex: 4,
                  marginLeft: 40,
                }}>
                And Others
              </Text>
            </View>
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
      <View>
        <View>
          <WebView
            ref={ref => (webViewRef.current = ref)}
            originWhitelist={['*']}
            source={{
              uri: 'https://wmp.interaction.courses/test-webview/',
            }}
            pullToRefreshEnabled={true}
            onLoad={webViewLoaded}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PlayingPage;
