import React from 'react'
import { View, Text, TextStyle } from 'react-native'
import GlobalStyles from '../../shared/GlobalStyles';
import DropDownModalSelector, { DropDownModalSelectorProps } from '../atoms/DropDownModalSelector';

export interface BaseFormGropDDLProps {
    required?: boolean
    label: string,
    hideLabel?: boolean,
    placeholderStyle?: TextStyle,
}

export type FormGropDDLProps = DropDownModalSelectorProps & BaseFormGropDDLProps;

export default function FormGroupDDL(props: FormGropDDLProps) {
    const { required, label, placeholder, listKeyLable, onChange, hideLabel = false, selectStyle, placeholderStyle } = props;

    return (
        <View style={GlobalStyles.formGroupContainer}>
            {
                !hideLabel &&
                <Text style={GlobalStyles.formGroupLabel}>{label}
                    {required && <Text style={GlobalStyles.requiredAsterisk}>*</Text>}
                </Text>
            }
            <DropDownModalSelector listKeyLable={listKeyLable} placeholder={placeholder}
                onChange={onChange}
                selectStyle={selectStyle}
                initValueTextStyle={placeholderStyle}
            />
        </View>
    )
}
