import React from 'react'
import { View, Text, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native'
import Config from '../../shared/Config'
import LoaderIcon from '../atoms/LoaderIcon';

export interface LoaderProps {
    loadingText?: string,
    containerStyle?: StyleProp<ViewStyle>,
    loadingTextStyle?: StyleProp<TextStyle>,
}
export default function Loader(props: LoaderProps) {
    const { loadingText, containerStyle, loadingTextStyle } = props;
    return (
        <View
            style={[{
                flex: 1,
                // justifyContent: "center",
                // flexDirection: "row",
                justifyContent: "center",
                padding: 10,
            }, containerStyle]}
        >
            <View style={{}}>
                {/* <ActivityIndicator size="large" color={Config.appPrimaryColor} /> */}
                <LoaderIcon size={"large"} color={Config.appPrimaryColor} />
                <Text style={[{ textAlign: "center", color: '#000' }, loadingTextStyle]}>
                    {loadingText ?? "Loading...."}
                </Text>
            </View>
        </View>
    )
}
