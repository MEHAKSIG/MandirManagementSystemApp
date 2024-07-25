import React from 'react'
import { View, Text } from 'react-native'
import Loader from '../../components/molecules/Loader'
import { getUserDetail } from '../../services/DataStorageService';
import DashboardLMSUserScreen from './DashboardLMSUserScreen';

import DashboardLMSSuperAdminScreen from './DashboardLMSSuperAdminScreen';

export interface DashboardScreenProps {
    navigation: any,
    route: any
}
export interface BaseProps {
    navigation: any,
    route: any
}
export default function DashboardScreen(props: DashboardScreenProps) {
    const { navigation, route } = props;
    // const [userRole, setUserRole] = React.useState<string>('');
    const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);
    const initilizeData = async () => {
        const user = await getUserDetail();
        if (user) {
            setIsSuperAdmin(user?.isSuperAdmin);
          
          
        }
        // console.log(user, "user-initilizeData-DashboardScreen")
        // alert(user.role);
        // setUserRole(user.role);
    }

    React.useEffect(() => {
        initilizeData();
    }, [])

    // if (userRole === 'user') {
    //     return <DashboardLMSUserScreen navigation={navigation} route={route} />
    // }

    // if (userRole === 'gateUser') {
    //     return <DashboardSiteUser navigation={navigation} route={route} />
    // }
    // if (userRole === 'broker') {
    //     return <Text>Broker Dashboard</Text>
    // }

    // return (
    //     <Loader />
    // )
    if (isSuperAdmin) {
        return <DashboardLMSSuperAdminScreen navigation={navigation} route={route} />
    } 
    if (!isSuperAdmin) {
        return <DashboardLMSUserScreen navigation={navigation} route={route} />
    } 
    return (
        <Loader />
    )
    // return <DashboardLMSUserScreen navigation={navigation} route={route} />
}
