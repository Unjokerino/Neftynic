import React,{useState, useEffect} from 'react'
import { View, StyleSheet, Image, ScrollView, RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import { Title,Text, Appbar, Caption, Portal, Provider,IconButton } from "react-native-paper";
import HorizontalItemCard from "../components/HorizontalItemCard"
import moment from "moment"
import localization from 'moment/locale/ru'
import ImageView from 'react-native-image-view';


const PhotoGalleriesScreen = (props) => {
    
    const [events, setevents] = useState([])
    const [refreshing, setrefreshing] = useState(false)
    const [images, setimages] = useState([])
    const [imageIndex, setimageIndex] = useState(0)
    const [isImageViewVisible, setIsImageViewVisible] = useState(false)
    const [visibleEvents,setvisibleEvents] = useState(20)

  useEffect(() => {
    getData()
  }, [])

  function buyTicket(){
      alert("Пока нельзя :с ")
  }

    async function getData(){
        setvisibleEvents(20)
        setrefreshing(true)
        let result = fetch("https://xn----gtbemkpb3brp9h.xn--p1ai/platforms/themes/allium/gallery.json",{
            headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/json",
                Pragma: "no-cache"
            }
            }).then(async resp =>{
            let json = await resp.json()
                setrefreshing(false)
                
                setevents(json)

                return json
            }).catch(e =>{
                setrefreshing(false)
            })
        return result
    }

    return (
        <Provider>
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }>
            <View
                style={{
                    height: 30,
                    backgroundColor: '#990000'
                }}
            />
            <Appbar
                style={{
                    elevation: 0,
                    backgroundColor:'#990000'
                }}
            >
                <Appbar.Action
                    icon="menu"
                    onPress={() => props.navigation.openDrawer()}
                />
                <Appbar.Content title="Наши фоторепортажи" />
            </Appbar>
            {events.map((event,index) =>{
                if(index < visibleEvents){
                    return(
                        <TouchableOpacity onPress={() => props.navigation.navigate('DetailGalleryScreen',{...event})} style={styles.cardContainer}>
                            <Image style={styles.image} source={{uri:event.img}}/>
                            <Text style={styles.title}>{event.name}</Text>
                        </TouchableOpacity>
                    )
                }
            })}
            {visibleEvents < events.length && <Button onPress={() => setvisibleEvents(visibleEvents + 10)} >Показать еще</Button>}

        </ScrollView>
          </Provider>
    )
}

export default PhotoGalleriesScreen

const styles = StyleSheet.create({
        container:{
           backgroundColor:'#E5E5E5',
        },
        cardContainer:{
            marginBottom:10,
            backgroundColor:'#fff'
        },
        image:{
            width:'100%',
            height:300
        },
        title:{
            padding:10
        }
})
