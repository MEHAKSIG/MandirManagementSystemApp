

import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/Types';
import { RouteProp } from '@react-navigation/native';
import MyText from '../../components/atoms/MyText';
import FormGroupRadioButton from '../../components/molecules/FormGroupRadioButton';
import { getGenderProviderByIndex } from '../../helpers/GenderHelper';
import FormGroupDDL from '../../components/molecules/FormGroupDDL';
import { DropDownModel } from '../../components/atoms/DropDownModalSelector';
import Loader from '../../components/molecules/Loader';
import GlobalStyles from '../../shared/GlobalStyles';
import FormGroup from '../../components/molecules/FormGroup';
import FormGroupDate from '../../components/molecules/FormGroupDate';
import { getUserDetail } from '../../services/DataStorageService';
import { GetAllMandirs } from '../../services/RegistrationService';
import { FindByEventId, SaveEventImage, Save_Event } from '../../services/EventsService';
import { EventDetails } from '../../models/Event';
import { navigateToEventsScreen } from '../../shared/Routes';
import { ScreenNames } from '../../shared/Config';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { Button } from 'react-native-elements';
type Props = {
  navigation: StackNavigationProp<StackParamList, 'AddEventScreen'>;
  route: RouteProp<StackParamList, 'AddEventScreen'>;
};

const AddEventScreen = (props: Props) => {
  const { navigation, route } = props;
  const { eventID, mandirID } = route.params;
  console.log(props, "props####");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);

  const [listMandirs, setListMandirs] = React.useState<DropDownModel[]>([]);
  const [mandirId, setMandirId] = React.useState<string>('');
  const [mandirLabel, setMandirLabel] = React.useState('Select');

  // const [eventId, setEventId] = React.useState(0);
  const [eventName, setEventName] = React.useState<string>('');
  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');
  const [eventDetails, setEventDetails] = React.useState<string>('');
  const [eventManagerName, setEventManagerName] = React.useState<string>('');
  const [contactNumber, setContactNumber] = React.useState<string>('');
  const [crtUser, setCrtUser] = React.useState<string>('');

  const initilizeData = async () => {
    const user = await getUserDetail();
    if (user) {
      setIsSuperAdmin(user?.isSuperAdmin);

    }

    await getAllMandirs();
    if (eventID && eventID > 0) {
      navigation.setOptions({
        headerTitle: "Update Event"
      });
      findByEventId();
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
  const findByEventId = async () => {

    if (eventID && eventID > 0) {

      setIsLoading(true);
      const res = await FindByEventId(eventID);

      const data = res?.obj;
      console.log(data, "data-getQueryDetailAndBindForm");
      if (data) {
        // setEventId(data?.eventId);
        setEventName(data?.eventName);
       
        setStartDate(new Date(data?.startDate).toDateString());
        setEndDate(new Date(data?.endDate).toDateString());
        setEventDetails(data?.eventDetails);
        setEventManagerName(data?.eventManagerName);
        setContactNumber(data?.contactNumber);

        setCrtUser(data?.crtUser);
      }
      setIsLoading(false);
    }
  }

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        // multiple: true,
      });
  
      const formData = new FormData();
      const assets = doc.assets;
      if (!assets) return;
  
      const file = assets[0];
  
      const imageFile = {
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };
  
      formData.append("imageFile", imageFile as any);
      const  res  = await SaveEventImage(eventID!, mandirID!,formData)
      console.log(res);
      if (res?.successMsg){
      alert(res?.successMsg);
      }
    } catch (err) {
      console.error('Error selecting document:', err);
    }
  };
  
  useEffect(() => {

    initilizeData();
  }, []);
  const saveButtonClick = async () => {

    try {

      // if (!custName?.trim()) {
      //     alert('Enter Customer Name')
      //     return false;
      // }
      // if (!custMobileNo?.trim()) {
      //     alert('Enter Mobile No')
      //     return false;
      // }
      // if (!(queryTypeId > 0)) {
      //     alert('Select Query Type')
      //     return false;
      // }
      setIsLoading(true);
      const user = await getUserDetail();
      const query: EventDetails = {
        eventId:eventID||0,
        mandirId: +mandirId,
        eventName,
        startDate:startDate|| new Date().toDateString(),
        endDate:endDate|| new Date().toDateString(),
        eventDetails,
        eventManagerName,
        contactNumber,

        crtUser: crtUser || user?.userName,
        modUser: user?.userName,
      }

      const res = await Save_Event(query);


      console.log(res, "data-save")
      if (res?.successMsg) {
        clearForm();

        setIsLoading(false);
        alert(res?.successMsg);
        navigateToEventsScreen(navigation, ScreenNames.ADD_EVENT_SCREEN);
      } else {
        // alert(data?.msg);
        console.log(res?.errorMsg, "SaveEvent-errorMsg")
      }
      setIsLoading(false);


    } catch (e) {
      alert('Error : ' + e);
    }

  }
  const clearForm = () => {
    // setIsLoading(true);
    // setEventId(0);
    setEventName('');
    setStartDate((new Date).toString());
    setEndDate((new Date).toString());
    setEventDetails('');
    setEventManagerName('');
    setContactNumber('');
    setCrtUser('');
    // setIsLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 0, paddingBottom: 0, paddingHorizontal: 8 }}>
      <View style={styles.rowContainer}>
        <View style={styles.categoryBox}>
          {/* <FormGroup val={eventId?.toString()} setVal={setEventId} label='' editable={false} hideLabel={true} /> */}
          <FormGroup val={eventID?.toString() || '0'} setVal={''} label='' editable={false} hideLabel={true} />
        </View>
        <View style={styles.buttonGroup}>

          <TouchableOpacity
            onPress={() => {
              clearForm();
            }}


            style={{ marginRight: 4, paddingVertical: 4, paddingHorizontal: 6, backgroundColor: '#005ca8', borderRadius: 4 }}
          >
            <MyText text="Add" color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              saveButtonClick();
            }}


            style={{ marginRight: 4, paddingVertical: 4, paddingHorizontal: 6, backgroundColor: '#008d4c', borderRadius: 4 }}
          >
            <MyText text="Save" color='#fff' />
          </TouchableOpacity>


        </View>

      </View>

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
            <View style={GlobalStyles.rowSpaceBetween}>
              <View style={{ width: '49%' }}>
                <FormGroupDate label='Start Date' val={startDate} setVal={setStartDate} />
              </View>
              <View style={{ width: '49%' }}>
                <FormGroupDate label='End Date' val={endDate} setVal={setEndDate} />
              </View>
            </View>
            <FormGroup val={eventName} setVal={setEventName} label='Event Name' />
            <FormGroup val={eventDetails} setVal={setEventDetails} label='Description' />
            <FormGroup val={eventManagerName} setVal={setEventManagerName} label='Event Manager Name' />
            <FormGroup val={contactNumber} setVal={setContactNumber} label='Contact Number' />

          </View>
        </ScrollView>
        
      )}
      {eventID && mandirID &&
       <View style={{ paddingVertical:2,  marginBottom:10 }}>
       <Button title="Add Image" onPress={selectDoc}/>
     </View>
      }
     
    </View>
  )
}

export default AddEventScreen

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 3, // Adjust the margin as needed
    marginTop: 10
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 3

  },
  rowButtons: {
    backgroundColor: '#005ca8',
    borderRadius: 4,
    marginLeft: 6, // Adjust the margin between buttons as needed
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  categoryBox: {
    flex: 0.98, // Take the remaining space
  },
  // radioButtonsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-evenly',

  //   marginTop: -11,
  //   marginBottom: -13,
  //   marginLeft:60

  // },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -10,
    marginTop: -8,
    marginBottom: -8,


  },

  radioButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: -30
  },
  secondRadioButton: {
    marginTop: -20
  },


  // radioButtonsContainer: {
  //   flexDirection: 'column',
  // alignItems: 'center',  // Align items in the center of each column
  // marginTop: -11,
  // marginBottom: -13,
  // paddingHorizontal: 10,  // Adjust the padding as needed
  // width: '100%',
  // marginLeft:70,
  // marginHorizontal:-35,
  // paddingHorizontal:10,
  // width: '100%',
  // },
  // ...
});

