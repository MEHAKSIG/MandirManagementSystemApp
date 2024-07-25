import { Alert, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { navigateToAddVipPassScreen, navigateToMembersScreen, navigateToVipPassScreen } from '../../shared/Routes';
import { ScreenNames } from '../../shared/Config';
import { GetAllMandirs } from '../../services/RegistrationService';
import { FindByMemberId, Save_Member } from '../../services/MembersService';
import CustomerFormDetailModal from '../../components/organisms/CustomerFormDetailModal';
import { DeleteIcon, EditIcon, PlusIcon } from '../../shared/Icons';
import { Delete_VipEntry_Member, FindByvipPassId, Save_Entry } from '../../services/VipPassService';
import { AccompanyEntry, VipPass } from '../../models/VipPass';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'AddVipPassScreen'>;
  route: RouteProp<StackParamList, 'AddVipPassScreen'>;
};

const AddVipPassScreen = (props: Props) => {
  const { navigation, route } = props;
  const { vipPassID, mandirID } = route.params;
  console.log(props, "props####");



  const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);

  const [listMandirs, setListMandirs] = React.useState<DropDownModel[]>([]);
  const [mandirId, setMandirId] = React.useState<string>('');
  const [mandirLabel, setMandirLabel] = React.useState('Select');


  const [visitorName, setVisitorName] = React.useState<string>('');



  const [visitDate, setVisitDate] = React.useState<string>('');

  const [gender, setGender] = React.useState<"Male" | "Transgender" | "Female" | "Not to disclose">("Male");

  const [age, setAge] = React.useState<string>('');
  const [feesIfAny, setFeesIfAny] = React.useState<string>('');
  const [mobileNo, setMobileNo] = React.useState<string>('');
  const [visitRemarks, setVisitRemarks] = React.useState<string>('');

  const [list, setList] = React.useState<AccompanyEntry[]>([]);
  const [crtUser, setCrtUser] = React.useState<string>('');

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [accompanyEntry, setAccompanyEntry] = React.useState<AccompanyEntry>();
  const [open, setIsOpen] = React.useState(false);

  const initilizeData = async () => {
    const user = await getUserDetail();
    if (user) {
      setIsSuperAdmin(user?.isSuperAdmin);

    }

    await getAllMandirs();
    if (vipPassID && vipPassID > 0) {
      navigation.setOptions({
        headerTitle: "Update VIP Pass"
      });
      findByvipPassId();
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

  const findByvipPassId = async () => {

    if (vipPassID && vipPassID > 0) {

      setIsLoading(true);
      const res = await FindByvipPassId(vipPassID);

      const data = res?.obj;
      console.log(data, "data-getQueryDetailAndBindForm");
      if (data) {
        setVisitorName(data?.visitorName);
        setGender(data?.gender);
        setAge(data?.age.toString());
        setFeesIfAny(data?.feesIfAny.toString());
        setVisitDate(new Date(data?.visitDate).toDateString());
        setMobileNo(data?.mobileNo);
        setVisitRemarks(data?.visitRemarks);
        setCrtUser(data?.crtUser);
        setList(res?.list);
        // setDob(new Date(data?.dob).toDateString());

      }
      setIsLoading(false);
    }
  }

  const delete_VipEntry_Member = async (detailID: number) => {
    // Display confirmation dialog
    Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this member?",
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
                        if (detailID === 0) {
                            // If detailID is 0, remove the item from the list
                            setList(prevList => prevList.filter(item => item.detailId !== 0));
                            setIsLoading(false);
                            return;
                        }
                        const res = await Delete_VipEntry_Member(detailID);
                        if (res?.successMsg) {
                            setIsLoading(false);
                            alert(res?.successMsg);
                            initilizeData();
                        } else {
                            console.log(res?.errorMsg, "Delete_VipEntry_Member-errorMsg")
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
    // console.log(memberID,memberId,"workingggggggggggggggg initial")
    // clearForm();
    initilizeData();
    // console.log(memberID,memberId,"workingggggggggggggggg initial after")
  }, [vipPassID]);


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
      const query: VipPass = {
        vipEntry: {
          vipPassId: vipPassID || 0,
          mandirId: +mandirId,
          visitorName,
          gender,
          age: +age,
          feesIfAny: +feesIfAny,

          visitDate: visitDate || new Date().toDateString(),


          mobileNo,
          visitorCount: 2,
          visitRemarks,

          crtUser: crtUser || user?.userName,
          modUser: user?.userName,
        },
        list
      }

      const res = await Save_Entry(query);


      console.log(res, "data-save")
      if (res?.successMsg) {
        clearForm();

        setIsLoading(false);
        alert(res?.successMsg);
        navigateToVipPassScreen(navigation, ScreenNames.ADDVIPPASSSCREEN);
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
    setVisitorName('');
    setGender("Male");
    setAge('0');
    setFeesIfAny('');
    setVisitDate('');
    setMobileNo('');
    setVisitRemarks('');
    setCrtUser('');
    setCrtUser('');
  }
  const handleEditClick =  (item:AccompanyEntry) => {
    setAccompanyEntry(item);
    setIsOpen(true);
  }
 
  const renderItem = ({ item, index }: { item: AccompanyEntry, index: number }) => {
 
    return (
      <View>
       
          
        <FormGroup
          label={`Accompany ${index + 1}`}
          val={""}
          setVal={''}
          placeholder={`${item?.visitorName}`}
          iconRight={
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
delete_VipEntry_Member(item?.detailId);
              }

              }>
                <DeleteIcon size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 10 }} onPress={
                () => {
                // getCustomerFormDetails();
                handleEditClick(item);
              }

              }>
                <EditIcon size={18}  />
              </TouchableOpacity>
            </View>

          }
          editable={false}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 0, paddingBottom: 0, paddingHorizontal: 8 }}>
 {open && 
    <CustomerFormDetailModal
    isOpen={open } // Open modal only for the selected index
    setIsOpen={setIsOpen} // Close modal function
    list={list}
    setList={setList}
    item={accompanyEntry}
    navigation={navigation}
  />
    }

      <View style={styles.rowContainer}>
        <View style={styles.categoryBox}>
          {/* <FormGroup val={memberId.toString()} setVal={setMemberId} label='' editable={false} hideLabel={true} /> */}
          <FormGroup val={vipPassID?.toString() || '0'} setVal={''} label='' editable={false} hideLabel={true} />
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
            <FormGroupDate label='Date' val={visitDate} setVal={setVisitDate} />

            <FormGroup val={visitorName} setVal={setVisitorName} label='Name' />

            <View style={{ marginHorizontal: 5, marginTop: 5 }}>
              <MyText text={"Gender"} />
              <View style={styles.radioContainer}>
                <View style={styles.radioButtonsContainer}>

                  <FormGroupRadioButton
                    label="Male"
                    // val={genderRadioButtonSelectedIndex === 0}
                    val={gender === "Male"}
                    onPress={() => {
                      // setGenderRadioButtonSelectedIndex(0);
                      setGender("Male");
                    }}

                  />

                  <View style={styles.secondRadioButton}>
                    <FormGroupRadioButton
                      label="Transgender"
                      val={gender === "Transgender"}
                      onPress={() => {
                        setGender("Transgender");
                      }}
                    />
                  </View>
                </View>
                <View style={[styles.radioButtonsContainer]}>

                  <FormGroupRadioButton
                    label="Female"
                    val={gender === "Female"}
                    onPress={() => {
                      setGender("Female");
                    }}
                  />

                  <View style={styles.secondRadioButton}>
                    <FormGroupRadioButton
                      label="Not to disclose"
                      val={gender === "Not to disclose"}
                      onPress={() => {
                        setGender("Not to disclose");
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <FormGroup val={age} setVal={setAge} label='Age' />

            <FormGroup val={mobileNo} setVal={setMobileNo} label='Mobile No.' />
            <FormGroup val={feesIfAny} setVal={setFeesIfAny} label='Fee' />
            <FormGroup val={visitRemarks} setVal={setVisitRemarks} label='Remark' />
            <FlatList
              data={list}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()} // Or provide a unique key if available
              style={{ marginTop: 10 }} // Adjust margin as needed
            />

            <FormGroup
              label={`Accompany`}
              val={""}
              setVal={''}
              placeholder={`Add Accompany`}
              iconRight={
                <View style={{ flexDirection: 'row' }}>
                 
                  <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 4 }} onPress={() => {
                    // getCustomerFormDetails();
                    handleEditClick({
                        detailId: 0,
                        vipPassId: 0,
                        visitorName: '',
                        gender: 'Male',
                        age: 0
                      });
                  }

                  }>
                    <PlusIcon size={25} color='#2196F3' />
                  </TouchableOpacity>
                </View>

              }
              editable={false}
            />

          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default AddVipPassScreen

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

