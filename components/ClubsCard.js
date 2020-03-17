import React from 'react'
import { View, Text, StyleSheet,ImageBackground,TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment'
import localization from 'moment/locale/ru'

function ClubsCard(props){
    const date = props.seanses ? props.seanses[0].date.split('/') : ''
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => {
            props.navigation.route.navigation.navigate('DetailClubScreen',{...props})
        }}>
            <ImageBackground source={{uri:props.img.url}}  style={styles.card}>
                {props.seanses && 
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                        {moment(props.seanses[0].date).locale("ru", localization).format("D MMMM") + ' ' + props.seanses[0].time}
                    </Text>
                </View>}
          
            </ImageBackground >
            <View style={styles.cardFooter}>
                <Text style={styles.title}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ClubsCard


const styles = StyleSheet.create({
cardContainer:{
    paddingTop:10,
    backgroundColor:'#fff',
    marginBottom:10,
}, 
  card: {
    overflow:'hidden',
    borderRadius:30,
    height:170,
    width:'100%',
    
  },
  dateContainer:{
      shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
      backgroundColor:'#fff',
      width:150,
      paddingVertical:5,
      margin:10,
      textAlign:'center',
      alignItems:'center',
      borderRadius:5,
      
  },
  dateText:{
    fontWeight:'bold'
  },
  title:{
    justifyContent:'center',
    flex:2,
    color:'#000',
    fontWeight:'bold' 
  },
  buttonText:{
      color:'#fff'
  },
  button:{
    width:100,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#F50000',
    borderRadius:5,
    height:30,
    marginRight:20,
    flex:1,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cardFooter:{
      backgroundColor:'#fff',
      paddingVertical:16,
      paddingHorizontal:10,
      alignItems:'center',
      left:0,
      right:0,
      flexDirection:'row',
      
  },
  divider:{
    backgroundColor:"#990000",
    height:2,
    borderRadius:5,
  }
})