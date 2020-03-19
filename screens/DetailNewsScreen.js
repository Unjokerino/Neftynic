import React,{useState, useEffect} from 'react'
import { View, StyleSheet, Image, ScrollView, RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import { Title,Text, Appbar, Caption, Portal, Provider,IconButton } from "react-native-paper";
import HorizontalItemCard from "../components/HorizontalItemCard"
import moment from "moment"
import localization from 'moment/locale/ru'
import ImageView from 'react-native-image-view';


const DetailClubScreen = (props) => {
    const eventData = props.route.params
    const date = eventData.seanses ? eventData.seanses[0].date.split('/') : ''
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
        let result = fetch("https://xn----gtbemkpb3brp9h.xn--p1ai/platforms/themes/allium/news.json",{
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
        <Provider>
        <ScrollView style={{backgroundColor:'#fff',}} refreshControl={
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
            
                <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                    backgroundColor:'#fff',
                    elevation: 7,}}
                >
                    <Image 
                        source={{uri:eventData.img.url ? eventData.img.url : eventData.img}}
                        style={{width:'100%',height:150,}}
                    />
                </View>
                <Text></Text>
                <View style={styles.mainInfoContainer}>
                    <Title style={styles.title}>{eventData.name}</Title>
                    {eventData.seanses && <View style={styles.dateContainer}>
                        <Appbar.Action icon="calendar"/>
                        <Text style={styles.date}>
                            {moment(eventData.seanses[0].date).locale("ru", localization).format("D MMMM") + ' ' + eventData.seanses[0].time}  
                        </Text>
                    

                    </View>
                    }
                    <Text style={styles.description}>
                        {eventData.description}
                    </Text>
                    
                </View>
                
                {eventData.gallery &&
                    <View>
                        <Title style={[styles.title,{ marginHorizontal:10,marginBottom:10}]}> Фотогаллерея </Title>
                        <ScrollView style={{ marginHorizontal:0}} showsHorizontalScrollIndicator={false} horizontal={true}>
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
                    
                    </View>
                }
                <Text style={styles.phones}>
                    <Caption>Справки по телефону: </Caption>
                    <Text>34-13-95</Text>
                </Text>
                <Title style={[styles.title,{ marginHorizontal:5}]}> Другие события афиши </Title>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={events}
                    style={styles.otherEvents}
                    renderItem={({ item }) => <HorizontalItemCard target="DetailNewsScreen" navigation={props} {...item} />}
                    keyExtractor={item => item.name}
                />
              
          </ScrollView>
            {eventData.id_сinema || eventData.id_cinema_other ? <Portal style={styles.button}>
                <TouchableOpacity onPress={buyTicket} style={styles.button}>
                    <Text style={styles.buttonText}>Купить билет</Text>
                     <IconButton
                        icon="chevron-right"
                        color="#fff"
                        size={20}
                    />
                </TouchableOpacity>
         
            </Portal> : <View/>
            }
          </Provider>
    )
}

export default DetailClubScreen

const styles = StyleSheet.create({
        container:{
           backgroundColor:'#fff',
        },
        button:{
            alignSelf:'center',
            position:'absolute',
            bottom:30,
            paddingLeft:24,
            paddingRight:12,
            alignItems:'center',
            flexDirection:'row',
            borderRadius:5,
            backgroundColor:'#F50000',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 1, 
        },
        buttonText:{
            fontWeight:'bold',
            color:'#fff',          
        },
        buttonDivider:{
            width:1,
            height:'100%',
            backgroundColor:'#f1f1f1'
        },
        title:{
            fontSize:18,
            letterSpacing: -0.24,
            lineHeight:20,
            fontFamily:'Roboto-Regular',

        },
        otherEvents:{
            marginVertical:15,
        },
        phones:{
           
            textAlign:'center',
            paddingVertical:15,
        },
        dateContainer:{
            marginTop:10,
            flexDirection:'row',
            alignItems:'center'
        },
        image:{
            width:150,
            height:200,
            marginRight:10,
            borderRadius:10
        },
        description:{
            marginTop:10,
            textAlign:'left',
            fontFamily:'Roboto-Regular',

            fontSize:12,
        },
        date:{
            fontSize:20,
        },
        mainInfoContainer:{
         
            backgroundColor:'#fff',
            
            padding:10,
            
            marginHorizontal:5,
        }
})
