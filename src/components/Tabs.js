import React from 'react';
import {View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProfilePage from '../screens/ProfilePage';
import MapPage from '../screens/MapPage';
import PlayingPage from '../screens/PlayingPage';

import {colors, sizes} from '../data/theme';
import icons from '../data/icons';

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

function Tabs({navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MapPage"
        children={() => <MapPage navigation={navigation} />}
        options={() => tabOptions(icons.tabMapDark)}
      />
      <Tab.Screen
        name="PlayingPage"
        children={() => <PlayingPage navigation={navigation} />}
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

export default Tabs;
