import React, { useEffect, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Button, StyleSheet
} from 'react-native';

// import CameraRoll from '@react-native-community/cameraroll';
import Swiper from 'react-native-swiper';
import { BaseProps } from '../Dashboard/DashboardScreen';
import Config, { ScreenNames } from '../../shared/Config';
import ContextMenuIcons, { ContextMenu } from '../../components/organisms/ContextMenuIcons';
import { navigateToAddEventScreen, navigateToAddPhotoScreen } from '../../shared/Routes';
import { StackParamList } from '../../navigation/Types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import YoutubeIframe from 'react-native-youtube-iframe';
import FormGroupDDL from '../../components/molecules/FormGroupDDL';
import { DropDownModel } from '../../components/atoms/DropDownModalSelector';
import { getUserDetail } from '../../services/DataStorageService';
import { GetAllMandirs } from '../../services/RegistrationService';

const VideosScreen = (props: BaseProps) => {
  const { navigation, route } = props;

  const mandirsList: DropDownModel[] = [
    // { key: '', label: 'Select' },
    { key: 'Mandir 1', label: 'Mandir 1' },
    { key: 'Mandir 2', label: 'Mandir 2' },

  ];
  const [listMandirs, setListMandirs] = React.useState<DropDownModel[]>([]);
  const [mandirVal, setMandirVal] = React.useState<string>('');
  const [mandirLabel, setMandirLabel] = React.useState('Select');
  const [detailViewVisible, setDetailViewVisibility] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const hardcodedImageUrls :string []= [
  
  ];
  const initilizeData = async () => {

    const user = await getUserDetail();
    // console.log(isAdminUser, "isAdminUser");
    if (user) {
        setIsSuperAdmin(user?.isSuperAdmin);
        // setMandirId(user?.mandirId);
        await getAllMandirs();
        //  getAllEvents();
    }
}

const bindContextMenu = async () => {
    const contextMenu: ContextMenu[] = [
        // { type:'REFRESH', size: 28, color: '#fff' },
        // { type: 'ADD', size: 33, color: '#fff' },
        // { type: 'CHANGE_PASSWORD', size: 33, color: '#fff' },
        { type: 'LOGOUT', size: 28, color: '#fff' },
    ];

    navigation.setOptions({
        headerTitle: "Video Gallery",
        headerRight: () =>
        (<ContextMenuIcons
            menus={contextMenu}
            onPress={(val) => {
                if (val == 'ADD') {
                    navigateToAddPhotoScreen(navigation, ScreenNames.PHOTO_GALLERY_SCREEN,+mandirVal);
                }
            }}
        />)
    });
};
const getAllMandirs = async () => {
    setIsLoading(true);

    try {
        const res = await GetAllMandirs('');

        console.log(res, "GetAllMandirs-list")
        // Map the rest of the items
        const list = res.list.map((x: any) => ({
            key: x.mandirId,
            label: x.mandirName.trim(),
        }));
        const user = await getUserDetail();

        if (user?.isSuperAdmin) {
            setMandirVal(list[0]?.key?.toString());
            setMandirLabel(list[0]?.label);
            console.log(list[0]?.key, mandirVal, "selectedMandir")
            // getAllEvents(list[0]?.key, customerName);
        } else if (!user?.isSuperAdmin && user?.mandirId > 0) {
            // Search for the item in the list whose key matches the mandirId
            const selectedMandir = list.find((item: { key: number; label: string }) => item.key === user.mandirId);
            if (selectedMandir) {
                // console.log(selectedMandir, "selectedMandir")
                setMandirVal(selectedMandir?.key?.toString());
                setMandirLabel(selectedMandir?.label);
                // getAllEvents(selectedMandir?.key, customerName);
            }
        }


        setListMandirs(list);

    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
};
useEffect(() => {
  initilizeData();
  bindContextMenu();
  console.log("workingggggggggggggggg")
}, []);

  return (
    <View style={{ flex:1,  }}>
       
    {!detailViewVisible && (
     <View style={{ marginHorizontal: 5, marginBottom: 5 }}>
      {isSuperAdmin &&
                    <FormGroupDDL
                        label="Select Mandir"
                        listKeyLable={listMandirs}
                        placeholder={mandirLabel}
                        onChange={(key, label) => {

                            setMandirVal(key);


                            setMandirLabel(label);

                        }}
                    />
                }
     </View>
   )}
      
    <ScrollView>
      {
        detailViewVisible
          ? (
            <Swiper
              loop={false}
              index={selectedIndex}
            >
              {
                hardcodedImageUrls.map(
                  (uri, index) => (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        // alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#333',
                      }}
                    >

                      <YoutubeIframe
                        webViewStyle={{
                          // width: "100%",
                          // flex: 1
                        }}
                        height={300}
                        play={false}
                        videoId={uri}
                      // onChangeState={onStateChange}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 60,
                          alignSelf: 'center'
                        }}
                      >
                        <Button
                          title="Close"
                          onPress={() => {
                            setDetailViewVisibility(false)
                          }}
                        />
                      </View>
                    </View>
                  )
                )
              }
            </Swiper>
          )
          : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {
                hardcodedImageUrls.map(
                  (uri, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        height: 57,
                        minWidth: 100,
                        flex: 1
                      }}
                      onPress={() => {
                        setDetailViewVisibility(true)
                        setSelectedIndex(index)
                      }}
                    >

                      <YoutubeIframe
                        webViewStyle={{
                          // height: 100,
                          // minWidth: 100,
                          // flex: 1
                        }}
                        height={100}
                        play={false}
                        videoId={uri}
                      // onChangeState={onStateChange}
                      />
                    </TouchableOpacity>
                  )
                )
              }
            </View>
          )
      }
    </ScrollView>
    </View>
  );
};

export default VideosScreen

