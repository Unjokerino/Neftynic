import * as React from 'react';
import { Platform, View, StatusBar } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ClubsScreen from '../screens/ClubsScreen';
import NewsScreen from '../screens/NewsScreen';
import DetailEventScreen from '../screens/DetailEventScreen';
import DetailClubScreen from '../screens/DetailClubScreen'
import DetailNewsScreen from '../screens/DetailNewsScreen'
import DetailGalleryScreen from '../screens/DetailGalleryScreen'
import WebViewScreen from '../screens/WebViewScreen'


import { BottomNavigation, Text, Appbar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";



class BottomNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cind: global.currentScreen,
      index: props.route.params !== undefined ? props.route.params.screenIndex : 0,
      routes: [

        {
          key: "Afisha",
          title: "Афиша",
          icon: "drama-masks",
          color: "#990000",
          navigation: this.props.navigation
        },
        {
          key: "News",
          title: "Новости",
          icon: "newspaper",
          color: "#990000",
          navigation: this.props.navigation
        },
        {
          key: "Clubs",
          title: "Клубы",
          icon: "account-multiple",
          color: "#990000",
          navigation: this.props.navigation
        }
      ]
    };
  }
  componentDidMount(){
    this.setState({index: this.props.route.params.screenIndex} )
  }




  _handleIndexChange = index => {this.setState({ index })};

  _renderScene = BottomNavigation.SceneMap({
    Afisha: HomeScreen,
    News: NewsScreen,
    Clubs: ClubsScreen
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 30,
            backgroundColor: this.state.routes[this.state.index].color
          }}
        />
   
        <Appbar
          style={{
            backgroundColor: this.state.routes[this.state.index].color,
            elevation: 0
          }}
        >
        
          <Appbar.Content title={this.state.routes[this.state.index].title} />
            <Appbar.Action
            icon="menu"
            onPress={() => this.props.navigation.openDrawer()}
          />
        </Appbar>
        <BottomNavigation
          shifting={true}
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      </View>
    );
  }
}

BottomNavigator.navigationOptions = {
  headerShown:false
}


const Stack = createStackNavigator();

export default function NavigationStuckScreen(props) {
  let screenIndex = props.route.params != undefined ? props.route.params.screen : 0
  
  return (
    <Stack.Navigator >
      <Stack.Screen
        options={{
          headerShown: false
        }}
        initialParams={{screenIndex:screenIndex}}
        name="Feed"
        {...props}
        component={BottomNavigator}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="DetailEventScreen"
        {...props}
        component={DetailEventScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="DetailClubScreen"
        {...props}
        component={DetailClubScreen}
      />
       <Stack.Screen
        options={{
          headerShown: false
        }}
        name="DetailNewsScreen"
        {...props}
        component={DetailNewsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="DetailGalleryScreen"
        {...props}
        component={DetailGalleryScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="WebViewScreen"
        {...props}
        component={WebViewScreen}
      />
      
      
    </Stack.Navigator>
  );
}