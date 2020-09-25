import React from 'react'
import { View, Text } from 'react-native'
import { Appbar, Title, FAB, Portal, Provider } from "react-native-paper";
import { WebView } from 'react-native-webview';

const WebViewScreen = (props) => {
    const eventData = props.route.params
    console.log(eventData.name)
    const time = eventData.seanses ? eventData.seanses[0].time : null
    const date = eventData.seanses ? eventData.seanses[0].date : null
    const url = `https://api.kinobilety.net/api/getHallplan?host=xn----gtbemkpb3brp9h.xn--p1ai&cityId=179&marketId=2588&theatreId=538&filmName=${eventData.name}&showDate=${date}&showTime=${time}`

    return (
        <View style={{ flex: 1 }}>

            <View
                style={{
                    height: 30,
                    backgroundColor: '#990000'
                }}
            />
            <Appbar
                style={{
                    elevation: 0,
                    backgroundColor: '#990000'
                }}
            >
                <Appbar.Action
                    icon="arrow-left"
                    onPress={() => props.navigation.goBack()}
                />
                <Appbar.Content title={eventData.name} />
            </Appbar>

            <WebView source={{ uri: url }} />
        </View>
    )
}

export default WebViewScreen
