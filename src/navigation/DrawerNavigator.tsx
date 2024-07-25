import React, { useState } from 'react'
import { Button, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, LayoutAnimation, TouchableNativeFeedback } from 'react-native';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import CommonContextMenu from '../components/molecules/CommonContextMenu';

import DashboardLMSUserScreen from '../screens/Dashboard/DashboardLMSUserScreen';

import GlobalStyles from '../shared/GlobalStyles';
import { AddUserIcon, CustomIcon, DashboardIcon, DonateIcon, EventsIcon, PassIcon, } from '../shared/Icons';
import { getUserDetail } from '../services/DataStorageService';


import UserAvatar from '../components/atoms/UserAvatar';


import MembersScreen from '../screens/Member/MembersScreen';
import MandirsScreen from '../screens/Registration/MandirsScreen';
import EventsScreen from '../screens/Events/EventsScreen';
import { constant, drawerMenu } from './constants';
import { Row } from './Row';
import Colors from './Colors';
import { DrawerNavigationState, ParamListBase, useNavigation } from '@react-navigation/native';
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import DonationScreen from '../screens/Donation/DonationScreen';
import VipPassScreen from '../screens/VipPass/VipPassScreen';
import DashboardLMSSuperAdminScreen from '../screens/Dashboard/DashboardLMSSuperAdminScreen';

const Drawer = createDrawerNavigator();

const screenOptionStyle = () => ({
  // headerStyle: {
  //     backgroundColor: "#9AC4F8",
  // },
  headerStyle: GlobalStyles.appHeaderStyle,
  // headerShown: false,
  // drawerType: 'back',
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




export const LMSUserDrawerNavigator = () => {
  // const [userRole, setUserRole] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [groupName, setGroupName] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);
  const getUserRole = async () => {
    const user = await getUserDetail();
    console.log(user, "User-AppNavigationDrawer");
    // setUserRole(user.role);
    setUsername(user?.userName);
    if (user) {
      setIsSuperAdmin(user?.isSuperAdmin);


    }
    // setGroupName(user?.userDisplayName);

    // const isUserAdmin = await getIsUserAdmin();
    // setIsAdmin(isUserAdmin);
  }

  React.useEffect(() => {
    getUserRole();

  }, []);
  type Props = {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
  };
  const CustomDrawerContent = (props: Props) => {
    const [menuIndex, setMenuIndex] = useState(-1);

    return (
      <DrawerContentScrollView {...props}>

        <UserAvatar username={groupName} groupName={username} />

        <DrawerItemList {...props} />
        {/* Menu */}
        {drawerMenu.map((item, index) => {
          return (
            <TouchableOpacity activeOpacity={0.8} key={index}
              style={[styles.menu, { backgroundColor: item.bg + '99' }]}
              onPress={() => {
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'))
                setMenuIndex(menuIndex === index ? -1 : index)
              }}>
              <Row style={styles.item}>
                <CustomIcon name={item.icon} />
                <Text style={[styles.text, {
                  color: menuIndex === index ? "#007aff" : Colors.gray,
                }]}>{item.title}</Text>
              </Row>
              {menuIndex === index && <View style={{ borderRadius: constant.borderRadius, backgroundColor: item.bg }}>
                {item.menuList.map((subMenu, index) => (
                  <TouchableNativeFeedback key={index} onPress={() => {
                    props.navigation.navigate(subMenu?.route)
                  }}>
                    <View style={styles.subMenu}>
                      <Text style={[styles.subText, {
                        color: Colors.gray,
                      }]}>{subMenu.title}</Text>
                    </View>
                  </TouchableNativeFeedback>
                ))}
              </View>}
            </TouchableOpacity>
          )
        })}
      </DrawerContentScrollView>
    );
  }


  return (
    <Drawer.Navigator
      screenOptions={screenOptionStyle}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {isSuperAdmin ? (
        <Drawer.Screen
          name="Dashboard"
          component={DashboardLMSSuperAdminScreen}
          options={{
            drawerIcon: () => {
              return <DashboardIcon />;
            },
          }}
        />
      ) : (
        <Drawer.Screen
          name="Dashboard"
          component={DashboardLMSUserScreen}
          options={{
            drawerIcon: () => {
              return <DashboardIcon />;
            },
          }}
        />
      )}
      <Drawer.Screen name="Registration" component={MandirsScreen} options={{
        drawerIcon: () => {
          return <AddUserIcon />
        }
      }} />
      <Drawer.Screen name="Member" component={MembersScreen} options={{
        drawerIcon: () => {
          return <AddUserIcon />
        }
      }} />
      <Drawer.Screen name="Donation" component={DonationScreen} options={{
        drawerIcon: () => {
          return <DonateIcon />
        }
      }} />
      <Drawer.Screen name="VIP Pass" component={VipPassScreen} options={{
        drawerIcon: () => {
          return <PassIcon />
        }
      }} />
      <Drawer.Screen name="Events" component={EventsScreen} options={{
        drawerIcon: () => {
          return <EventsIcon />
        }
      }} />


    </Drawer.Navigator>
  );
}




const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: constant.SPACING,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  // header: {
  //   padding: constant.SPACING,
  //   ...Styles.rowView,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#ccc',
  // },
  name: {
    fontSize: constant.titleFontSize,
  },
  menu: {
    marginHorizontal: constant.SPACING / 1.7,
    marginVertical: constant.SPACING / 2.5,
    borderRadius: constant.borderRadius,
  },
  item: {
    paddingHorizontal: constant.SPACING / 1.5,
    paddingVertical: constant.SPACING / 1.2,
  },
  text: {
    fontSize: constant.textFontSize,
    //   paddingHorizontal: constant.SPACING,
    paddingLeft: 30,
    fontWeight: '500'
  },
  subMenu: {
    paddingHorizontal: constant.SPACING,
    paddingVertical: constant.SPACING / 1.5,

  },
  subText: {
    fontSize: constant.textFontSize,
    //   paddingHorizontal: constant.SPACING,
    // paddingLeft:30,
    fontWeight: '500'
  },
  spacer: {
    marginVertical: constant.SPACING,
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'center',
  },
})