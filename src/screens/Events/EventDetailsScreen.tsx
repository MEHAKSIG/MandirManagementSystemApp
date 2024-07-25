import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Text, Dimensions, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/Types';
import { RouteProp } from '@react-navigation/native';
import MyText from '../../components/atoms/MyText';
import GlobalStyles from '../../shared/GlobalStyles';
import { Delete_Event, FindByEventId } from '../../services/EventsService';
import { DeleteIcon, EditIcon } from '../../shared/Icons';
import ContextMenuIcons, { ContextMenu } from '../../components/organisms/ContextMenuIcons';
import { navigateToAddEventScreen, navigateToEventsScreen } from '../../shared/Routes';
import Config, { ScreenNames } from '../../shared/Config';

const windowWidth = Dimensions.get('window').width;

type Props = {
  navigation: StackNavigationProp<StackParamList, 'EventDetailsScreen'>;
  route: RouteProp<StackParamList, 'EventDetailsScreen'>;
};

const EventDetailsScreen = (props: Props) => {
  const { navigation, route } = props;
  const { mandirID,eventID,isSuperAdmin } = route.params;
  console.log(props, "props####");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [eventDetails, setEventDetails] =React.useState<any>({});

  const bindContextMenu = async () => {
    
    let contextMenu: ContextMenu[] = [
        { type: 'LOGOUT', size: 28, color: '#fff' },
    ];

    if (!isSuperAdmin) {
        contextMenu.unshift({ type: 'ADD', size: 33, color: '#fff' });
    }

    navigation.setOptions({
        headerTitle: "Event Details",
        headerRight: () =>
        (<ContextMenuIcons
            menus={contextMenu}
            onPress={(val) => {
                if (val == 'ADD') {
                  navigateToAddEventScreen(navigation, ScreenNames.EVENTS_SCREEN);
                }
            }}
        />)
    });
};
  
  const findByEventId = async () => {

    if (eventID && eventID > 0) {

      setIsLoading(true);
      const res = await FindByEventId(eventID);

      const data = res?.obj;
      console.log(data, "data-getQueryDetailAndBindForm");
      if (data) {
        setEventDetails(data);
        
      }
      setIsLoading(false);
    }
  }
  const delete_Event = async (eventId: number) => {
    // Display confirmation dialog
    Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this event?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Deletion canceled"),
                style: "cancel"
            },
            {
                text: "OK",
                onPress: async () => {
                    setIsLoading(true);
                    try {
                        const res = await Delete_Event(eventId);
                        if (res?.successMsg) {
                            setIsLoading(false);
                            alert(res?.successMsg);
                            navigateToEventsScreen(navigation, ScreenNames.EVENT_DETAILS);
                        } else {
                            console.log(res?.errorMsg, "delete_Mandir-errorMsg")
                        }
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setIsLoading(false);
                    }
                }
            }
        ]
    );
};
  useEffect(() => {

    findByEventId();
    bindContextMenu();
  }, [eventID]);
 
//   React.useEffect(() => {
//     const unsubscribe = navigation.addListener("focus", () => {
//       findByEventId();
//       bindContextMenu();
//         console.log("workingggggggggggggggg")
//     });
//     // Return the function to unsubscribe from the event so it gets removed on unmount
//     return unsubscribe;
// }, [navigation]);
const apiRootUrl2 = Config?.apiRootUrl2 + eventDetails?.thumbnail_FilePath ;
console.log(apiRootUrl2,eventDetails?.eventDetails,"apiRootUrl2")
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: apiRootUrl2 }} style={styles.eventImage  } />
      <View style={styles.eventDetails}>
        <MyText text={eventDetails?.eventName} mb5 bold={true} fontSize={18} />
        <View style={GlobalStyles.rowSpaceBetween}>
        <MyText text={`${eventDetails?.startDate?.slice(0, 10)}`} color='#888' fontSize={15} mb5 />
        <MyText text={`${eventDetails?.endDate?.slice(0, 10)}`} color='#888' fontSize={15} mb5 />
        </View >
        <MyText text={`${eventDetails?.eventDetails}`} style={{lineHeight: 20,}}  mb5 />
       
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Event Manager Name : " bold />
                <MyText text={eventDetails?.eventManagerName} />
              </View>
              <View style={GlobalStyles.rowFlexStart}>
                <MyText text="Contact Number : " bold />
                <MyText text={eventDetails?.contactNumber} />
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
                    navigateToAddEventScreen(navigation, ScreenNames.EVENTS_SCREEN, eventID, mandirID);
                  }}>
                    <EditIcon size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    delete_Event(+eventDetails?.eventId);
                  }}>
                    <DeleteIcon size={20} />
                  </TouchableOpacity>
                </View>
              </View>
}
       
      </View>
    </ScrollView>
  );
}

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  eventImage: {
    height: 400, // Take the full width of the screen
    resizeMode: 'stretch',
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
