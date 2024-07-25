import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import AuthContext from '../../context/AuthContext';
import { GenerateUUID } from '../../services/CommonService';
import { clearAsyncStorage } from '../../services/DataStorageService';
import { ContextMenuType } from '../../shared/Config';
import GlobalStyles from '../../shared/GlobalStyles';
import { LoginIcon, LogoutIcon, PasswordIcon, PlusIcon, RefreshIcon } from '../../shared/Icons';
import CommonContextMenu from '../molecules/CommonContextMenu';

export interface ContextMenu {
    type: ContextMenuType,
    size?: number,
    color?: string
}
export interface ContextMenuIcons {
    menus: ContextMenu[],
    onPress: (menuType: string) => void
}
export default function ContextMenuIcons(props: ContextMenuIcons) {
    const { menus, onPress } = props;
    const { onAuthenticationSuccess } = React.useContext(AuthContext);

    const onLogoutClick = () => {

        // onPress(menu.type);
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


    }


    const MenuButton = ({ menu, onPress }: { menu: ContextMenu, onPress: (selectedMenu: string) => void }) => {

        const handlePress = () => {
            onPress(menu.type);
        };

        switch (menu.type) {
            case "REFRESH":
                return (
                    <View>
                        <TouchableOpacity onPress={handlePress} style={{ marginRight: 8 }}>
                            <RefreshIcon size={menu.size} color={menu.color} />
                        </TouchableOpacity>
                    </View>
                );
            case "ADD":
                return (
                    <View>
                        <TouchableOpacity onPress={handlePress} style={{ marginRight: 8 }}>
                            <PlusIcon size={menu.size} color={menu.color} />
                        </TouchableOpacity>
                    </View>
                );
            case "CHANGE_PASSWORD":
                return (
                    <View>
                        <TouchableOpacity onPress={handlePress} style={{ marginRight: 8 }}>
                            <PasswordIcon size={menu.size} color={menu.color} />
                        </TouchableOpacity>
                    </View>
                );
            case "LOGOUT":
                return (
                    <View>
                        <TouchableOpacity onPress={onLogoutClick} style={{ marginRight: 8 }}>
                            <LogoutIcon size={menu.size} color={menu.color} />
                        </TouchableOpacity>
                    </View>
                );
                case "LOGIN":
                return (
                    <View>
                        <TouchableOpacity onPress={handlePress} style={{ marginRight: 8 }}>
                            <LoginIcon size={menu.size} color={menu.color} />
                        </TouchableOpacity>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={GlobalStyles.rowFlexEnd}>
            {menus.map((menu, index) => (
                <MenuButton key={index} menu={menu} onPress={onPress} />
            ))}
        </View>
    );

    
}
