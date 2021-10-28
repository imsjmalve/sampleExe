import 'react-native-gesture-handler';
import * as React from 'react';
import dashboard from "../newScreens/dashboard";
import loginScreen from "../newScreens/loginScreen";
import operationScreen from "../newScreens/operationScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';




const AuthStack = createStackNavigator();
const Stack = createStackNavigator();
const Dashboard = createStackNavigator();

const MainStackNavigator = () => {


  return (
 
        <NavigationContainer >
          <Stack.Navigator
        >
            <Stack.Screen name='loginScreen' component={loginScreen}  options={{ headerShown: false }}  />
            <Stack.Screen name='dashboard' component={dashboard}  options={{ headerShown: false }}  />
            <Stack.Screen name='operationScreen' component={operationScreen}  options={{ headerShown: false }}  />

           
          </Stack.Navigator>
        </NavigationContainer>

  );
}


export default MainStackNavigator;

