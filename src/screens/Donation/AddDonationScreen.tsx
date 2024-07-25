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

import { Member } from '../../models/Member';
import { navigateToDonationScreen, navigateToMembersScreen } from '../../shared/Routes';
import { ScreenNames } from '../../shared/Config';
import { GetAllMandirs } from '../../services/RegistrationService';
import { FindByMemberId, Save_Member } from '../../services/MembersService';
import { FindByDonationId, Save_Donation } from '../../services/DonationService';
import { Donation } from '../../models/Donation';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'AddDonationScreen'>;
  route: RouteProp<StackParamList, 'AddDonationScreen'>;
};

const AddDonationScreen = (props: Props) => {
  const { navigation, route } = props;
  const { donationID, mandirID } = route.params;
  console.log(props, "props####");


  const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);

  const [listMandirs, setListMandirs] = React.useState<DropDownModel[]>([]);
  const [mandirId, setMandirId] = React.useState<string>('');
  const [mandirLabel, setMandirLabel] = React.useState('Select');


  const [donationDate, setDonationDate] = React.useState<string>('');
  const [donationFrom, setDonationFrom] = React.useState<string>('');
  const [donationAmount, setDonationAmount] = React.useState<string>('');
  const [paymentMode, setPymentMode] = React.useState<string>('');
  const [insturmentDate, setInsturmentDate] = React.useState<string>('');
  const [instrumentNo, setInstrumentNo] = React.useState<string>('');
  const [remarks, setRemarks] = React.useState<string>('');

  const [crtUser, setCrtUser] = React.useState<string>('');
  const [crtTime, setCrtTime] = React.useState<string>('');

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // const [receiptDetailsList, setReceiptDetailsList] = React.useState<ReceiptDetails[]>([]);
  // setDob((res?.rcptMain?.Receiptdt)?.toString());

  const initilizeData = async () => {
    const user = await getUserDetail();
    if (user) {
      setIsSuperAdmin(user?.isSuperAdmin);

    }

    await getAllMandirs();
    if (donationID && donationID > 0) {
      navigation.setOptions({
        headerTitle: "Update Donation"
      });
      findByMemberId();
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
  const findByMemberId = async () => {

    if (donationID && donationID > 0) {

      setIsLoading(true);
      const res = await FindByDonationId(donationID);

      const data = res?.obj;
      console.log(data, "data-getQueryDetailAndBindForm");
      if (data) {
        // setMemberId(data?.memberId);
        setDonationDate(new Date(data?.donationDate).toDateString());
        setDonationFrom(data?.donationFrom);
        setDonationAmount(data?.donationAmount?.toString());
        setPymentMode(data?.paymentMode);
        setInstrumentNo(data?.instrumentNo);
        setInsturmentDate(new Date(data?.insturmentDate).toDateString());
        setRemarks(data?.Remarks);

        setCrtTime(new Date(data?.crtTime).toDateString());
        setCrtUser(data?.crtUser);
      }
      setIsLoading(false);
    }
  }


  useEffect(() => {
    // console.log(memberID,memberId,"workingggggggggggggggg initial")
    // clearForm();
    initilizeData();
    // console.log(memberID,memberId,"workingggggggggggggggg initial after")
  }, [donationID]);


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
      const query: Donation = {
        donationId: donationID || 0,
        mandirId: +mandirId,

        donationDate: donationDate || new Date().toDateString(),
        donationFrom,
        donationAmount: +donationAmount,
        paymentMode,
        instrumentNo,
        insturmentDate: insturmentDate || new Date().toDateString(),
        Remarks: remarks,


        crtUser: crtUser || user?.userName,
        crtTime: crtTime || new Date().toDateString(),
        // modUser: user?.userName,
      }

      const res = await Save_Donation(query);


      console.log(res, "data-save")
      if (res?.successMsg) {
        clearForm();

        setIsLoading(false);
        alert(res?.successMsg);
        navigateToDonationScreen(navigation, ScreenNames.ADDDONATIONSCREEN);
      } else {
        // alert(data?.msg);
        console.log(res?.errorMsg, "SaveMandir-errorMsg")
      }
      setIsLoading(false);


    } catch (e) {
      alert('Error : ' + e);
    }

  }
  const clearForm = () => {
    // setMemberId(0);

    setDonationDate('');
        setDonationFrom('');
        setDonationAmount('');
        setPymentMode('');
        setInstrumentNo('');
        setInsturmentDate('');
        setRemarks('');

        setCrtTime('');

    setCrtUser('');
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 0, paddingBottom: 0, paddingHorizontal: 8 }}>
      <View style={styles.rowContainer}>
        <View style={styles.categoryBox}>
          {/* <FormGroup val={memberId.toString()} setVal={setMemberId} label='' editable={false} hideLabel={true} /> */}
          <FormGroup val={donationID?.toString() || '0'} setVal={''} label='' editable={false} hideLabel={true} />
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
              marginBottom: 7
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
            <FormGroupDate label='Date' val={donationDate} setVal={setDonationDate} />

            <FormGroup val={donationFrom} setVal={setDonationFrom} label='Donated From' />
            <FormGroup val={donationAmount} setVal={setDonationAmount} label='Amount' keyboardType='numeric'/>
            <FormGroup val={paymentMode} setVal={setPymentMode} label='Payment Mode' />
            <FormGroup val={instrumentNo} setVal={setInstrumentNo} label='Instrument No.' />
            <FormGroupDate label='Instrument Date' val={insturmentDate} setVal={setInsturmentDate} />


            <FormGroup val={remarks} setVal={setRemarks} label='Remark' />



          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default AddDonationScreen

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

