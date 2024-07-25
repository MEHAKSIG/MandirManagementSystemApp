import { View, Text, ActivityIndicator, StyleProp, ViewStyle, ColorValue } from 'react-native'
import React from 'react'
import Config from '../../shared/Config';

interface LoaderIconProps {
    size?: number | 'small' | 'large' | undefined,
    style?: StyleProp<ViewStyle> | undefined;
    color?: ColorValue | undefined;
    animating?: boolean | undefined;
    hidesWhenStopped?: boolean | undefined;
}
export default function LoaderIcon(props: LoaderIconProps) {
    const { size = 'large', style, color = Config.appPrimaryColor, animating, hidesWhenStopped } = props;
    return (
        <ActivityIndicator style={style} size={size} color={color} animating={animating} hidesWhenStopped={hidesWhenStopped} />
    )
}