import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { AppColors } from '../../shared/Config';

export default function EmptyListMessage(props: { text?: string }) {
    const { text } = props;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={require('../../../assets/icons/empty_box.png')} style={styles.image} />
                <Text style={styles.text}>{text != null ? text : "No Data Found"}</Text>
            </View>
        </View>
        // <View style={styles.container}>
        //     <Image source={require("../../../assets/icons/empty_box.png")} style={styles.image} />
        //     <Text style={styles.text}>
        //         {text != null ? text : "No Data Found"}
        //     </Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40%'
    },
    image: {
        width: 130,
        height: 130,
    },
    text: {
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'bold',
        color: AppColors.appThirdColor
    },
});


