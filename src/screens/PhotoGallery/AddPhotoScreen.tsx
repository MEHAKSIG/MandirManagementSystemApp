import { Button, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/Types';
import { RouteProp } from '@react-navigation/native';
import MyText from '../../components/atoms/MyText';

import FormGroupDDL from '../../components/molecules/FormGroupDDL';
import { DropDownModel } from '../../components/atoms/DropDownModalSelector';
import Loader from '../../components/molecules/Loader';

import FormGroup from '../../components/molecules/FormGroup';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { getUserDetail } from '../../services/DataStorageService';
import { GetAllMandirs } from '../../services/RegistrationService';
import { GetAllEvents, SaveEventImage } from '../../services/EventsService';
type Props = {
  navigation: StackNavigationProp<StackParamList, 'AddPhotoScreen'>;
  route: RouteProp<StackParamList, 'AddPhotoScreen'>;
};

const AddPhotoScreen = (props: Props) => {
  const { navigation, route } = props;
  console.log(props, "props####");
  const { eventID, mandirID } = route.params;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);

  const [listMandirs, setListMandirs] = React.useState<DropDownModel[]>([]);
  const [mandirId, setMandirId] = React.useState<string>('');
  const [mandirLabel, setMandirLabel] = React.useState('Select');

  const [eventsList, setEventsList] = React.useState<DropDownModel[]>([]);
  const [eventId, setEventId] = React.useState<string>('');
  const [eventLabel, setEventLabel] = React.useState('Select');

  const initilizeData = async () => {
    const user = await getUserDetail();
    if (user) {
      setIsSuperAdmin(user?.isSuperAdmin);

    }

    await getAllMandirs();
    if (mandirID){
      setMandirId(mandirID.toString());
    }
   
    

  }
  const getAllMandirs = async () => {
    setIsLoading(true);

    try {
      const res = await GetAllMandirs('');


      // console.log(res, "GetAllMandirs-list")
      // Map the rest of the items
      const list = res.list.map((x: any) => ({
        key: x.mandirId,
        label: x.mandirName.trim(),
      }));
      const user = await getUserDetail();
      // console.log(list, "GetAllMandirs-list")
      if (mandirID && mandirID > 0) {
        setMandirId(mandirID.toString());
        const label = list?.find((item: any) => item.key == mandirID)?.label!
        setMandirLabel(label);
      } else if (!user?.isSuperAdmin && user?.mandirId) {
        setMandirId(user?.mandirId?.toString());
        const label = list?.find((item: any) => item.key == user?.mandirId)?.label!
        setMandirLabel(label);
      }
      setListMandirs(list);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getAllEvents = async (id:string) => {
    setIsLoading(true);

    try {
        const res = await GetAllEvents(id,'');

        // Map the rest of the items
        const list = res.list.map((x: any) => ({
            key: x.eventId,
            label: x.eventName.trim(),
        }));

        // Search for the event ID
        if (eventID && eventID > 0) {
            const matchingEvent = list.find((item: any)=> item.key === eventID);
            if (matchingEvent) {
                setEventId(matchingEvent.key);
                setEventLabel(matchingEvent.label);
            }
        }
      
        setEventsList(list);
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
};
const selectDoc = async () => {
  try {
    const doc = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
      multiple: true, // Enable multiple selection
    });

    const assets = doc.assets;
    if (!assets) return;

    let countSaved = 0; // Counter for successfully saved images

    for (const asset of assets) {
      const formData = new FormData();

      const imageFile = {
        name: asset.name,
        uri: asset.uri,
        type: asset.mimeType,
        size: asset.size,
      };

      formData.append("imageFile", imageFile as any); // Note the singular 'imageFile'

      setIsLoading(true); // Set loading state before saving each image

      const res = await SaveEventImage(+eventId, +mandirId, formData);

      setIsLoading(false); // Set loading state after saving each image

      console.log(res,"SaveEventImage");

      if (res?.successMsg === "Saved Successfully") {
        countSaved++; // Increment the counter for successfully saved images
      }
    }

    // Alert with the count of successfully saved images
    alert(`Successfully saved ${countSaved} image(s).`);
  } catch (err) {
    console.error('Error selecting document:', err);
  }
};

  useEffect(() => {

    initilizeData();
  }, []);
  useEffect(() => {
    if (mandirId){
      setEventId('');
      setEventLabel('select')
      getAllEvents(mandirId);
    }
   
    
  }, [mandirId]);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 0, paddingBottom: 0, paddingHorizontal: 8 }}>


      {/* {isLoading && receiptDetailsList? ( */}
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView >
          <View
            style={{
              marginBottom: 4
            }}>
              {isSuperAdmin &&
              <FormGroupDDL
                label="Select Mandir"
                listKeyLable={listMandirs}
                placeholder={mandirLabel}
                onChange={(key, label) => {
                  setMandirId(key);
                  setMandirLabel(label);
                }
                }
              />
            }
           
           <FormGroupDDL
                label="Select Event"
                listKeyLable={eventsList}
                placeholder={eventLabel}
                onChange={(key, label) => {
                  setEventId(key);
                  setEventLabel(label);
                }
                }
              />





          </View>
        </ScrollView>

      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom:10  }}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            marginVertical: 1,
            marginRight: 1,
            borderRadius: 5,
            backgroundColor: '#005ca8',
            paddingHorizontal: 5.5,
            paddingTop: 6,
            paddingBottom: 7
          }}
          onPress={() => {

          }}
        >
          <MyText text='Add' color='#fff' />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            marginVertical: 1,
            marginLeft: 1,
            borderRadius: 5,
            backgroundColor: '#6aa84f',
            paddingHorizontal: 5.5,
            paddingTop: 6,
            paddingBottom: 7
          }}
          onPress={() => {
            selectDoc();
          }}
        >
          <MyText text='Add Image' color='#fff' />
        </TouchableOpacity>
      </View>
      {/* <View style={{ paddingVertical:2,  marginBottom:10 }}>
        <Button title="Save" />
      </View> */}

    </View>
  )
}

export default AddPhotoScreen

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 3, // Adjust the margin as needed
    marginTop: 10
  },




});

