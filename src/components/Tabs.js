import React, {useState} from 'react';
import {View, Image} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProfilePage from '../screens/ProfilePage';
import MapPage from '../screens/MapPage';
import PlayingPage from '../screens/PlayingPage';

import {colors, sizes} from '../data/theme';
import icons from '../data/icons';
import Geolocation from '@react-native-community/geolocation';
import {calculateDistance} from '../utils/mapTools';

const Tab = createBottomTabNavigator();

function TabIcon({focused, icon}) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 50,
      }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
          tintColor: focused ? colors.white : colors.lightLime,
        }}
      />
    </View>
  );
}

function tabOptions(icon) {
  return {
    tabBarIcon: ({focused}) => <TabIcon focused={focused} icon={icon} />,
    tabBarActiveTintColor: colors.white,
    tabBarInactiveTintColor: colors.lightLime,
    headerStyle: {
      backgroundColor: colors.darkGreen,
      height: 50,
    },
    headerTintColor: colors.white,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: sizes.body2,
    },
    tabBarStyle: {
      height: 70,
      padding: sizes.padding,
      backgroundColor: colors.darkGreen,
    },
    tabBarLabelStyle: {
      padding: sizes.padding / 2,
    },
    style: {
      backgroundColor: 'white',
    },
  };
}

function Tabs(props) {
  const {navigation, locations} = props;

  if (locations?.length) {
    // Convert string-based latlong to object-based on each location
    const updatedLocations = locations?.map(location => {
      const latlong = location?.latlong.split(', ');
      location.coordinates = {
        latitude: parseFloat(latlong[0]),
        longitude: parseFloat(latlong[1]),
      };
      return location;
    });

    // Setup initial state for map data
    const initialMapState = {
      locations: updatedLocations,
      userLocation: {
        // Starts at "Indooroopilly Shopping Centre"
        latitude: -27.499526188402154,
        longitude: 152.9728129460468,
      },
      nearbyLocation: {},
    };

    const [mapState, setMapState] = useState(initialMapState);
    // Get the user's current location
    if (mapState?.locations) {
      Geolocation.watchPosition(
        position => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          const nearbyLocation = calculateDistance(
            mapState?.locations,
            userLocation,
          );
          setMapState({
            ...mapState,
            userLocation,
            nearbyLocation: nearbyLocation,
          });
        },
        error => console.log(error),
      );
    }

    console.log('mapState', mapState);

    return (
      <Tab.Navigator>
        <Tab.Screen
          name="MapPage"
          children={() => (
            <MapPage navigation={navigation} mapState={mapState} />
          )}
          options={() => tabOptions(icons.tabMapDark)}
        />

        <Tab.Screen
          name="PlayingPage"
          children={() => (
            <PlayingPage navigation={navigation} mapState={mapState} />
          )}
          options={() => tabOptions(icons.logoDark)}
        />

        <Tab.Screen
          name="ProfilePage"
          children={() => <ProfilePage navigation={navigation} />}
          options={() => tabOptions(icons.tabProfileDark)}
        />
      </Tab.Navigator>
    );
  }
}

export default Tabs;
