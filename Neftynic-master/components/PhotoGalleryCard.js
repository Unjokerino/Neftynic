import React from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native'

export default function PhotoGalleryCard(props){
   
    return(
        <TouchableOpacity onPress={() => props.navigation.navigate('DetailGalleryScreen',{...props})} style={styles.cardContainer}>
            <Image style={styles.image} source={{uri:props.img}}/>
            <Text style={styles.title}>{props.name}</Text>
        </TouchableOpacity>
    )
}

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