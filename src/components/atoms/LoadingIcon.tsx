import React from 'react'
import { View, Text, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native'
import Config from '../../shared/Config';

export interface LoadingIconProps {
    size?: 'large' | 'small' | undefined,
    color?: string,
    style?: StyleProp<ViewStyle>
}
export default function LoadingIcon(props: LoadingIconProps) {
    const { size = 'large', style, color = Config.appPrimaryColor } = props;
    return (
        <ActivityIndicator style={style} size={size} color={color} />
    )
}
