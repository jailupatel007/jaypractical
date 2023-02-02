import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MobileOTP from './Screens/mobileOTP';
import GoogleMap from './Screens/googleMap';
import ProductList from './Screens/productList';

const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="MobileOTP"
          component={MobileOTP}
          options={{title: 'MobileOTP'}}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{title: 'ProductList'}}
        />
        <Stack.Screen
          name="GoogleMap"
          component={GoogleMap}
          options={{title: 'GoogleMap'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigation;
