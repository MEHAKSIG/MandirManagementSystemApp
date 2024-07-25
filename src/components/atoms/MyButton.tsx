import React from 'react'
import { StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native'
import { Button } from 'react-native-elements';
import Config, { AppColors } from '../../shared/Config';
import GlobalStyles from '../../shared/GlobalStyles';

export interface MyButtonProps {
    text?: string,
    children?: string,
    type?: 'outline' | 'clear' | 'solid',
    loading?: boolean,
    buttonStyle?: ViewStyle,
    containerStyle?: ViewStyle,
    onPress?: (event: any) => void,
    disabled?: boolean,
    icon?: React.ReactElement,
    iconContainerStyle?: StyleProp<ViewStyle>,
    iconRight?: boolean;
    iconPosition?: 'left' | 'right' | 'top' | 'bottom';
    mb5?: boolean,
    mt5?: boolean,
    ml5?: boolean,
    mr5?: boolean,
    width100Percent?: boolean,
    paddingVertical?: number,
    color?: string,
    textColor?: string,
    fontSize?: number
}
export default function MyButton(props: MyButtonProps) {
    const { text, children, type = 'solid', loading, buttonStyle, containerStyle, disabled, onPress, icon, iconContainerStyle, iconRight, iconPosition, mb5, ml5, mr5, mt5, width100Percent = true, paddingVertical = 10, color = Config.appPrimaryColor, textColor = AppColors.whiteColor, fontSize } = props;

    const mt5Style: ViewStyle = mt5 ? { marginTop: 5 } : {};
    const mb5Style: ViewStyle = mb5 ? { marginBottom: 5 } : {};
    const ml5Style: ViewStyle = ml5 ? { marginLeft: 5 } : {};
    const mr5Style: ViewStyle = mr5 ? { marginRight: 5 } : {};
    const width100PerStyle: ViewStyle = width100Percent ? { width: '100%' } : {};
    const verticalPaddingStyle: ViewStyle = { paddingVertical: paddingVertical };
    const fontSizeStyle: TextStyle = fontSize ? { fontSize: fontSize } : {};

    return (
        <Button
            onPress={onPress}
            containerStyle={[width100PerStyle, containerStyle, mt5Style, mb5Style, ml5Style, mr5Style]}
            buttonStyle={[verticalPaddingStyle, { backgroundColor: type == 'solid' ? color : 'transparent' }, buttonStyle]}
            titleStyle={[{ color: textColor }, fontSizeStyle]}
            type={type ?? 'solid'}
            title={text ?? children}
            loading={loading}
            disabled={disabled}
            icon={icon}
            iconContainerStyle={iconContainerStyle}
            iconRight={iconRight}
            iconPosition={iconPosition}
        />
    )
}
const styles = StyleSheet.create({
    // buttonStyle: {
    //     paddingVertical: 15,
    //     // backgroundColor: Config.appPrimaryColor

    // },
    // containerStyle: {
    //     width: '100%',
    // }
})