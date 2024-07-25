import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import GlobalStyles from '../../shared/GlobalStyles';
import MyRadioButton, { MyRadioButtonProps } from '../atoms/MyRadioButton';


export interface BaseFormGroupRadioBoxProps {
    label: string |undefined,
    formGroupContainerStyle?: StyleProp<ViewStyle>,
    formGroupLabelStyle?: StyleProp<TextStyle>,
}

export type FormGroupRadioBoxProps = BaseFormGroupRadioBoxProps & MyRadioButtonProps;

export default function FormGroupRadioButton(props: FormGroupRadioBoxProps) {

    const { val, setVal, label, formGroupContainerStyle, formGroupLabelStyle, onPress } = props;
    return (
        <View style={[GlobalStyles.formGroupContainer, formGroupContainerStyle]}>
            {/* <Text style={[GlobalStyles.formGroupLabel, formGroupLabelStyle]}>{label}</Text> */}
            <MyRadioButton title={label} val={val} setVal={setVal} onPress={onPress} 
            checkedIcon="dot-circle-o"  uncheckedIcon="circle-o" />
        </View>
    )
}
