import { View, Text, Linking, ViewStyle, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppColors } from '../../shared/Config';
import GlobalStyles from '../../shared/GlobalStyles';
import MyText from './MyText';

interface CallableMobileNoProps {
    mobileNo: string,
    lable?: string,
    lableBold?: boolean,
    style?: StyleProp<ViewStyle> | undefined,
    textStyle?: StyleProp<TextStyle> | undefined;
}
export default function CallableMobileNo(props: CallableMobileNoProps) {
    const { mobileNo, lable, lableBold, style, textStyle } = props;

    const handlePress = () => {
        Linking.openURL(`tel:${mobileNo}`);
    }

    return (
        <TouchableOpacity disabled={mobileNo?.length < 10} onPress={handlePress} style={[style]}>
            <Text style={[{ color: AppColors.appPrimaryColor }, textStyle]}>
                {lable && <MyText text={lable} color='black' bold={lableBold} />}
                {mobileNo}
            </Text>
        </TouchableOpacity>
    )
}