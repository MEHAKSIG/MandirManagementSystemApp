

import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/Types';
import { RouteProp } from '@react-navigation/native';
import MyText from '../../components/atoms/MyText';

import Loader from '../../components/molecules/Loader';
import GlobalStyles from '../../shared/GlobalStyles';
import FormGroup from '../../components/molecules/FormGroup';
import { FindByMandirId, SaveMandir } from '../../services/RegistrationService';
import { Mandir } from '../../models/Mandir';
import { getUserDetail } from '../../services/DataStorageService';
import { ScreenNames } from '../../shared/Config';
import { navigateToMandirScreen } from '../../shared/Routes';


type Props = {
  navigation: StackNavigationProp<StackParamList, 'AddMandirScreen'>;
  route: RouteProp<StackParamList, 'AddMandirScreen'>;
};

const AddMandirScreen = (props: Props) => {
  const { navigation, route } = props;
  const { mandirID } = route.params;
  console.log(props, "props####");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const [mandirId, setMandirId] = React.useState(0);

  const [mandirName, setMandirName] = React.useState<string>('');
  const [latitude, setLatitude] = React.useState<number>(0);
  const [longitude, setLongitude] = React.useState<number>(0);
  const [addressLine1, setAddressLine1] = React.useState<string>('');
  const [addressLine2, setAddressLine2] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');
  const [stateName, setStateName] = React.useState<string>('');
  const [country, setCountry] = React.useState<string>('');
  const [pinCode, setPinCode] = React.useState<string>('');
  const [website, setWebsite] = React.useState<string>('');
  const [emailId, setEmailId] = React.useState<string>('');
  const [landLine, setlandLine] = React.useState<string>('');
  const [mobileNo, setMobileNo] = React.useState<string>('');
  const [contactPerson, setContactPerson] = React.useState<string>('');
  const [userName, setUserName] = React.useState<string>('');
  const [pwd, setPwd] = React.useState<string>('');
  const [crtUser, setCrtUser] = React.useState<string>('');

  const initilizeData = async () => {


    if (mandirID && mandirID > 0) {
      navigation.setOptions({
        headerTitle: "Update Mandir"
      });
      findByMandirId();
    }

  }
  const findByMandirId = async () => {

    if (mandirID && mandirID > 0) {

      setIsLoading(true);
      const res = await FindByMandirId(mandirID);

      const data = res?.obj;
      console.log(data, "data-getQueryDetailAndBindForm");
      if (data) {
        // setMandirId(data?.mandirId);
        setMandirName(data?.mandirName);
        setLatitude(data?.latitude);
        setLongitude(data?.longitude);
        setAddressLine1(data?.addressLine1);
        setAddressLine2(data?.addressLine2);
        setCity(data?.city);
        setStateName(data?.stateName);
        setCountry(data?.country);
        setPinCode(data?.pinCode);
        setWebsite(data?.website);
        setEmailId(data?.emailId);
        setMobileNo(data?.mobileNo);
        setlandLine(data?.landLine);
        setContactPerson(data?.contactPerson);
        setUserName(data?.userName);
        setPwd(data?.pwd);
        setCrtUser(data?.crtUser);
      }
      setIsLoading(false);
    }
  }


  useEffect(() => {

    initilizeData();
  }, [mandirID]);

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
      const query: Mandir = {
        mandirId :mandirID||0,
        mandirName,
        latitude,
        longitude,
        addressLine1,
        addressLine2,
        city,
        stateName,
        country,
        pinCode,
        website,
        emailId,
        mobileNo,
        landLine,
        contactPerson,
        userName,
        pwd,
        crtUser: crtUser || user?.userName,
        modUser : user?.userName,
      }
    
      const res = await SaveMandir(query);
     

      console.log(res, "data-save")
      if (res?.successMsg) {

       
        setIsLoading(false);
        alert(res?.successMsg);
        navigateToMandirScreen(navigation, ScreenNames.ADD_MANDIR_SCREEN);
      }  else {
        // alert(data?.msg);
        console.log(res?.errorMsg,"SaveMandir-errorMsg")
      }
      setIsLoading(false);


    } catch (e) {
      alert('Error : ' + e);
    }

  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 0, paddingBottom: 0, paddingHorizontal: 8 }}>
      <View style={styles.rowContainer}>
        <View style={styles.categoryBox}>
          {/* <FormGroup val={mandirId.toString()} setVal={setMandirId} label='' editable={false} hideLabel={true} /> */}
          <FormGroup val={mandirID?.toString()||'0'} setVal={''} label='' editable={false} hideLabel={true} />
        </View>
        <View style={styles.buttonGroup}>

          <TouchableOpacity
            onPress={() => {
              // clearForm();
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

            <FormGroup val={mandirName} setVal={setMandirName} label='Name of Mandir' />
            <View style={GlobalStyles.rowSpaceBetween}>
              <View style={{ width: '49%' }}>
                <FormGroup val={latitude.toString()} setVal={setLatitude} label='Latitude'  />
              </View>
              <View style={{ width: '49%' }}>
                <FormGroup val={longitude.toString()} setVal={setLongitude} label='Longitude' />
              </View>
            </View>
            <FormGroup val={addressLine1} setVal={setAddressLine1} label='Address 1' />
            <FormGroup val={addressLine2} setVal={setAddressLine2} label='Address 2' />

            <View style={GlobalStyles.rowSpaceBetween}>
              <View style={{ width: '49%' }}>
                <FormGroup val={city} setVal={setCity} label='City' />
              </View>
              <View style={{ width: '49%' }}>
                <FormGroup val={stateName} setVal={setStateName} label='State' />
              </View>
            </View>
            <View style={GlobalStyles.rowSpaceBetween}>
              <View style={{ width: '49%' }}>
                <FormGroup val={country} setVal={setCountry} label='Country' />
              </View>
              <View style={{ width: '49%' }}>
                <FormGroup val={pinCode} setVal={setPinCode} label='Pincode' />
              </View>
            </View>

            <FormGroup val={website} setVal={setWebsite} label='Website' />
            <FormGroup val={emailId} setVal={setEmailId} label='Email-Id' />
            <View style={GlobalStyles.rowSpaceBetween}>
              <View style={{ width: '49%' }}>
                <FormGroup val={mobileNo} setVal={setMobileNo} label='Mobile No.' />
              </View>
              <View style={{ width: '49%' }}>
                <FormGroup val={landLine} setVal={setlandLine} label='Landline No.' />
              </View>
            </View>
            <FormGroup val={contactPerson} setVal={setContactPerson} label='Contact Person Name' />
            {mandirID ? <FormGroup val={userName} setVal={setUserName} label='Username' editable={false} /> :  <FormGroup val={userName} setVal={setUserName} label='Username'  />
           
          }
             {mandirID ? <FormGroup val={pwd} setVal={setPwd} label='Password' editable={false} /> : <FormGroup val={pwd} setVal={setPwd} label='Password' editable={false} />}
            
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default AddMandirScreen

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

