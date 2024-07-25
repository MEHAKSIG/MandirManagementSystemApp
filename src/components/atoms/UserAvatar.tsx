import React from 'react'
import { View, Text, Image } from 'react-native'
import { UserIcon, UserIcon2 } from '../../shared/Icons'

export default function UserAvatar(props: { username: string, groupName?: string }) {
    return (
        <View style={{ flex: 1, padding: 10, alignContent: 'center', alignItems: 'center' }}>
            <View style={{ marginBottom: 10 }}  >
                <UserIcon size={40} />
            </View>
            <Text>{props?.groupName}</Text>
            <Text style={{ fontSize: 13, marginTop: 5, color: 'gray' }}>{props.username}</Text>

        </View>
    )
}
