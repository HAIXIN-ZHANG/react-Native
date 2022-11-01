import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {fetchAllLocations} from './src/utils/fetch';
import Tabs from './src/components/Tabs';

const Stack = createStackNavigator();

function App() {
  const [locations, setLocations] = useState();
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchAllLocations();
      setLocations(result?.locations);
    };
    fetch();
  }, [locations?.length]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Tabs'}>
          <Stack.Screen
            name="Tabs"
            children={props => <Tabs {...props} locations={locations} />}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
