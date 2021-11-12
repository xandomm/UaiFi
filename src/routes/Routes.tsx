import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../features/Home';
import DetailsScreen from '../features/Details';
import { DETAILS, HOME } from './RoutesName';

export type RouteList = {
  Details: undefined;
  Home: undefined;
};
const Stack = createNativeStackNavigator<RouteList>();

function Routes<FC>() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'Details'} component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
