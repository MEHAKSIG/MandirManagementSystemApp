import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { CameraPlusIcon, CloseIcon, FilterIcon, ImageMultipleIcon } from '../../shared/Icons';
import Config from '../../shared/Config';

interface MyIconButtonProps {
    iconType?: 'CameraPlus' | 'ViewPhoto' | 'Filter' | 'Close',
    iconColor?: string,
    iconSize?: number,
    children?: React.ReactElement,
    onPress?: () => void,
    disabled?: boolean,
    buttonText?: string,
    style?: StyleProp<ViewStyle> | undefined;
    mb5?: boolean,
    mt5?: boolean,
    ml5?: boolean,
    mr5?: boolean,
    m5?: boolean,
    m10?: boolean,
}
export default function MyIconButton({
    children, onPress, disabled, style, buttonText,
    iconType, iconColor, iconSize, mb5, ml5, mr5, mt5, m5, m10 }: MyIconButtonProps) {

    const mt5Style: ViewStyle = mt5 ? { marginTop: 5 } : {};
    const mb5Style: ViewStyle = mb5 ? { marginBottom: 5 } : {};
    const ml5Style: ViewStyle = ml5 ? { marginLeft: 5 } : {};
    const mr5Style: ViewStyle = mr5 ? { marginRight: 5 } : {};
    const m5Style: ViewStyle = m5 ? { margin: 5 } : {};
    const m10Style: ViewStyle = m10 ? { margin: 10 } : {};
    //mt5, mb5, ml5, mr5, 
    return (
        <TouchableOpacity style={[mt5Style, mb5Style, ml5Style, mr5Style, m5Style, m10Style, style]} onPress={onPress} disabled={disabled}>
            {
                buttonText &&

                <Text>{buttonText}</Text>
            }
            {children ?? <></>}
            {iconType && iconType == 'CameraPlus' && (
                <CameraPlusIcon size={iconSize ?? 35} color={iconColor ?? Config.appPrimaryColor} />
            )}
            {iconType && iconType == 'ViewPhoto' && (
                <ImageMultipleIcon size={iconSize ?? 35} color={iconColor ?? Config.appPrimaryColor} />
            )}
            {iconType && iconType == 'Filter' && (
                <FilterIcon size={iconSize ?? 35} color={iconColor ?? Config.appPrimaryColor} />
            )}
            {iconType && iconType == 'Close' && (
                <CloseIcon size={iconSize ?? 35} color={iconColor ?? Config.appPrimaryColor} />
            )}
        </TouchableOpacity>
    )
}