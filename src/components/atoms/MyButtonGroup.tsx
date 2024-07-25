import { StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { ButtonGroup } from '@rneui/themed';

interface MyButtonGroupProps {
    buttons: string[],
    onPress?: (selectedIndex: number) => void,
    selectedIndex?: number | null,
    containerStyle?: StyleProp<ViewStyle>,
    vertical?: boolean,
    selectMultiple?: boolean
}

export default function MyButtonGroup(props: MyButtonGroupProps) {
    const { buttons, selectMultiple, onPress, selectedIndex, containerStyle, vertical = false } = props;
    return (
        <ButtonGroup
            onPress={onPress}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={containerStyle}
            vertical={vertical}
            selectMultiple={selectMultiple}
        />
    )
}