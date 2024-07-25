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
import { navigateToMembersScreen } from '../../shared/Routes';
import { ScreenNames } from '../../shared/Config';
import { GetAllMandirs } from '../../services/RegistrationService';
import { FindByMemberId, Save_Member } from '../../services/MembersService';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'AddMemberScreen'>;
  route: RouteProp<StackParamList, 'AddMemberScreen'>;
};

const AddMemberScreen = (props: Props) => {
  const { navigation, route } = props;
  const { memberID, mandirID } = route.params;
  console.log(props, "props####");

  const membersTitlesList: DropDownModel[] = [
    { key: 'Mr.', label: 'Mr.' },
    { key: 'Ms.', label: 'Ms.' },
    { key: 'Mrs.', label: 'Mrs.' },
    { key: 'Dr.', label: 'Dr.' },
    { key: 'Shri', label: 'Shri' },
    { key: 'Shrimati', label: 'Shrimati' },
  ];
  const bloodGroupList: DropDownModel[] = [
    // { key: '', label: 'Select' },
    { key: 'A+', label: 'A+' },
    { key: 'A-', label: 'A-' },
    { key: 'B+', label: 'B+' },
    { key: 'B-', label: 'B-' },
    { key: 'AB+', label: 'AB+' },
    { key: 'AB-', label: 'AB-' },
    { key: 'O+', label: 'O+' },
    { key: 'O-', label: 'O-' },
  ];
  const maritalStatusList: DropDownModel[] = [
    // { key: '', label: 'Select' },
    { key: 'Single', label: 'Single' },
    { key: 'Married', label: 'Married' },
    { key: 'Widow', label: 'Widow' },
    { key: 'Divorced', label: 'Divorced' },

  ];
  const memberTypeList: DropDownModel[] = [
    // { key: '', label: 'Select' },
    { key: 'Trustee', label: 'Trustee' },
    { key: 'Management Committee', label: 'Management Committee' },
    { key: 'Committee Member', label: 'Committee Member' },
    { key: 'Office Staff', label: 'Office Staff' },

  ];
  const trusteeDesignationList: DropDownModel[] = [
    // { key: '', label: 'Select' },
    { key: 'Chairperson', label: 'Chairperson' },
    { key: 'Board Member', label: 'Board Member' },

  ];
  const managementCommitteeDesignationList: DropDownModel[] = [
    // { key: '', label: 'Select' },
    { key: 'President', label: 'President' },
    { key: 'Vice President', label: 'Vice President' },
    { key: 'Secretary', label: 'Secretary' },
    { key: 'Assistant Secretary', label: 'Assistant Secretary' },
    { key: 'Treasurer', label: 'Treasurer' },
    { key: 'Assistant Treasurer', label: 'Assistant Treasurer' },
  ];
  const committeeMemberDesignationList: DropDownModel[] = [
    // { key: '', label: 'Select' },
    { key: 'Event Committee Member', label: 'Event Committee Member' },
    { key: 'Membership Committee Member', label: 'Membership Committee Member' },
    { key: 'Finance Committee Member', label: 'Finance Committee Member' },
    { key: 'Maintenance Committee Member', label: 'Maintenance Committee Member' },
    { key: 'Public Relations Committee Member', label: 'Public Relations Committee Member' },
  ];
  // const mandirsList: DropDownModel[] = [
  //   // { key: '', label: 'Select' },
  //   { key: 'Mandir 1', label: 'Mandir 1' },
  //   { key: 'Mandir 2', label: 'Mandir 2' },

  // ];
  const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);

  const [listMandirs, setListMandirs] = React.useState<DropDownModel[]>([]);
  const [mandirId, setMandirId] = React.useState<string>('');
  const [mandirLabel, setMandirLabel] = React.useState('Select');

  // const [memberId, setMemberId] = React.useState(0);

  const [availableDesignations, setAvailableDesignations] = React.useState<DropDownModel[]>([]);
  const [memberType, setMemberType] = React.useState<string>('');
  const [memberDesig, setMemberDesig] = React.useState<string>('');

  const [title, setTitle] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [bloodGroup, setBloodGroup] = React.useState<string>('');

  // const [dob, setDob] = React.useState<string>((new Date).toString());
  const [dob, setDob] = React.useState<string>('');
  // const [genderRadioButtonSelectedIndex, setGenderRadioButtonSelectedIndex] = React.useState<number>(0);
  // const gender = getGenderProviderByIndex(genderRadioButtonSelectedIndex);
  const [gender, setGender] = React.useState<"Male" | "Transgender" | "Female" | "Not to disclose">("Male");
  const [maritalStatus, setSelectedMaritalStatus] = React.useState<"Single" | "Married" | "Widow" | "Divorced">("Single");

  const [emailId, setEmailId] = React.useState<string>('');
  const [mobileNo, setMobileNo] = React.useState<string>('');
  const [landLine, setLandLine] = React.useState<string>('');
  const [occupation, setOccupation] = React.useState<string>('');
  const [contactAddress, setContactAddress] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');
  const [stateName, setStateName] = React.useState<string>('');
  const [country, setCountry] = React.useState<string>('India');
  const [memberSince, setMemberSince] = React.useState<string>('');
  const [crtUser, setCrtUser] = React.useState<string>('');

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // const [receiptDetailsList, setReceiptDetailsList] = React.useState<ReceiptDetails[]>([]);
  // setDob((res?.rcptMain?.Receiptdt)?.toString());

  const initilizeData = async () => {
    const user = await getUserDetail();
    if (user) {
      setIsSuperAdmin(user?.isSuperAdmin);

    }

    await getAllMandirs();
    if (memberID && memberID > 0) {
      navigation.setOptions({
        headerTitle: "Update Member"
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

    if (memberID && memberID > 0) {

      setIsLoading(true);
      const res = await FindByMemberId(memberID);

      const data = res?.obj;
      console.log(data, "data-getQueryDetailAndBindForm");
      if (data) {
        // setMemberId(data?.memberId);
        setMemberType(data?.memberType);
        setMemberDesig(data?.memberDesig);
        setTitle(data?.title);
        setFirstName(data?.firstName);
        setLastName(data?.lastName);
        setBloodGroup(data?.bloodGroup);
        // setDob(data?.dob);
        setDob(new Date(data?.dob).toDateString());
        setGender(data?.gender);
        setSelectedMaritalStatus(data?.maritalStatus);
        setEmailId(data?.emailId);
        setMobileNo(data?.mobileNo);
        setLandLine(data?.landLine);
        setOccupation(data?.occupation);
        setContactAddress(data?.contactAddress);
        setCity(data?.city);
        setStateName(data?.stateName);
        setCountry(data?.country);
        // setMemberSince(data?.memberSince?.toString());
        setMemberSince(new Date(data?.memberSince).toDateString());
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
  }, [memberID]);

  useEffect(() => {
    // Logic to set available designations based on memberType
    switch (memberType) {
      case 'Trustee':
        setAvailableDesignations(trusteeDesignationList);
        break;
      case 'Management Committee':
        setAvailableDesignations(managementCommitteeDesignationList);
        break;
      case 'Committee Member':
        setAvailableDesignations(committeeMemberDesignationList);
        break;

      default:
        setAvailableDesignations([]);
    }
  }, [memberType]);
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
      const query: Member = {
        memberId:memberID ||0,
        mandirId: +mandirId,
        memberType,
        memberDesig,
        title,
        firstName,
        lastName,
        bloodGroup,
        dob :dob|| new Date().toDateString(),
        gender,
        emailId,
        mobileNo,
        landLine,
        occupation,
        contactAddress,
        city,
        stateName,
        country,
        maritalStatus,
        memberSince :memberSince || new Date().toDateString(),
        crtUser:crtUser || user?.userName,
        modUser: user?.userName,
      }

      const res = await Save_Member(query);


      console.log(res, "data-save")
      if (res?.successMsg) {
        clearForm();

        setIsLoading(false);
        alert(res?.successMsg);
        navigateToMembersScreen(navigation, ScreenNames.ADD_MEMBER_SCREEN);
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
        setMemberType('');
        setMemberDesig('');
        setTitle('');
        setFirstName('');
        setLastName('');
        setBloodGroup('');
        setDob('');
        setGender("Male");
        setSelectedMaritalStatus("Single");
        setEmailId('');
        setMobileNo('');
        setLandLine('');
        setOccupation('');
        setContactAddress('');
        setCity('');
        setStateName('');
        setCountry('India');
        setMemberSince('');
        setCrtUser('');
}
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 0, paddingBottom: 0, paddingHorizontal: 8 }}>
      <View style={styles.rowContainer}>
        <View style={styles.categoryBox}>
          {/* <FormGroup val={memberId.toString()} setVal={setMemberId} label='' editable={false} hideLabel={true} /> */}
          <FormGroup val={memberID?.toString() || '0'} setVal={''} label='' editable={false} hideLabel={true} />
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

            <FormGroupDDL
              label="Member Type"
              listKeyLable={memberTypeList}
              placeholder={memberTypeList.find((item) => item.key === memberType)?.label || 'Select'}
              onChange={(key, label) =>
                setMemberType(key)
              }
            />
            {memberType === 'Office Staff' ? (
              // Render text input for Office Staff
              <FormGroup val={memberDesig} setVal={setMemberDesig} label='Enter Member Designation' />
            ) : (
              // Render dropdown for other member types
              <FormGroupDDL
                label="Member Designation"
                listKeyLable={availableDesignations}
                placeholder={availableDesignations.find((item) => item.key === memberDesig)?.label || 'Select'}
                onChange={(key, label) => setMemberDesig(key)}
              />
            )}
            <FormGroupDDL
              label="Title"
              listKeyLable={membersTitlesList}
              placeholder={membersTitlesList.find((item) => item.key === title)?.label || 'Select'}
              onChange={(key, label) =>
                setTitle(key)
              }
            />

            <View style={GlobalStyles.rowSpaceBetween}>
              <View style={{ width: '49%' }}>
                <FormGroup val={firstName} setVal={setFirstName} label='First Name'  />
              </View>
              <View style={{ width: '49%' }}>
                <FormGroup val={lastName} setVal={setLastName} label='Last Name'  />
              </View>
            </View>
            <View style={GlobalStyles.rowSpaceBetween}>
              <View style={{ width: '49%' }}>
                <FormGroupDDL
                  label="Blood Group"
                  listKeyLable={bloodGroupList}
                  placeholder={bloodGroupList.find((item) => item.key === bloodGroup)?.label || 'Select'}
                  onChange={(key, label) =>
                    setBloodGroup(key)
                  }
                />
              </View>
              <View style={{ width: '49%' }}>
                <FormGroupDate label='Date of Birth' val={dob} setVal={setDob} />
              </View>
            </View>

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

            <View style={{ marginHorizontal: 5, marginTop: 5 }}>
              <MyText text={"Marital Status"} />
              <View style={styles.radioContainer}>
                <View style={styles.radioButtonsContainer}>

                  <FormGroupRadioButton
                    label="Single"
                    // val={genderRadioButtonSelectedIndex === 0}
                    val={maritalStatus === "Single"}
                    onPress={() => {
                      // setGenderRadioButtonSelectedIndex(0);
                      setSelectedMaritalStatus("Single");
                    }}

                  />

                  <View style={styles.secondRadioButton}>
                    <FormGroupRadioButton
                      label="Widow"
                      val={maritalStatus === "Widow"}
                      onPress={() => {
                        setSelectedMaritalStatus("Widow");
                      }}
                    />
                  </View>
                </View>
                <View style={[styles.radioButtonsContainer, { marginRight: 2 }]}>

                  <FormGroupRadioButton
                    label="Married"
                    val={maritalStatus === "Married"}
                    onPress={() => {
                      setSelectedMaritalStatus("Married");
                    }}
                  />

                  <View style={styles.secondRadioButton}>
                    <FormGroupRadioButton
                      label="Divorced"
                      val={maritalStatus === "Divorced"}
                      onPress={() => {
                        setSelectedMaritalStatus("Divorced");
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>

            <FormGroup val={emailId} setVal={setEmailId} label='Email-Id' />
            <View style={GlobalStyles.rowSpaceBetween}>
              <View style={{ width: '49%' }}>
                <FormGroup val={mobileNo} setVal={setMobileNo} label='Mobile No.'  />
              </View>
              <View style={{ width: '49%' }}>
                <FormGroup val={landLine} setVal={setLandLine} label='Landline No.'  />
              </View>
            </View>
            <FormGroup val={occupation} setVal={setOccupation} label='Occupation'  />
            <FormGroup val={contactAddress} setVal={setContactAddress} label='Address' />





            <View style={GlobalStyles.rowSpaceBetween}>
              <View style={{ width: '49%' }}>
                <FormGroup val={city} setVal={setCity} label='City' />
              </View>
              <View style={{ width: '49%' }}>
                <FormGroup val={stateName} setVal={setStateName} label='State' />
              </View>
            </View>
            <FormGroup val={country} setVal={setCountry} label='Country' />
            {/* {memberSince && 
            <FormGroup val={memberSince.slice(0, 10)} setVal={setMemberSince} label='Member Since' editable={false} />
            } */}
            
            {/* <FormGroupDate label='Member Since' val={memberSince} setVal={setMemberSince} /> */}





          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default AddMemberScreen

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

