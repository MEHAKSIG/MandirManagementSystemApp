import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import GlobalStyles from '../../../shared/GlobalStyles';
import MyText from '../../atoms/MyText';
import EmptyListMessage from '../../molecules/EmptyListMessage';
import { DeleteIcon, EditIcon } from '../../../shared/Icons';
import { navigateToAddMandirScreen } from '../../../shared/Routes';
import { ScreenNames } from '../../../shared/Config';
import { getUserDetail } from '../../../services/DataStorageService';


const MandirsTemplate = (props: { listData: any, navigation: any, delete_Mandir: (mandirId: number) => Promise<void>, }) => {
  const { listData, navigation, delete_Mandir, } = props;
  //console.log(listData,"listData-MandirsTemplate")
  
  const renderItem = ({ item, index }: { item: any; index: number }) => {


    return (

      <View>

        <View style={[GlobalStyles.table, { borderColor: '#006290' }]}>
          {/* Row 1 */}
          <View style={[GlobalStyles.row, { backgroundColor: '#006290' }]}>
            <View style={GlobalStyles.cell_start}>

              <MyText text={item?.mandirName} color='#fff' bold />
            </View>

          </View>

          {/* Row 2 */}


          <View style={GlobalStyles.row}>
            <View style={GlobalStyles.cell_start}>
              {/* <MyText text={`Booking Date : `}  />
            <MyText text={item.Customer.trim()} /> */}
              <View style={GlobalStyles.rowSpaceBetween}>
                <View style={[GlobalStyles.row, { flex: 1 }]}>
                  <MyText text="Latitude : " bold />
                  <MyText text={item?.latitude} />
                </View>
                <View style={GlobalStyles.row}>
                  <MyText text={item?.longitude} />
                  <MyText text=" : Longitude" bold />
                </View>
              </View>

              <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                <MyText text="Address 1 : " bold />
                <MyText text={item?.addressLine1} />
              </View>
              <View style={[GlobalStyles.rowFlexStart, { flexWrap: 'wrap' }]}>
                <MyText text="Address 2 : " bold />
                <MyText text={item?.addressLine2} />
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
              <View style={GlobalStyles.rowSpaceBetween}>
                <View style={[GlobalStyles.row, { flex: 1 }]}>
                
                  <MyText text="Country : " bold />
                  <MyText text={item?.country} />
                </View>
                 <View style={GlobalStyles.row}>
                 <MyText text={item?.pinCode} />
                 <MyText text=" : Pincode" bold />               

                </View>
               
              </View>
              <View style={GlobalStyles.rowSpaceBetween}>
              <View style={[GlobalStyles.row, { flex: 1 }]}>                 
               
                  <MyText text="Mobile No : " bold />
                  <MyText text={item?.mobileNo} />
                </View>
                <View style={GlobalStyles.row}>
                <MyText text={item?.landLine} />
                 <MyText text=" : Landline No" bold />  

                </View>
              </View>
             
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Website : " bold />
                <MyText text={item?.website} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Email-Id : " bold />
                <MyText text={item?.emailId} />
              </View>


              <View style={GlobalStyles.rowSpaceBetween}>
                <View style={[{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }]}>
                  <MyText text="Contact Person : " bold />
                  <MyText text={item?.contactPerson} />
                </View >
                {/* <View style={{ flex: 1, alignItems: 'flex-end' }}> */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', alignSelf: "flex-end" }}>
    <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => {
       
            navigateToAddMandirScreen(navigation, ScreenNames.MANDIRS_SCREEN, +item?.mandirId);
       
    }}>
        <EditIcon size={20} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
       
            delete_Mandir(+item?.mandirId);
      
    }}>
        <DeleteIcon size={20} />
    </TouchableOpacity>
</View>
              </View>
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

export default MandirsTemplate

const styles = StyleSheet.create({

});