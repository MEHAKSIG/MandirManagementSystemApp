import { View, Text, TextStyle } from 'react-native'
import React from 'react'

interface MyTextBaseProps {
    text?: string,
    label?: string,
    children?: string,
    textFont?: 'Normal' | 'source-sans' | 'space-mono',
    labelBold?: boolean,
    bold?: boolean,
    center?: boolean,
    color?: string,
    mb5?: boolean,
    mt5?: boolean,
    ml5?: boolean,
    mr5?: boolean,
    alignRight?: boolean,
    fontSize?: number
}

export type MyTextProps = MyTextBaseProps & Text['props'];

export default function MyText(props: MyTextProps) {

    const { label, labelBold, text, center, textFont, children, bold, color, mb5, ml5, mr5, mt5, fontSize, alignRight } = props;

    const fontFamily: TextStyle = textFont == 'Normal' ? {} : { fontFamily: textFont }
    const boldStyle: TextStyle = bold ? { fontWeight: 'bold' } : {};
    const centerStyle: TextStyle = center ? { textAlign: 'center' } : {};
    const lableBoldStyle: TextStyle = labelBold ? { fontWeight: 'bold' } : {};
    const colorStyle: TextStyle = color ? { color: color } : {};
    const mt5Style: TextStyle = mt5 ? { marginTop: 5 } : {};
    const mb5Style: TextStyle = mb5 ? { marginBottom: 5 } : {};
    const ml5Style: TextStyle = ml5 ? { marginLeft: 5 } : {};
    const mr5Style: TextStyle = mr5 ? { marginRight: 5 } : {};
    const alignRightStyle: TextStyle = alignRight ? { alignSelf: 'flex-end' } : {};
    const fontSizeStyle: TextStyle = fontSize ? { fontSize: fontSize } : {};

    return (
        <Text {...props} style={[props.style, fontSizeStyle, centerStyle, alignRightStyle, fontFamily, boldStyle, colorStyle, mt5Style, mb5Style, ml5Style, mr5Style]}>
            {label && <Text style={[lableBoldStyle]}>{label}</Text>}
            {text}
            {children}
        </Text>
    )
}