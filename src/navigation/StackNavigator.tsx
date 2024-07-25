import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import GlobalStyles from '../shared/GlobalStyles';

import CommonContextMenu from '../components/molecules/CommonContextMenu';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import DashboardLMSUserScreen from '../screens/Dashboard/DashboardLMSUserScreen';


// import { LMSUserDrawerNavigator, SiteUserDrawerNavigator } from './DrawerNavigator';

import { StackParamList } from './Types';

import MembersScreen from '../screens/Member/MembersScreen';
import AddMemberScreen from '../screens/Member/AddMemberScreen';
import MandirsScreen from '../screens/Registration/MandirsScreen';
import AddMandirScreen from '../screens/Registration/AddMandirScreen';
import EventsScreen from '../screens/Events/EventsScreen';
import AddEventScreen from '../screens/Events/AddEventScreen';
import EventDetailsScreen from '../screens/Events/EventDetailsScreen';

import AddPhotoScreen from '../screens/PhotoGallery/AddPhotoScreen';
import MandirPhotosScreen from '../screens/MandirPhotos/MandirPhotosScreen';
import AlbumPhotosScreen from '../screens/PhotoGallery/AlbumPhotosScreen';
import PhotoGalleryScreen from '../screens/PhotoGallery/PhotoGalleryScreen';
import AddMandirPhotoScreen from '../screens/MandirPhotos/AddMandirPhotoScreen';
import VideosScreen from '../screens/Video Gallery/VideosScreen';
import DonationScreen from '../screens/Donation/DonationScreen';
import AddDonationScreen from '../screens/Donation/AddDonationScreen';
import VipPassScreen from '../screens/VipPass/VipPassScreen';
import AddVipPassScreen from '../screens/VipPass/AddVipPassScreen';
import LoginScreen from '../screens/LoginScreen';
import EventsScreenPublic from '../screens/Events/EventsScreenPublic';
import EventDetailsScreenPublic from '../screens/Events/EventDetailsScreenPublic';



const Stack = createStackNavigator<StackParamList>();

const screenOptionStyle = () => ({
    // headerStyle: {
    //     backgroundColor: "#9AC4F8",
    // },

    headerStyle: GlobalStyles.appHeaderStyle,
    // headerTitleStyle: { fontSize: 15, flexWrap: "wrap" },
    headerTintColor: "white",
    headerBackTitle: "Back",
    // headerTitleAlign: 'left'
    headerRight: () => (
        // console.log(navigation, "navigation-headerRight");
        // <ContextMenuButtons navigation={navigation} />
        <CommonContextMenu />
    )
});
const screenOptionStylePublic = () => ({
    // headerStyle: {
    //     backgroundColor: "#9AC4F8",
    // },

    // headerStyle: GlobalStyles.appHeaderStyle,
    // headerTitleStyle: { fontSize: 15, flexWrap: "wrap" },
    // headerTintColor: "white",
    headerBackTitle: "Back",
    // headerTitleAlign: 'left'
    headerRight: () => (
        // console.log(navigation, "navigation-headerRight");
        // <ContextMenuButtons navigation={navigation} />
        <CommonContextMenu />
    )
});
const LoginStack = createStackNavigator<StackParamList>();

export const  LoginNavigator =()=> {
    return (
        <LoginStack.Navigator   screenOptions={screenOptionStylePublic}>
            <LoginStack.Screen
                name="EventsScreenPublic"
                component={EventsScreenPublic}
                options={{  }}
                initialParams={{ navigateFrom: "init" }}
            />
            <LoginStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  initialParams={{ navigateFrom: "init" }}/>
            
           
             <LoginStack.Screen
                name="EventDetailsScreenPublic"
                component={EventDetailsScreenPublic}
                options={{ title: "Event Details" }}
                initialParams={{ navigateFrom: "init" }}
            />
        </LoginStack.Navigator>
    );
}





export const LMSUserDashboardStackNavigator = () => {
    const { LMSUserDrawerNavigator } = require('./DrawerNavigator');
    return (
        <Stack.Navigator
            // initialRouteName={"Root"}
            screenOptions={screenOptionStyle}
        >

            <Stack.Screen
                name="Root"
                component={LMSUserDrawerNavigator}
                options={{ title: "", headerShown: false }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ title: "Dashboard" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="LMSUserDashboard"
                component={DashboardLMSUserScreen}
                options={{ title: "Dashboard" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="MandirsScreen"
                component={MandirsScreen}
                options={{ title: "Mandir" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="AddMandirScreen"
                component={AddMandirScreen}
                options={{ title: "Add Mandir" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="MembersScreen"
                component={MembersScreen}
                options={{ title: "Members" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="AddMemberScreen"
                component={AddMemberScreen}
                options={{ title: "Add Member" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="DonationScreen"
                component={DonationScreen}
                options={{ title: "Donation" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="AddDonationScreen"
                component={AddDonationScreen}
                options={{ title: "Add Donation" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="VipPassScreen"
                component={VipPassScreen}
                options={{ title: "VIP Pass" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="AddVipPassScreen"
                component={AddVipPassScreen}
                options={{ title: "Add VIP Pass" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="EventsScreen"
                component={EventsScreen}
                options={{ title: "Events" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="EventDetailsScreen"
                component={EventDetailsScreen}
                options={{ title: "Event Details" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="AddEventScreen"
                component={AddEventScreen}
                options={{ title: "Add Event" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="PhotoGalleryScreen"
                component={PhotoGalleryScreen}
                options={{ title: "Photo Gallery" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="AlbumPhotosScreen"
                component={AlbumPhotosScreen}
                options={{ title: "Album Photos" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="AddPhotoScreen"
                component={AddPhotoScreen}
                options={{ title: "Add Photo" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="MandirPhotosScreen"
                component={MandirPhotosScreen}
                options={{ title: "Mandir Photos" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="AddMandirPhotoScreen"
                component={AddMandirPhotoScreen}
                options={{ title: "Add Mandir Photos" }}
                initialParams={{ navigateFrom: "init" }}
            />
            <Stack.Screen
                name="VideosScreen"
                component={VideosScreen}
                options={{ title: "Video Gallery" }}
                initialParams={{ navigateFrom: "init" }}
            />
        </Stack.Navigator>
    );
}



