import React, { useEffect, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Button,StyleSheet
} from 'react-native';

// import CameraRoll from '@react-native-community/cameraroll';
import Swiper from 'react-native-swiper';
import { BaseProps } from '../Dashboard/DashboardScreen';
import Config, { ScreenNames } from '../../shared/Config';
import ContextMenuIcons, { ContextMenu } from '../../components/organisms/ContextMenuIcons';
import { navigateToAddEventScreen, navigateToAddMandirPhotosScreen, navigateToAddPhotoScreen } from '../../shared/Routes';
import { DropDownModel } from '../../components/atoms/DropDownModalSelector';
import FormGroupDDL from '../../components/molecules/FormGroupDDL';
import { getUserDetail } from '../../services/DataStorageService';
import { GetAllMandirs } from '../../services/RegistrationService';
import { Find_GaleryByMandirId } from '../../services/EventsService';

const MandirPhotosScreen = (props: BaseProps) => {
    const { navigation, route } = props;
    const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    
    const [listMandirs, setListMandirs] = React.useState<DropDownModel[]>([]);
    const [mandirVal, setMandirVal] = React.useState<string>('');
    const [mandirLabel, setMandirLabel] = React.useState('Select');

    const [detailViewVisible, setDetailViewVisibility] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
  
    const [imagesList, setImagesList] = React.useState<{ eventImageId: number, filePath: string }[]>([]);
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
           
        } else if (!user?.isSuperAdmin && user?.mandirId > 0) {
            // Search for the item in the list whose key matches the mandirId
            const selectedMandir = list.find((item: { key: number; label: string }) => item.key === user.mandirId);
            if (selectedMandir) {
                // console.log(selectedMandir, "selectedMandir")
                setMandirVal(selectedMandir?.key?.toString());
                setMandirLabel(selectedMandir?.label);
               
            }
        }


        setListMandirs(list);

    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
};
const find_GaleryByMandirId = async (mandirID:number) => {
  try {
    if (mandirID) {
      setIsLoading(true);
      const res = await Find_GaleryByMandirId(mandirID);
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
      useEffect(() => {
        initilizeData();
        
    }, []);
    useEffect(() => {
      if (mandirVal){
       
        find_GaleryByMandirId(+mandirVal);
      }
     
      
    }, [mandirVal]);
    return (
      <View style={{ flex:1,  }}>
       
       {!detailViewVisible && isSuperAdmin && (
        <View style={{ marginHorizontal: 5, marginBottom: 5 }}>
          <FormGroupDDL
            label="Select Mandir"
            listKeyLable={listMandirs}
            placeholder={mandirLabel}
            onChange={(key, label) => {
              setMandirVal(key);
              setMandirLabel(label);
            }
            }
          />
        </View>
      )}
            
        <ScrollView style={{}}>
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
                            bottom: 60
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
        </View>
    );
  };

export default MandirPhotosScreen

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
