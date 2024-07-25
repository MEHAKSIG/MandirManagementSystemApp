import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import AuthContext from '../../context/AuthContext';
import { clearAsyncStorage } from '../../services/DataStorageService';
import GlobalStyles from '../../shared/GlobalStyles'
import { LogoutIcon, RefreshIcon } from '../../shared/Icons'

export interface CommonContextMenuProps {
    showRefresh?: boolean,
    onRefreshPress?: () => void,
    size?: number

}
export default function CommonContextMenu(props: CommonContextMenuProps) {
    const { showRefresh = false, onRefreshPress, size = 25 } = props;
    const { onAuthenticationSuccess } = React.useContext(AuthContext);


    return (
        <View style={GlobalStyles.rowFlexEnd}>
            {
                showRefresh &&

                <TouchableOpacity style={{ marginRight: 8 }} onPress={onRefreshPress}>
                    <RefreshIcon />
                </TouchableOpacity>
            }
            <TouchableOpacity
                style={{ marginRight: 8 }}
                onPress={() => {
                    // navigation.navigate("Help");


                    Alert.alert(
                        "Confirmation",
                        "Are you sure want to logout?",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                            },
                            {
                                text: "Yes",
                                onPress: () => {
                                    // console.log("OK Pressed")
                                    clearAsyncStorage();

                                    onAuthenticationSuccess && onAuthenticationSuccess(false);
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                }}
            >
                <LogoutIcon color='#fff' size={size} />
            </TouchableOpacity>

        </View>
    )
}
