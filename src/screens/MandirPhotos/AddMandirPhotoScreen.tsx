import { Button, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/Types';
import { RouteProp } from '@react-navigation/native';
import MyText from '../../components/atoms/MyText';

import FormGroupDDL from '../../components/molecules/FormGroupDDL';
import { DropDownModel } from '../../components/atoms/DropDownModalSelector';
import Loader from '../../components/molecules/Loader';

import FormGroup from '../../components/molecules/FormGroup';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
type Props = {
  navigation: StackNavigationProp<StackParamList, 'AddMandirPhotoScreen'>;
  route: RouteProp<StackParamList, 'AddMandirPhotoScreen'>;
};

const AddMandirPhotoScreen = (props: Props) => {
  const { navigation, route } = props;
  console.log(props, "props####");



  const mandirsList: DropDownModel[] = [
    // { key: '', label: 'Select' },
    { key: 'Mandir 1', label: 'Mandir 1' },
    { key: 'Mandir 2', label: 'Mandir 2' },

  ];
  const albulmsList: DropDownModel[] = [
    // { key: '', label: 'Select' },
    { key: 'Album 1', label: 'Album 1' },
    { key: 'Album 2', label: 'Album 2' },
    { key: 'Add New Album', label: 'Add New Album' },
  ];
  const [mandirVal, setMandirVal] = React.useState<string>('');
  const [albumVal, setAlbumVal] = React.useState<string>('');
  const [newAlbum, setNewAlbum] = React.useState<string>('');
  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);


  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // Function to request permission for image library access
  const requestCameraRollPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to access your photos!');
    }
  };

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        multiple: true,
      });
  
      if (doc.canceled === true) {
        console.log('User cancelled the document selection');
      } else {
        if (doc.assets && doc.assets.length > 0) {
          const numberOfItems = doc.assets.length;
          alert(`Selected ${numberOfItems} images.`);
        } else {
          alert('Selected document does not contain any items.');
        }
      }
    } catch (err) {
      console.error('Error selecting document:', err);
    }
  };
  


  console.log(selectedImages, "selectedImages")
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 0, paddingBottom: 0, paddingHorizontal: 8 }}>


      {/* {isLoading && receiptDetailsList? ( */}
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView >
          <View
            style={{
              marginBottom: 4
            }}>
            <FormGroupDDL
              label="Select Mandir"
              listKeyLable={mandirsList}
              placeholder={mandirsList.find((item) => item.key === mandirVal)?.label || 'Select'}
              onChange={(key, label) =>
                setMandirVal(key)
              }
            />
          






          </View>
        </ScrollView>

      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            marginVertical: 1,
            marginRight: 1,
            borderRadius: 5,
            backgroundColor: '#005ca8',
            paddingHorizontal: 5.5,
            paddingTop: 6,
            paddingBottom: 7
          }}
          onPress={() => {

          }}
        >
          <MyText text='Add' color='#fff' />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            marginVertical: 1,
            marginLeft: 1,
            borderRadius: 5,
            backgroundColor: '#6aa84f',
            paddingHorizontal: 5.5,
            paddingTop: 6,
            paddingBottom: 7
          }}
          onPress={() => {
            selectDoc();
          }}
        >
          <MyText text='Select Images' color='#fff' />
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical:2,  marginBottom:10 }}>
        <Button title="Save" />
      </View>

    </View>
  )
}

export default AddMandirPhotoScreen

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 3, // Adjust the margin as needed
    marginTop: 10
  },




});

