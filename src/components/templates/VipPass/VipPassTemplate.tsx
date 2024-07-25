import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import GlobalStyles from '../../../shared/GlobalStyles';
import MyText from '../../atoms/MyText';
import EmptyListMessage from '../../molecules/EmptyListMessage';
import { DeleteIcon, EditIcon } from '../../../shared/Icons';
import { navigateToAddDonationScreen, navigateToAddMemberScreen, navigateToAddVipPassScreen } from '../../../shared/Routes';
import { ScreenNames } from '../../../shared/Config';


const VipPassTemplate = (props: { listData: any, navigation: any, delete_VipEntry: (vipPassID: number) => Promise<void>,isSuperAdmin:boolean }) => {
  const { listData, navigation, delete_VipEntry,isSuperAdmin } = props;
  //console.log(listData,"listData-VipPassTemplate")
  const renderItem = ({ item, index }: { item: any; index: number }) => {


    return (

      <View>

        <View style={[GlobalStyles.table, { borderColor: '#006290' }]}>
          {/* Row 1 */}
          <View style={[GlobalStyles.row, { backgroundColor: '#006290' }]}>
            <View style={GlobalStyles.cell_start}>

              <MyText text={`${index +1}`} color='#fff' bold />
            </View>

          </View>

          {/* Row 2 */}


          <View style={GlobalStyles.row}>
            <View style={GlobalStyles.cell_start}>
              {/* <MyText text={`Booking Date : `}  />
            <MyText text={item.Customer.trim()} /> */}
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Date : " bold />
                <MyText text={item?.obj?.visitDate.slice(0, 10)} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Name : " bold />
                <MyText text={item?.obj?.visitorName} />
              </View>

              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Gender : " bold />
                <MyText text={item?.obj?.gender} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Age : " bold />
                <MyText text={item?.obj?.age} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Mobile No : " bold />
                <MyText text={item?.obj?.mobileNo} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Fee : " bold />
                <MyText text={item?.obj?.feesIfAny} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Remark : " bold />
                <MyText text={item?.obj?.visitRemarks} />
              </View>
              {item?.list.map((accompanyItem: any, accompanyIndex: number) => (
                <View key={accompanyIndex}>
                   <View style={GlobalStyles.rowFlexStart}>
                <MyText text={`Accompany ${accompanyIndex+1}`} bold color='grey' />
                {/* <MyText text={"0123456789"} /> */}
              </View>
                  <View style={GlobalStyles.rowFlexStart}>
                    <MyText text="Name : " bold />
                    <MyText text={accompanyItem?.visitorName} />
                  </View>
                  <View style={GlobalStyles.rowFlexStart}>
                    <MyText text="Gender : " bold />
                    <MyText text={accompanyItem?.gender} />
                  </View>
                  <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Age : " bold />
                <MyText text={accompanyItem?.age} />
              </View>
                  {/* Render any other details for each accompanying item */}
                </View>
              ))}
              
              {!isSuperAdmin && 
              <View style={GlobalStyles.rowSpaceBetween}>
                <View style={[{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }]}>
                  {/* <MyText text="Age : " bold />
                  <MyText text={'30'} /> */}
                </View >
                {/* <View style={{ flex: 1, alignItems: 'flex-end' }}> */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', alignSelf: "flex-end" }}>
                  <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => {
                    // console.log(item?.memberId, "item?.memberId##")
                    navigateToAddVipPassScreen(navigation, ScreenNames.VIPPASSSCREEN, item?.obj?.vipPassId, item?.obj?.mandirId);
                  }}>
                    <EditIcon size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    delete_VipEntry(+item?.obj?.vipPassId);
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

export default VipPassTemplate

const styles = StyleSheet.create({

});