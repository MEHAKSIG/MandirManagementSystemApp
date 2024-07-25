import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ViewModal from './ViewModal';
import FormGroupDDL from '../molecules/FormGroupDDL';
import FormGroup from '../molecules/FormGroup';
import FormGroupCheckBox from '../molecules/FormGroupCheckBox';
import FormGroupDate from '../molecules/FormGroupDate';
import { DropDownModel } from '../atoms/DropDownModalSelector';
import { AppColors } from '../../shared/Config';
import MyText from '../atoms/MyText';
import Loader from '../molecules/Loader';
import FormGroupRadioButton from '../molecules/FormGroupRadioButton';
import { AccompanyEntry } from '../../models/VipPass';

export default function CustomerFormDetailModal(props: {
  navigation: any;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: AccompanyEntry[];
  setList: React.Dispatch<React.SetStateAction<AccompanyEntry[]>>;
  item?: AccompanyEntry;
}) {
  const { isOpen, setIsOpen, navigation, item, setList } = props;
  console.log(item, "item-CustomerFormDetailModal");

  const [accompanyEntry, setAccompanyEntry] = React.useState<AccompanyEntry>(
    {
    detailId: item?.detailId || 0,
    vipPassId: item?.vipPassId || 0,
    visitorName: item?.visitorName || '',
    gender: item?.gender || "Male",
    age: item?.age || 0
  }
);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleInputChange = (field: string, value: string | number) => {
    setAccompanyEntry(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  useEffect(() => {
    setAccompanyEntry(item!)
  }, []);
  return (
    <View>
     <ViewModal
  isVisible={isOpen}
  setIsVisible={setIsOpen}
  title={"Accompany Details"}
  titleStyle={[{ textAlign: 'center', fontSize: 22 }, { color: AppColors.appPrimaryColor }]}
  widthOffset={30}
  onSubmit={() => {
    // Check if detailId is present in the item
    if (item?.detailId) {
      // Replace the item in the list with the new accompanyEntry item
      setList(prevList => prevList.map(prevItem => prevItem.detailId === item.detailId ? accompanyEntry : prevItem));
      setIsOpen(false);
    } else {
      // Check if there's any item in the list with detailId 0
      const existingItemIndex = props.list.findIndex(prevItem => prevItem.detailId === 0);
      
      if (existingItemIndex !== -1) {
        // If an item with detailId 0 exists, replace it with the new accompanyEntry item
        const newList = [...props.list];
        newList[existingItemIndex] = accompanyEntry;
        props.setList(newList);
      } else {
        // If no item with detailId 0 exists, add new accompanyEntry to the list as a new item
        props.setList(prevList => [...prevList, accompanyEntry]);
      }
    
      setIsOpen(false);
    }
    
    
    
  }}

  
>


        <ScrollView showsVerticalScrollIndicator={false}>
          {!isLoading ? (
            <View style={{}}>
              <FormGroup val={accompanyEntry.visitorName} setVal={(value: string) => handleInputChange('visitorName', value)} label='Name' />
              <View style={{ marginHorizontal: 5, marginTop: 5 }}>
                <MyText text={"Gender"} />
                <View style={styles.radioContainer}>
                  <View style={styles.radioButtonsContainer}>
                    <FormGroupRadioButton
                      label="Male"
                      val={accompanyEntry.gender === "Male"}
                      onPress={() => handleInputChange('gender', 'Male')}
                    />
                    <View style={styles.secondRadioButton}>
                      <FormGroupRadioButton
                        label="Transgender"
                        val={accompanyEntry.gender === "Transgender"}
                        onPress={() => handleInputChange('gender', 'Transgender')}
                      />
                    </View>
                  </View>
                  <View style={[styles.radioButtonsContainer]}>
                    <FormGroupRadioButton
                      label="Female"
                      val={accompanyEntry.gender === "Female"}
                      onPress={() => handleInputChange('gender', 'Female')}
                    />
                    <View style={styles.secondRadioButton}>
                      <FormGroupRadioButton
                        label="Not to disclose"
                        val={accompanyEntry.gender === "Not to disclose"}
                        onPress={() => handleInputChange('gender', 'Not to disclose')}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <FormGroup val={accompanyEntry.age.toString()} setVal={(value: string) => handleInputChange('age', Number(value))} label='Age' keyboardType='numeric'/>
            </View>
          ) : (
            <Loader />
          )}
        </ScrollView>
      </ViewModal>
    </View>
  );
}

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
});
