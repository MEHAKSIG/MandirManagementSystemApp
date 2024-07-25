import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { Card, ListItem, Button, Icon, CardProps } from 'react-native-elements'

export interface MyCardBaseProps {
    title: string,
    showTitleDivider?: boolean,
    titleStyle?: StyleProp<TextStyle>,
    children: React.ReactElement
}
export type MyCardProps = MyCardBaseProps & CardProps;

export default function MyCard(props: MyCardProps) {
    const { title, showTitleDivider = true, containerStyle, wrapperStyle, titleStyle, children } = props;
    return (
        <View>
            <Card containerStyle={containerStyle} wrapperStyle={wrapperStyle}>
                <Card.Title style={[{ fontSize: 18 }, titleStyle]}>{title}</Card.Title>
                {
                    showTitleDivider && <Card.Divider />
                }
                {children}

            </Card>
        </View>
    )
}