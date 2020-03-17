import React,{useState, useEffect} from 'react'
import { View, StyleSheet, Image, ScrollView, RefreshControl, FlatList, TouchableOpacity, Animated } from 'react-native'
import { Title,Text, Appbar, Caption, Portal, Provider,IconButton } from "react-native-paper";
import HorizontalItemCard from "../components/HorizontalItemCard"
import moment from "moment"
import localization from 'moment/locale/ru'

const DetailEventScreen = (props) => {
    const eventData = props.route.params
    const date = eventData.seanses ? eventData.seanses[0].date.split('/') : ''
    const [events, setevents] = useState([])
    const [refreshing, setrefreshing] = useState(false)
    let scaleValue =  new Animated.Value(0)
    const cardScale = scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1.2]
    });

  useEffect(() => {
    getData()
    Animated.timing(scaleValue, {
          toValue: 1,
          duration: 250,
          
          useNativeDriver: true
        }).start();
  }, [])

  function buyTicket(){
      alert("Пока нельзя :с ")
  }

    async function getData(){
        setrefreshing(true)
        let result = fetch("http://nefty.binarywd.com/platforms/themes/allium/afisha.json",{
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
        <ScrollView refreshControl={
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
            
                <Animated.Image 
                    source={{uri:eventData.img}}
                    style={{
                        width:'100%',height:150,
                        transform: [{ scale: cardScale }]
                  }}
                />
            
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
                    renderItem={({ item }) => <HorizontalItemCard  target="DetailEventScreen" navigation={props} {...item} />}
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

export default DetailEventScreen

const styles = StyleSheet.create({
        container:{
            backgroundColor:'#E5E5E5'
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
            fontFamily:'Roboto-Regular',
            height:'100%',
            backgroundColor:'#f1f1f1'
        },
        title:{
            fontSize:18,
            letterSpacing: -0.24,
            lineHeight:20,
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
        description:{
            marginTop:10,
            textAlign:'left',
            paddingHorizontal:15,
            fontSize:12,
            fontFamily:'Roboto-Regular',

        },
        date:{
            fontSize:20,
        },
        mainInfoContainer:{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 1,
            backgroundColor:'#fff',
            
            padding:10,
            borderRadius: 14,
            marginHorizontal:5,
        }
})
