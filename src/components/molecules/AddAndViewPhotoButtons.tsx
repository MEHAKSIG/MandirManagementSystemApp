import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { getSettingsLocalStorage } from '../../services/DataStorageService';
import GlobalStyles from '../../shared/GlobalStyles';
import MyIconButton from '../atoms/MyIconButton';
import { CameraPlusIcon, ImageMultipleIcon } from '../../shared/Icons';
import Config from '../../shared/Config';

interface AddAndViewPhotoButtonsProps {
    onAddPhotoClick: () => void,
    onViewPhotoClick: () => void,
    position?: 'center' | 'left' | 'right'

}
export default function AddAndViewPhotoButtons({ onAddPhotoClick, onViewPhotoClick, position = 'left' }: AddAndViewPhotoButtonsProps) {
    const [isPhotoAllowed, setIsPhotoAllowed] = React.useState(false);

    let positionStyle: StyleProp<ViewStyle>;
    if (position == 'center') positionStyle = GlobalStyles.rowCenter
    if (position == 'left') positionStyle = GlobalStyles.rowFlexStart
    if (position == 'right') positionStyle = GlobalStyles.rowFlexEnd

    React.useEffect(() => {
        (async () => {
            const settings = await getSettingsLocalStorage();
            console.log(settings, "settings");
            setIsPhotoAllowed(settings.allowAddCustomerPhoto);
        })();

    }, [])

    return (
        <>
            {
                isPhotoAllowed &&
                <View style={[positionStyle, { marginTop: 10 }]}>
                    <MyIconButton iconType='CameraPlus' style={{ marginRight: 15 }} onPress={onAddPhotoClick} />
                    {/* <CameraPlusIcon size={35} color={Config.appPrimaryColor} /> */}

                    <MyIconButton iconType='ViewPhoto' onPress={onViewPhotoClick} />
                    {/* <ImageMultipleIcon size={35} color={'green'} /> */}
                    {/* </MyIconButton> */}
                </View>
            }
        </>
    )
}