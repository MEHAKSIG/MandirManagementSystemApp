import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import GlobalStyles from '../../shared/GlobalStyles';
import Input, { InputProps } from '../atoms/Input';

export interface BaseFormGropProps {
    label: string,
    val: string | undefined,
    setVal: any,
    required?: boolean,
    formGroupContainerStyle?: StyleProp<ViewStyle>,
    formGroupLabelStyle?: StyleProp<TextStyle>,
    hideLabel?: boolean
}
export type FormGropProps = InputProps & BaseFormGropProps;

export default function FormGroup(props: FormGropProps) {
    const { required, label, val, setVal, placeholder, keyboardType, formGroupLabelStyle, formGroupContainerStyle, hideLabel = false } = props;
    return (
        <View style={[GlobalStyles.formGroupContainer, formGroupContainerStyle]}>
            {
                !hideLabel &&
                <Text style={[GlobalStyles.formGroupLabel, formGroupLabelStyle]}>{label}
                    {required && <Text style={GlobalStyles.requiredAsterisk}>*</Text>}
                </Text>
            }
            <Input value={val} onChangeText={text => setVal(text)}
                style={{ padding: 4 }}
                placeholder={placeholder}
                keyboardType={keyboardType}
                {...props}
            />
        </View>
    )
}
