import React, { useEffect, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Button, StyleSheet, Alert
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
import { Delete_EventImage, Find_GaleryByEventId } from '../../services/EventsService';
type Props = {
  navigation: StackNavigationProp<StackParamList, 'AlbumPhotosScreen'>;
  route: RouteProp<StackParamList, 'AlbumPhotosScreen'>;
};
const AlbumPhotosScreen = (props: Props) => {
  const { navigation, route } = props;
  const { eventID, mandirID,isSuperAdmin } = route.params;
  console.log(eventID, mandirID, "eventID, mandirID")
  const [detailViewVisible, setDetailViewVisibility] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [imagesList, setImagesList] = React.useState<{ eventImageId: number, filePath: string }[]>([]);
  const hardcodedImageUrls = [
    'https://www.shreehindutemple.net/wp-content/uploads/Holi-2024.jpg',
    'https://www.shreehindutemple.net/wp-content/uploads/shree-ram-navami-2024.jpg',


  ];
  const bindContextMenu = async () => {
   
    let contextMenu: ContextMenu[] = [
        { type: 'LOGOUT', size: 28, color: '#fff' },
    ];

    if (!isSuperAdmin) {
        contextMenu.unshift({ type: 'ADD', size: 33, color: '#fff' });
    }

    navigation.setOptions({
        headerTitle: "Album Photos",
        headerRight: () =>
        (<ContextMenuIcons
            menus={contextMenu}
            onPress={(val) => {
                if (val == 'ADD') {
                  navigateToAddPhotoScreen(navigation, ScreenNames.PHOTO_GALLERY_SCREEN,mandirID,eventID);
                }
            }}
        />)
    });
};
  
  const find_GaleryByEventId = async () => {
    try {
      if (eventID && mandirID) {
        setIsLoading(true);
        const res = await Find_GaleryByEventId(eventID, mandirID);
        const apiRootUrl2 = Config?.apiRootUrl2;
        console.log(res?.list, "un-modifiedList")
        // Extracting only eventImageId and filePath from each item in res?.list
        const modifiedList = res?.list?.map((item: any) => ({
          eventImageId: item?.eventImageId,
          filePath: apiRootUrl2! + item?.filePath // Concatenating apiRootUrl2 with filePath
        }));

        // Setting the modified list containing only eventImageId and modified filePath
        setImagesList(modifiedList);
        console.log(modifiedList, "modifiedList")
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error occurred while fetching and processing data:', error);
      // Handle error as needed, e.g., displaying an error message to the user
    }
  }

  const delete_EventImage = async (imageId: number) => {
    // Display confirmation dialog
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this Image?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            setIsLoading(true);
            try {
              const res = await Delete_EventImage(imageId);
              if (res?.successMsg) {
                setIsLoading(false);
                setDetailViewVisibility(false);
                alert(res?.successMsg);
                find_GaleryByEventId();
              } else {
                console.log(res?.errorMsg, "delete_EventImage-errorMsg")
              }
            } catch (error) {
              console.error(error);
            } finally {
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };
  useEffect(() => {
    find_GaleryByEventId();
    bindContextMenu();

  }, []);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      find_GaleryByEventId();
      bindContextMenu();
      console.log("workingggggggggggggggg")
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (

    <ScrollView>
      {
        detailViewVisible
          ? (
            <Swiper
              loop={false}
              index={selectedIndex}
            >
              {
                imagesList.map(
                  (item, index) => (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#333',
                      }}
                    >
                      <Image
                        style={{
                          width: "100%",
                          flex: 1,
                        }}
                        resizeMode="contain"
                        source={{
                          uri: item?.filePath
                        }}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 60,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          width: '100%',
                          paddingHorizontal: 20,
                        }}
                      >
                        
                        <Button
                          title="Close"
                          onPress={() => {
                            setDetailViewVisibility(false)
                          }}
                        />
                        {!isSuperAdmin && 
                         <Button 
                         title="Delete"
                         onPress={() => delete_EventImage(item.eventImageId)}
                         color="red" // Set the button color to red
                       />
                        }
                       
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
                imagesList.map(
                  (item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        height: 100,
                        minWidth: 100,
                        flex: 1
                      }}
                      onPress={() => {
                        setDetailViewVisibility(true)
                        setSelectedIndex(index)
                      }}
                    >
                      <Image
                        style={{
                          height: 100,
                          minWidth: 100,
                          flex: 1
                        }}
                        source={{
                          uri: item?.filePath
                        }}
                      />
                    </TouchableOpacity>
                  )
                )
              }
            </View>
          )
      }
    </ScrollView>

  );
};

export default AlbumPhotosScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 5,
  },

  searchButton: {
    borderWidth: 1,
    borderColor: Config.appSecondaryColor,
    padding: 4,
    borderRadius: 5,
    textAlign: "center",
  },
});
