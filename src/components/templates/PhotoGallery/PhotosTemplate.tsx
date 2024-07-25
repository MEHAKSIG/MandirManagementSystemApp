import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'

import GlobalStyles from '../../../shared/GlobalStyles';
import MyText from '../../atoms/MyText';
import EmptyListMessage from '../../molecules/EmptyListMessage';
import { DeleteIcon, EditIcon } from '../../../shared/Icons';
import { navigateToEventDetailsScreen } from '../../../shared/Routes';
import { ScreenNames } from '../../../shared/Config';

const PhotosTemplate = (props: { listData: any, navigation: any, }) => {
  const { navigation,listData } = props;


  // Hardcoded event data for demonstration
  const eventData = {
    id: 1,
    imageUrl: 'https://www.shreehindutemple.net/wp-content/uploads/Holi-2024.jpg',
    title: 'Shree Ram Navami 2023',
    noOfPhotos:225,
    startTime: '2024-02-23 10:00 AM',
    endTime: '2024-02-23 05:00 PM',
    description: 'Shree Hindu Temple and Community Centre Inviting you & your family to join us in celebrating Holi Festival 2024. HOLI  DARSHAN 2024 Sunday 24th March 2024 from 4pm to 9pm Venue : Spinney Hill Park, Leicester',
  };
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    

    return (
      <TouchableOpacity >
        <View style={styles.container}>
          <Image source={{ uri: eventData.imageUrl }} style={styles.image} />

         
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // <View>
      <FlatList
        data={listData} // Dummy data to render a single item, as we are hardcoding the event
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyListMessage text="No Data Found" />}
        numColumns={2}
        contentContainerStyle={{gap:10,}}
        columnWrapperStyle={{gap:10}}
      />
    // </View>
  );
}

export default PhotosTemplate;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10,
    // marginHorizontal:10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    flex:1
    // flexDirection: 'column',
  },
  image: {
    height: 190,
    // resizeMode: 'cover',
    width:'100%',
    aspectRatio:1
  },
  
});
