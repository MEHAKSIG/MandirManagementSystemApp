import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'

import GlobalStyles from '../../../shared/GlobalStyles';
import MyText from '../../atoms/MyText';
import EmptyListMessage from '../../molecules/EmptyListMessage';
import { DeleteIcon, EditIcon } from '../../../shared/Icons';
import { navigateToAlbumPhotosScreen, navigateToEventDetailsScreen,  } from '../../../shared/Routes';
import Config, { ScreenNames } from '../../../shared/Config';

const PhotoGalleryTemplate = (props: { listData: any, navigation: any, isSuperAdmin:boolean}) => {
  const { navigation,listData ,isSuperAdmin} = props;


  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const apiRootUrl2 = Config?.apiRootUrl2 + item?.thumbnail_FilePath ;
    console.log(apiRootUrl2,item?.thumbnail_FilePath,"apiRootUrl2")

    return (
      <TouchableOpacity onPress={() =>  navigateToAlbumPhotosScreen(navigation,isSuperAdmin,ScreenNames.PHOTO_GALLERY_SCREEN,item?.mandirId,item?.eventId )}>
        <View style={styles.eventCard}>
          <Image source={{ uri: apiRootUrl2 }} style={styles.eventImage} />

          <View style={styles.eventDetails}>
            <MyText text={item?.eventName}  bold={true} fontSize={16}/>
            <MyText text={`${item?.eventImageCount} Photos`} color='#888' fontSize={14}  />
           
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

export default PhotoGalleryTemplate;

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
