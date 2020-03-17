import React, {useState, useEffect} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,FlatList, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import NewsCard from '../components/NewsCard'
import { Appbar, Title, FAB, Portal, Provider } from "react-native-paper";
import { MonoText } from '../components/StyledText';

export default function HomeScreen(props) {

  const [events, setevents] = useState([])
  const [refreshing, setrefreshing] = useState(false)

  useEffect(() => {
    getData()

  }, [])

  function getData(){
    setrefreshing(true)
    let result = fetch("http://nefty.binarywd.com/platforms/themes/allium/news.json",{
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
        renderItem={({ item }) => <NewsCard navigation={props} {...item} />}
        keyExtractor={item => item.name}
      />


    </Provider>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
