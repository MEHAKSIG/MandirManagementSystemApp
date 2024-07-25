import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements';

export interface MyCheckboxProps {
    title?: string,
    val: boolean,
    setVal: any,
    onPress?: (isChecked: boolean) => void,
    center?: boolean,
    size?: number;
    checkedColor?: string,
    checkedIcon?: string | React.ReactElement<{}>;
    uncheckedIcon?: string | React.ReactElement<{}>;
    checkedTitle?: string,
    uncheckedColor?: string
    iconRight?: boolean,
    right?: boolean,
    checkboxStyle?: StyleProp<ViewStyle> | undefined;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean | undefined;
}

export default function MyCheckBox(props: MyCheckboxProps) {
    const { title, val, setVal, onPress, center, checkedColor, checkedIcon, checkedTitle, uncheckedColor, uncheckedIcon, iconRight, right, size, checkboxStyle, textStyle, disabled } = props;
    return (
        <CheckBox
            disabled={disabled}
            center={center}
            title={title}
            textStyle={textStyle}
            checked={val}
            onPress={() => {
                setVal && setVal(!val)
                onPress && onPress(!val);
            }}
            checkedColor={checkedColor}
            checkedIcon={checkedIcon}
            checkedTitle={checkedTitle}
            iconRight={iconRight}
            right={right}
            size={size}
            style={checkboxStyle}
            uncheckedColor={uncheckedColor}
            uncheckedIcon={uncheckedIcon}
            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
        />
    )
}
