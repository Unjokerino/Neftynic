import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, } from 'react-native';
import * as Permissions from 'expo-permissions';
import { SplashScreen, Notifications } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from "./navigation/AppNavigator"
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import * as firebase from 'firebase';
import Constants from 'expo-constants';

  const firebaseConfig = {
    apiKey: "AIzaSyDHtsweqDfruO6JhZBxaQvkG-NPaBqTcHs",
    authDomain: "kinoafisha-d29d7.firebaseapp.com",
    databaseURL: "https://kinoafisha-d29d7.firebaseio.com",
    projectId: "kinoafisha-d29d7",
    storageBucket: "kinoafisha-d29d7.appspot.com",
    messagingSenderId: "1080891018380",
    appId: "1:1080891018380:web:7224710c052df32b83ffa9",
    measurementId: "G-SNP0W2B5N6"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }



const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  async function registerNotifications(){
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // only asks if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // On Android, permissions are granted on app installation, so
    // `askAsync` will never prompt the user
  
    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      alert('No notification permissions!');
      return;
    }
  
    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    storeHighScore(Constants.installationId,token)
  }

  function storeHighScore(userId, token) {
    firebase.database().ref('apps/neftynic/users/' + userId).set({
      token: token,
      appOwnership: Constants.appOwnership
    });
}

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
          'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
          'MaterialIcons-Regular' : require('./assets/fonts/MaterialIcons-Regular.ttf'),
        });
        registerNotifications()
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    
    loadResourcesAndDataAsync();
    
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
