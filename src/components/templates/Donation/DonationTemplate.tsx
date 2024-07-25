import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import GlobalStyles from '../../../shared/GlobalStyles';
import MyText from '../../atoms/MyText';
import EmptyListMessage from '../../molecules/EmptyListMessage';
import { DeleteIcon, EditIcon } from '../../../shared/Icons';
import { navigateToAddDonationScreen, navigateToAddMemberScreen } from '../../../shared/Routes';
import { ScreenNames } from '../../../shared/Config';


const DonationTemplate = (props: { listData: any, navigation: any, delete_Donation: (donationID: number) => Promise<void>, isSuperAdmin:boolean }) => {
  const { listData, navigation, delete_Donation, isSuperAdmin} = props;
  //console.log(listData,"listData-DonationTemplate")
  const renderItem = ({ item, index }: { item: any; index: number }) => {


    return (

      <View>

        <View style={[GlobalStyles.table, { borderColor: '#006290' }]}>
          {/* Row 1 */}
          <View style={[GlobalStyles.row, { backgroundColor: '#006290' }]}>
            <View style={GlobalStyles.cell_start}>

              <MyText text={`${index + 1}`} color='#fff' bold />
            </View>

          </View>

          {/* Row 2 */}


          <View style={GlobalStyles.row}>
            <View style={GlobalStyles.cell_start}>
              {/* <MyText text={`Booking Date : `}  />
            <MyText text={item.Customer.trim()} /> */}
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Donation Date : " bold />
                <MyText text={item?.donationDate.slice(0, 10)} />
              </View>
              
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Donated From : " bold />
                <MyText text={item?.donationFrom} />
              </View>
              
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Amount : " bold />
                <MyText text={item?.donationAmount} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Payment Mode : " bold />
                <MyText text={item?.paymentMode} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Instrument Date : " bold />
                <MyText text={item?.insturmentDate.slice(0, 10)} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Instrument No. : " bold />
                <MyText text={item?.instrumentNo} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Remark : " bold />
                <MyText text={item?.Remarks} />
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
                  console.log(item?.memberId, "item?.memberId##")
                  navigateToAddDonationScreen(navigation, ScreenNames.DONATIONSCREEN, item?.donationId, item?.mandirId);
                }}>
                  <EditIcon size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  delete_Donation(+item?.donationId);
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

export default DonationTemplate

const styles = StyleSheet.create({

});