import React from 'react'
import { View, Text, StyleSheet,ImageBackground,TouchableOpacity } from 'react-native'
import {Button} from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment'
import localization from 'moment/locale/ru'



function ClubsCard(props){
    const date = props.seanses ? props.seanses[0].date.split('/') : ''
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => {
            props.navigation.route.navigation.navigate('DetailClubScreen',{...props})
        }}>
            <ImageBackground source={{uri:props.img}}  style={styles.card}>
                {props.seanses && 
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                        {moment(props.seanses[0].date).locale("ru", localization).format("D MMMM") + ' ' + props.seanses[0].time}
                    </Text>
                </View>}
          
            </ImageBackground >
            <View style={styles.cardFooter}>
                <Text style={styles.title}>{props.name}</Text>
                <View style={styles.divider}/>
                {props.description ?
                    <Text style={styles.description}>{props.description.slice(0,100)}</Text>
                    :
                    <View/>
                }
                <Text style={styles.readMore}>Читать новость</Text>

            </View>
         
        </TouchableOpacity>
    )
}

export default ClubsCard


const styles = StyleSheet.create({
cardContainer:{
    
    backgroundColor:'#fff',
    marginBottom:10,
}, 
  card: {
    overflow:'hidden',
   
    height:200,
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
  readMore:{
      marginTop:12,
    alignSelf:'flex-end',
    fontSize:12,
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 16,
    /* identical to box height, or 133% */
    fontFamily:'Roboto-Regular',

    textAlign: "right",
    textTransform: "uppercase",

    /* Colors/Primary/Purple */

    color: "#6979F8",
  },
  dateText:{
    fontWeight:'bold'
  },
  title:{
    fontFamily:'Roboto-Regular',
    justifyContent:'center',
    flex:2,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 24,
    color:'#000',
    fontWeight:'bold' 
  },
  description:{
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 20,
    fontFamily:'Roboto-Regular',

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
      flexDirection:'column',
      
  },
  divider:{
    backgroundColor:"#e4e4e499",
    height:1,
    marginBottom:16,
  }
})