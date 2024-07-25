import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

interface MyGradiantCardProps {
    children: React.ReactElement,
    onPress?: () => void,
    disable?: boolean | undefined,
    containerStyle?: StyleProp<ViewStyle> | undefined,
    gradiantColors: string[]
}
export default function MyGradiantCard(props: MyGradiantCardProps) {
    const { children, gradiantColors, disable, onPress, containerStyle } = props;
    return (
        <TouchableOpacity disabled={disable} onPress={onPress} style={[styles.bodyCard, containerStyle]}>
            <LinearGradient
                colors={gradiantColors}
                // colors={['#FF6B6B', '#FFD6AD']}
                start={[0, 0.5]}
                end={[1, 0.5]}
                style={styles.gradient}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bodyCard: {
        flex: 1,
        height: 120,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    gradient: {
        flex: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    icon: {
        marginRight: 16,
    },
    bodyCardText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    bodyCardNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
});
