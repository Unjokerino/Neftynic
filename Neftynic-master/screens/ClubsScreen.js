import React, {useState, useEffect} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,FlatList, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ClubsCard from '../components/ClubsCard'
import { Appbar, Title, FAB, Portal, Provider, Button } from "react-native-paper";
import { MonoText } from '../components/StyledText';

export default function ClubsScreen(props) {

  const [events, setevents] = useState([])
  const [refreshing, setrefreshing] = useState(false)
  const [visibleEvents,setvisibleEvents] = useState(20)
  useEffect(() => {
    getData()

  }, [])

  function getData(){
    setvisibleEvents(20)
    setrefreshing(true)
    let result = fetch("https://xn----gtbemkpb3brp9h.xn--p1ai/platforms/themes/allium/clubs.json",{
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
      >

        {events.map((event,index)=>{
          if(index < visibleEvents){
            return(
              <ClubsCard key={event.name} navigation={props} {...event} />
            )
          }
        })}
        {visibleEvents < events.length && <Button onPress={() => setvisibleEvents(visibleEvents + 10)} >Показать еще</Button>}

      </ScrollView>
      


    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
