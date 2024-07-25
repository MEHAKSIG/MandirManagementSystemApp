import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import GlobalStyles from '../../shared/GlobalStyles';
import MyCheckBox, { MyCheckboxProps } from '../atoms/MyCheckBox';

export interface BaseFormGroupCheckBoxProps {
    label: string,
    formGroupContainerStyle?: StyleProp<ViewStyle>,
    formGroupLabelStyle?: StyleProp<TextStyle>,
}

export type FormGroupCheckBoxProps = BaseFormGroupCheckBoxProps & MyCheckboxProps;

export default function FormGroupCheckBox(props: FormGroupCheckBoxProps) {

    const { val, setVal, label, textStyle, formGroupContainerStyle, formGroupLabelStyle, checkedColor, checkedTitle, onPress, size, uncheckedColor, uncheckedIcon, checkboxStyle, disabled } = props;
    return (
        <View style={[GlobalStyles.formGroupContainer, formGroupContainerStyle]}>
            {/* <Text style={[GlobalStyles.formGroupLabel, formGroupLabelStyle]}>{label}</Text> */}
            <MyCheckBox
                disabled={disabled}
                textStyle={textStyle}
                title={label}
                val={val}
                setVal={setVal}
                onPress={onPress}
                checkedColor={checkedColor}
                checkedTitle={checkedTitle}
                size={size}
                uncheckedColor={uncheckedColor}
                uncheckedIcon={uncheckedIcon}
                checkboxStyle={checkboxStyle}
            />
        </View>
    )
}
