import { View, Text, ViewStyle, StyleProp, ModalProps } from 'react-native'
import React from 'react'
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import MyText from './MyText';
import GlobalStyles from '../../shared/GlobalStyles';
import MyIconButton from './MyIconButton';

interface MyBottomSheetProps {
    children: React.ReactElement,
    title?: string,
    containerStyle?: StyleProp<ViewStyle>;
    modalProps?: ModalProps;
    backdropStyle?: StyleProp<ViewStyle>;
    onBackdropPress?(): void;
    isVisible?: boolean;
    setIsVisible?: any;
    // scrollViewProps?: ScrollViewProps;
}
export default function MyBottomSheet(props: MyBottomSheetProps) {
    const { title, containerStyle, modalProps, backdropStyle, onBackdropPress, isVisible, setIsVisible, children } = props
    return (

        <BottomSheet modalProps={modalProps} isVisible={isVisible} containerStyle={containerStyle} backdropStyle={backdropStyle} onBackdropPress={onBackdropPress}>
            <View style={[GlobalStyles.rowSpaceBetween, { backgroundColor: '#fff', padding: 4 }]} >
                {
                    title &&
                    <MyText text={title} bold fontSize={17} mt5 ml5 />
                }
                <MyIconButton iconType='Close' onPress={() => setIsVisible && setIsVisible(false)} />
            </View>
            <View style={{ minHeight: 100, backgroundColor: '#fff' }}>
                {children}
            </View>
        </BottomSheet>

    )
}