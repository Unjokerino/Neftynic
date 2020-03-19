import * as React from "react";
import { View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import PhotoGalleriesScreen from "../screens/PhotoGalleriesScreen";


import NewsScreen from "../screens/NewsScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

  return (
    <DrawerContentScrollView style={{ flex: 1 }} {...props}>
      <View
        style={{
          marginTop:20,
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          style={{ height: 40, width: 150 }}
          source={require("../assets/images/logo-dark.png")}
        ></Image>
      </View>
      <DrawerItemList {...props} />

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end"
        }}
      >
      <View style={{padding:18}}>
        <View style={{paddingVertical:10,alignItems:'center',flexDirection:'row'}}>
          <Text style={{fontFamily:'MaterialIcons-Regular',marginRight:10,fontSize:24,color:'#fff'}}>phone</Text>
          <Text style={{color:'#fff'}}>ул. Ленина, 12 Ноябрьск ЯНАО</Text>
        </View>
      
                  

        <View style={{paddingVertical:10,alignItems:'center',flexDirection:'row'}}>
          <Text style={{fontFamily:'MaterialIcons-Regular',marginRight:10,fontSize:24,color:'#fff'}}>
            location_on
          </Text>
          <Text style={{color:'#fff'}}>
            341-395
          </Text>
        </View>
      </View>
      </View>
    </DrawerContentScrollView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => CustomDrawerContent(props)}
        drawerContentOptions={{
          activeTintColor: "#fff",
          inactiveTintColor: "#fff"
        }}
        drawerStyle={{
          backgroundColor: "#000",
          color: "#fff",
          activeTintColor: "#fff"
        }}
      >
    
       
        <Drawer.Screen initialParams={{screen:0}} name="Афиша событий" icon="menu" component={BottomTabNavigator} />
        <Drawer.Screen initialParams={{screen:1}} name="Новости" icon="menu" component={BottomTabNavigator} />
        <Drawer.Screen initialParams={{screen:2}} name="Клубные формирования" icon="menu" component={BottomTabNavigator} />
        <Drawer.Screen name="Фоторепортажи" icon="menu" component={PhotoGalleriesScreen} />


        

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
