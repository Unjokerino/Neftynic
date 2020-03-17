import React, {useState, useEffect} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,FlatList, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ClubsCard from '../components/ClubsCard'
import { Appbar, Title, FAB, Portal, Provider } from "react-native-paper";
import { MonoText } from '../components/StyledText';

export default function ClubsScreen(props) {

  const [events, setevents] = useState([])
  const [refreshing, setrefreshing] = useState(false)

  useEffect(() => {
    getData()

  }, [])

  function getData(){
    setrefreshing(true)
    let result = fetch("http://nefty.binarywd.com/platforms/themes/allium/clubs.json",{
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            Pragma: "no-cache"
          }
        }).then(async resp =>{
          let json = await resp.json()
          setrefreshing(false)
          setevents(json)
        }).catch(e =>{
          setrefreshing(false)
        })
  }

  return (
    <Provider style={styles.container}>

      <FlatList
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
        data={events}
        renderItem={({ item }) => <ClubsCard navigation={props} {...item} />}
        keyExtractor={item => item.name}
      />


    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
