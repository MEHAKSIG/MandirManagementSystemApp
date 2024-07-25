import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthContext, { AuthProvider } from './src/context/AuthContext';
import {  LMSUserDashboardStackNavigator, LoginNavigator } from './src/navigation/StackNavigator';
import LoginScreen from './src/screens/LoginScreen';
import { getUserDetail } from './src/services/DataStorageService';
import { NavigationContainer } from "@react-navigation/native";
import Loader from './src/components/molecules/Loader';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  // const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = React.useState<boolean | undefined>(undefined);
  const [userRole, setUserRole] = React.useState<string>('');

  const authProvider: AuthProvider = {
    onAuthenticationSuccess: (isSuccess, userRole) => {
      // setUserRole(userRole ?? '');
      setIsSignedIn(isSuccess);
    }
  }

  const checkIfUserAlreadyAuthenticated = async () => {
    const userData = await getUserDetail();
    if (userData?.userName) {
      setIsSignedIn(true);
      // setUserRole(userData.role);
    } else {
      setIsSignedIn(false);
    }

  }

  React.useEffect(() => {
    checkIfUserAlreadyAuthenticated();
  }, [])

  if (isSignedIn == undefined) {
    return <Loader />
  }

  if (isSignedIn) {
console.log(isSignedIn,"userRole#####")
   

    // if (userRole?.toLowerCase() == 'user' || userRole?.toLowerCase() == 'admin') {
      return (
        <AuthContext.Provider value={authProvider}>
          {/* <WithAxios> */}
            <NavigationContainer>
              <LMSUserDashboardStackNavigator />
              <StatusBar />
            </NavigationContainer>
          {/* </WithAxios> */}
        </AuthContext.Provider>
      )

  }


  return (
    <AuthContext.Provider value={authProvider}>
       <NavigationContainer>
      <LoginNavigator />
      <StatusBar />
      </NavigationContainer>
     
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
