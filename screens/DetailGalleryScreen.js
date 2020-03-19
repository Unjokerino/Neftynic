import React,{useState, useEffect} from 'react'
import { View, StyleSheet, Image, ScrollView, RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import { Title,Text, Appbar, Caption, Portal, Provider,IconButton } from "react-native-paper";
import HorizontalItemCard from "../components/HorizontalItemCard"
import moment from "moment"
import localization from 'moment/locale/ru'
import ImageView from 'react-native-image-view';


const DetailGalleryScreen = (props) => {
    const eventData = props.route.params || {}
    const [events, setevents] = useState([])
    const [refreshing, setrefreshing] = useState(false)
    const [images, setimages] = useState([])
    const [imageIndex, setimageIndex] = useState(0)
    const [isImageViewVisible, setIsImageViewVisible] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  function buyTicket(){
      alert("Пока нельзя :с ")
  }

    async function getData(){
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
                let sliceEvents = []
                json.map((event,index) =>{
                    
                    if(index < 6 && event.name !== eventData.name){
                      sliceEvents.push(event)  
                    }
                })
                setevents(sliceEvents)

                return json
            }).catch(e =>{
                setrefreshing(false)
            })
        return result
    }

    return (
        <Provider style={{flex:1,
        }}>
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
                    icon="arrow-left"
                    onPress={() => props.navigation.goBack()}
                />
                <Appbar.Content title={eventData.name} />
            </Appbar>
            {eventData.gallery &&
                    <View style={styles.galleryContainer}>
                        <ScrollView style={{ marginHorizontal:0,marginTop:20}} showsHorizontalScrollIndicator={false} horizontal={true}>
                            {eventData.gallery.map((item,index) =>{
                                 
                                images.push({source:{
                                    uri:item
                                }})
                                return(
                                <TouchableOpacity key={item}
                                style={{ marginHorizontal:0}}
                                    onPress={() => {      
                                        setimageIndex(index)
                                        setIsImageViewVisible(true)
                                    }}>
                                    <Image style={styles.image}     
                                    source={{uri: item}} />
                                </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                        <ImageView
                            glideAlways
                            images={images}
                            imageIndex={imageIndex}
                            animationType="fade"
                            isVisible={isImageViewVisible}
                            onClose={() => setIsImageViewVisible(false)}
                            onImageChange={index => {
                                console.log(index);
                            }}
                        />
                     <Text style={styles.title}> {eventData.name} </Text>
                    </View>
            }
            <View style={styles.otherEvents}>
                <Text style={styles.otherEventsTitle}>Другие галереи</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={events}
                    
                    renderItem={({ item }) => <HorizontalItemCard target="DetailGalleryScreen" navigation={props} {...item} />}
                    keyExtractor={item => item.name}
                />
            </View>
          </ScrollView>

          </Provider>
    )
}

export default DetailGalleryScreen

const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#F8F8F8',
        },
        otherEvents:{
            marginTop:20,
            flex:1,
           
        },
        otherEventsTitle:{
            padding:10,
            fontSize:16,
            fontFamily:'Roboto-Medium'
        },
        image:{
            elevation:1,
            width:220,
            height:270,
            marginRight:10,
            borderRadius:10
        },
        galleryContainer:{
            flex:1,
            elevation:1,
            backgroundColor:'#fff'
        },
        title:{
            padding:50,
            fontFamily: "Roboto-Regular",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: 18,
 
        }
})
