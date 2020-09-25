import React from 'react'
import { View, Text, StyleSheet,ImageBackground,TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment'
import localization from 'moment/locale/ru'

function ItemCard(props){
    const date = props.seanses ? props.seanses[0].date.split('/') : ''
    return (
        <TouchableOpacity onPress={() => {
            props.navigation.route.navigation.navigate('DetailEventScreen',{...props})
        }}>
            <ImageBackground source={{uri:props.img}}  style={styles.card}>
                {props.seanses && 
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                    {moment(props.seanses[0].date).locale("ru", localization).format("D MMMM") + ' ' + props.seanses[0].time}
                    </Text>
                </View>}
                <LinearGradient transparent={true}  colors={['#ffffff00', '#000000ad']} style={styles.cardFooter}>
                    <Text style={styles.title}>{props.name}</Text>
                    <TouchableOpacity onPress={() => {
                            props.navigation.route.navigation.navigate('DetailEventScreen',{...props})
                        }} style={styles.button}>
                        <Text style={styles.buttonText}>Купить</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground >
            <View style={styles.divider}/>
        </TouchableOpacity>
    )
}

export default ItemCard


const styles = StyleSheet.create({
  card: {
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
    fontWeight:'bold',
    fontFamily:'Roboto-Regular',

  },
  title:{
    justifyContent:'center',
    flex:2,
    color:'#fff',
    fontWeight:'bold',
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
    alignSelf:'center',
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cardFooter:{
      position:'absolute',
      bottom:0,
      height:'50%',
      paddingVertical:5,
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