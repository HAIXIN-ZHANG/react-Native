import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Tabs from './src/components/Tabs';

// import Tabs from './components/Tabs';
// import Recipe from './screens/Recipe';

// // import {colors} from './data/theme';
// import initialRecipes from './data/recipes';

const Stack = createStackNavigator();

function App() {
  const [recipes, setRecipes] = useState();

  const sortRecipes = (recipe, otherRecipe) => {
    if (recipe.name < otherRecipe.name) {
      return -1;
    }
    if (recipe.name > otherRecipe.name) {
      return 1;
    }
    return 0;
  };
  // const sortedRecipes = recipes.sort(sortRecipes);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Tabs'}>
          <Stack.Screen name="Tabs" children={props => <Tabs {...props} />} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
