import { View, Text } from 'react-native'
import React from 'react'
import { Colors, SearchBar } from '@rneui/themed';

interface MySearchBarProps {
    val?: string | undefined,
    setVal?: any,
    placeholder?: string,
    showLoading?: boolean,
    onChangeText?: (searchTerm: string) => void
}
export default function MySearchBar(props: MySearchBarProps) {
    const { val, placeholder, setVal, onChangeText, showLoading } = props;

    const onChange = (searchTerm: string) => {
        setVal && setVal(searchTerm);
        onChangeText && onChangeText(searchTerm);
    }

    return (
        <SearchBar
            platform='android'
            style={{ fontSize: 15, padding: 0, margin: 0 }}
            // theme={{ }}
            showLoading={showLoading}
            placeholder={placeholder ?? "Type Here..."}
            onChangeText={onChange}
            value={val}
        />
    )
}