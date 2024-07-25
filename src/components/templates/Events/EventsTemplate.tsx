import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'

import GlobalStyles from '../../../shared/GlobalStyles';
import MyText from '../../atoms/MyText';
import EmptyListMessage from '../../molecules/EmptyListMessage';
import { DeleteIcon, EditIcon } from '../../../shared/Icons';
import { navigateToEventDetailsScreen } from '../../../shared/Routes';
import Config, { ScreenNames } from '../../../shared/Config';

const EventsTemplate = (props: { listData: any, navigation: any, isSuperAdmin:boolean}) => {
  const { navigation,listData,isSuperAdmin } = props;

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const apiRootUrl2 = Config?.apiRootUrl2 + item?.thumbnail_FilePath ;
console.log(apiRootUrl2,item?.thumbnail_FilePath,"apiRootUrl2")
    return (
      <TouchableOpacity onPress={() =>  navigateToEventDetailsScreen(navigation,isSuperAdmin,ScreenNames.EVENTS_SCREEN, item?.mandirId,item?.eventId,)}>
        <View style={styles.eventCard}>
          {item?.thumbnail_FilePath && 
           <View
           // key={index}
           style={{
             flex: 1,
             alignItems: 'center',
             justifyContent: 'center',
             backgroundColor: '#333',
             height: 170,
           }}
         >
<Image source={{ uri: apiRootUrl2 }} style={styles.eventImage} resizeMode='cover'    />
</View>
          }
       
          <View style={styles.eventDetails}>
            <MyText text={item?.eventName} mb5 bold={true} fontSize={18}/>
            <MyText text={`${item?.startDate?.slice(0, 10)}`} color='#888' fontSize={15} mb5/>
            <Text style={styles.eventDescription}>
              {`${item?.eventDetails.slice(0, 88)}...`}
              
                <Text style={styles.readMore} onPress={() => navigation.navigate('EventDetails', { eventId: item?.eventId })}>
                  Read more
                </Text>
              
            </Text>
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

export default EventsTemplate;

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
    // height: 170,
    // resizeMode: 'cover',
    width: "100%",
    flex: 1,
  },
  eventDetails: {
    padding: 10,
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
