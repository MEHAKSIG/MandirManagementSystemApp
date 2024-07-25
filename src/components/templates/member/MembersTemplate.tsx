import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import GlobalStyles from '../../../shared/GlobalStyles';
import MyText from '../../atoms/MyText';
import EmptyListMessage from '../../molecules/EmptyListMessage';
import { DeleteIcon, EditIcon } from '../../../shared/Icons';
import { navigateToAddMemberScreen } from '../../../shared/Routes';
import { ScreenNames } from '../../../shared/Config';


const MembersTemplate = (props: { listData: any, navigation: any, delete_Member: (memberId: number) => Promise<void> ,isSuperAdmin:boolean}) => {
  const { listData, navigation, delete_Member ,isSuperAdmin} = props;
  //console.log(listData,"listData-MembersTemplate")
  const renderItem = ({ item, index }: { item: any; index: number }) => {


    return (

      <View>

        <View style={[GlobalStyles.table, { borderColor: '#006290' }]}>
          {/* Row 1 */}
          <View style={[GlobalStyles.row, { backgroundColor: '#006290' }]}>
            <View style={GlobalStyles.cell_start}>

              <MyText text={`${item?.title} ${item?.firstName} ${item?.lastName}`} color='#fff' bold />
            </View>

          </View>

          {/* Row 2 */}


          <View style={GlobalStyles.row}>
            <View style={GlobalStyles.cell_start}>
              {/* <MyText text={`Booking Date : `}  />
            <MyText text={item.Customer.trim()} /> */}
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Type : " bold />
                <MyText text={item?.memberType} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Designation : " bold />
                <MyText text={item?.memberDesig} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Occupation : " bold />
                <MyText text={item?.occupation} />
              </View>
              <View style={GlobalStyles.rowSpaceBetween}>
                <View style={[GlobalStyles.row, { flex: 1 }]}>
                  <MyText text="Member Since : " bold />
                  <MyText text={item?.memberSince.slice(0, 10)} />
                </View>
                <View style={GlobalStyles.row}>
                  <MyText text={item?.dob.slice(0, 10)} />
                  <MyText text=" : Date of Birth" bold />
                </View>
              </View>
              <View style={GlobalStyles.rowSpaceBetween}>
                <View style={[GlobalStyles.row, { flex: 1 }]}>
                  <MyText text="Gender : " bold />
                  <MyText text={item?.gender} />
                </View>
                <View style={GlobalStyles.row}>
                  <MyText text={item?.maritalStatus} />
                  <MyText text=" : Marital Status" bold />
                </View>
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Blood Group : " bold />
                <MyText text={item?.bloodGroup} />
              </View>



              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Contact Address : " bold />
                <MyText text={item?.contactAddress} />
              </View>
              <View style={GlobalStyles.rowSpaceBetween}>
                <View style={[GlobalStyles.row, { flex: 1 }]}>
                  <MyText text="City : " bold />
                  <MyText text={item?.city} />
                </View>
                <View style={GlobalStyles.row}>
                  <MyText text={item?.stateName} />
                  <MyText text=" : State" bold />
                </View>
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Country : " bold />
                <MyText text={item?.country} />
              </View>
              <View style={GlobalStyles.rowSpaceBetween}>
                <View style={[GlobalStyles.row, { flex: 1 }]}>
                  <MyText text="Mobile No : " bold />
                  <MyText text={item?.mobileNo} />
                </View>
                <View style={GlobalStyles.row}>
                  <MyText text={item?.landLine} />
                  <MyText text=" : Landline" bold />
                </View>
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Email-id : " bold />
                <MyText text={item?.emailId} />
              </View>
              {!isSuperAdmin && 
              <View style={GlobalStyles.rowSpaceBetween}>
                <View style={[{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }]}>
                  <MyText text="" bold />
                  <MyText text={''} />
                </View >
                {/* <View style={{ flex: 1, alignItems: 'flex-end' }}> */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', alignSelf: "flex-end" }}>
                  <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => {
                    console.log(item?.memberId,"item?.memberId##")
                    navigateToAddMemberScreen(navigation, ScreenNames.MEMBERS_SCREEN, item?.memberId, item?.mandirId);
                  }}>
                    <EditIcon size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    delete_Member(+item?.memberId);
                  }}>
                    <DeleteIcon size={20} />
                  </TouchableOpacity>
                </View>
              </View>
  }

            </View>

          </View>


        </View>

      </View>

    );
  };

  return (
    <View>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyListMessage text="No Data Found" />}
      />
    </View>
  )
}

export default MembersTemplate

const styles = StyleSheet.create({

});