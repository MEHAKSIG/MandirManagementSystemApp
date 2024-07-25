import React from 'react'
import CommonContextMenu from '../../components/molecules/CommonContextMenu';
import Loader from '../../components/molecules/Loader';

import { DashboardScreenProps } from './DashboardScreen'
import { useIsFocused } from '@react-navigation/native';
import DashboardLMSTemplate from '../../components/templates/dashboard/DashboardLMSTemplate';

export default function DashboardLMSUserScreen(props: DashboardScreenProps) {
    const { navigation, route } = props;
    const [counts, setCounts] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [selecetdUserId, setSelecetdUserId] = React.useState<number>(0);

    const isFocused = useIsFocused();

  

    const bindContextMenu = () => {
        navigation.setOptions({
            headerTitle: "Dashboard",
            headerRight: () => (
                <CommonContextMenu showRefresh onRefreshPress={() => {
                    
                }} />

            ),
        });
    }

    React.useEffect(() => {
        
        bindContextMenu();
    }, [selecetdUserId])

   

    const onJuniorDropDownChange = (selectedUserId: number) => {
        console.log(selectedUserId, "onJuniorDropDownChange")
        setSelecetdUserId(selectedUserId);
    }

    // const DashboardTemplateMemo = React.useMemo(() =>
    //     <DashboardLMSTemplate counts={counts} navigation={navigation} />
    //     , [counts, navigation]);

    // if (isLoading) {
    //     return <Loader />
    // }

    return <DashboardLMSTemplate
        counts={counts}
        navigation={navigation}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onJuniorDropDownChange={onJuniorDropDownChange}
        selectedJuniorUserId={selecetdUserId}
    />
}

