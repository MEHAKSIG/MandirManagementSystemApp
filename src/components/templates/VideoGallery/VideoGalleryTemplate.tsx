import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'

import GlobalStyles from '../../../shared/GlobalStyles';
import MyText from '../../atoms/MyText';
import EmptyListMessage from '../../molecules/EmptyListMessage';
import { DeleteIcon, EditIcon } from '../../../shared/Icons';
import { navigateToAlbumPhotosScreen, navigateToEventDetailsScreen,  } from '../../../shared/Routes';
import { ScreenNames } from '../../../shared/Config';

const VideoGalleryTemplate = (props: { listData: any, navigation: any, }) => {
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
      <TouchableOpacity onPress={() =>  navigateToAlbumPhotosScreen(navigation,ScreenNames.PHOTO_GALLERY_SCREEN)}>
        <View style={styles.eventCard}>
          <Image source={{ uri: eventData.imageUrl }} style={styles.eventImage} />

          <View style={styles.eventDetails}>
            <MyText text={eventData.title}  bold={true} fontSize={16}/>
            <MyText text={`${eventData.noOfPhotos} Photos`} color='#888' fontSize={14}  />
           
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={listData} // Dummy data to render a single item, as we are hardcoding the event
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyListMessage text="No Data Found" />}
      />
    </View>
  );
}

export default VideoGalleryTemplate;

const styles = StyleSheet.create({
  eventCard: {
    marginBottom: 15,
    marginHorizontal:3,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    flexDirection: 'column',
  },
  eventImage: {
    height: 170,
    resizeMode: 'cover',
  },
  eventDetails: {
    padding: 5,
    alignItems:'center'
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 15,
    color: '#888',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  readMore: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
