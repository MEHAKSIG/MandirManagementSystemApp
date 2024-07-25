import React, { useEffect, useState } from "react";
import { BaseProps } from "../Dashboard/DashboardScreen";
import ContextMenuIcons, { ContextMenu } from "../../components/organisms/ContextMenuIcons";
import { TouchableOpacity, View, StyleSheet, Alert, Image, ScrollView, Button } from "react-native";
import GlobalStyles from "../../shared/GlobalStyles";
import FormGroup from "../../components/molecules/FormGroup";
import LoadingIcon from "../../components/atoms/LoadingIcon";
import { SearchIcon } from "../../shared/Icons";
import MyText from "../../components/atoms/MyText";
import Config, { ScreenNames } from "../../shared/Config";

import MembersTemplate from "../../components/templates/member/MembersTemplate";
import { navigateToAddEventScreen, navigateToAddMemberScreen, navigateToLoginScreen } from "../../shared/Routes";
import FormGroupDDL from "../../components/molecules/FormGroupDDL";
import { DropDownModel } from "../../components/atoms/DropDownModalSelector";
import EventsTemplate from "../../components/templates/Events/EventsTemplate";
import { getUserDetail } from "../../services/DataStorageService";
import { GetAllMandirs } from "../../services/RegistrationService";
import { Delete_Event, Find_GaleryByMandirId, GetAllEvents } from "../../services/EventsService";
import EventsTemplatePublic from "../../components/templates/Events/EventsTemplatePublic";
import Swiper from "react-native-swiper";

const EventsScreenPublic = (props: BaseProps) => {
    const { navigation, route } = props;
    const [listMandirs, setListMandirs] = React.useState<DropDownModel[]>([]);
    const [mandirVal, setMandirVal] = React.useState<string>('');
    const [mandirLabel, setMandirLabel] = React.useState('Select');

    const [imagesList, setImagesList] = React.useState<{ eventImageId: number, filePath: string }[]>([]);
    const [detailViewVisible, setDetailViewVisibility] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [customerName, setCustomerName] = React.useState('');
    const [eventsList, setEventsList] = React.useState<any[]>([]);
    const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const itemsPerPage = 20;

    const initilizeData = async () => {

        const user = await getUserDetail();
        // console.log(isAdminUser, "isAdminUser");
        if (user) {
            setIsSuperAdmin(user?.isSuperAdmin);
            // setMandirId(user?.mandirId);
            await getAllMandirs();
            //  getAllEvents();
        }
    }

    const bindContextMenu = async () => {
        const contextMenu: ContextMenu[] = [
            // { type:'REFRESH', size: 28, color: '#fff' },
            // { type: 'ADD', size: 33, color: '#fff' },
            // { type: 'CHANGE_PASSWORD', size: 33, color: '#fff' },
            // { type: 'LOGIN', size: 28, color: 'grey' },
        ];

        navigation.setOptions({
            headerTitle: "Mandir",
            headerRight: () =>
                <TouchableOpacity onPress={() => navigateToLoginScreen(navigation, ScreenNames.EVENTS_SCREEN)}>
            <MyText text="Login" bold fontSize={20} style={{ color: 'grey', marginRight: 17 }}/>
        </TouchableOpacity>
        });
    };
    const getAllMandirs = async () => {
        setIsLoading(true);

        try {
            const res = await GetAllMandirs('');

            console.log(res, "GetAllMandirs-list")
            // Map the rest of the items
            const list = res.list.map((x: any) => ({
                key: x.mandirId,
                label: x.mandirName.trim(),
            }));
            const user = await getUserDetail();

            // if (user?.isSuperAdmin) {
            setMandirVal(list[0]?.key?.toString());
            setMandirLabel(list[0]?.label);
            console.log(list[0]?.key, mandirVal, "selectedMandir")
            getAllEvents(list[0]?.key, customerName);
            find_GaleryByMandirId(list[0]?.key);
            // } else if (!user?.isSuperAdmin && user?.mandirId > 0) {
            //     // Search for the item in the list whose key matches the mandirId
            //     const selectedMandir = list.find((item: { key: number; label: string }) => item.key === user.mandirId);
            //     if (selectedMandir) {
            //         // console.log(selectedMandir, "selectedMandir")
            //         setMandirVal(selectedMandir?.key?.toString());
            //         setMandirLabel(selectedMandir?.label);
            //         getAllEvents(selectedMandir?.key, customerName);
            //     }
            // }


            setListMandirs(list);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    const getAllEvents = async (mandirVal: string, customerName: string) => {
        setIsLoading(true);
        console.log(mandirVal, "getAllEvents called")
        try {
            if (mandirVal) {
                const res = await GetAllEvents(mandirVal, customerName);

                setEventsList(res?.list);
                setTotalPages(Math.ceil(res?.list?.length / itemsPerPage));
            }


        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const find_GaleryByMandirId = async (mandirID: number) => {
        try {
            if (mandirID) {
                setIsLoading(true);
                const res = await Find_GaleryByMandirId(mandirID);
                const apiRootUrl2 = Config?.apiRootUrl2;
                console.log(res?.list, "un-modifiedList")
                // Extracting only eventImageId and filePath from each item in res?.list
                const modifiedList = res?.list?.map((item: any) => ({
                    eventImageId: item?.eventImageId,
                    filePath: apiRootUrl2! + item?.filePath // Concatenating apiRootUrl2 with filePath
                }));

                // Setting the modified list containing only eventImageId and modified filePath
                setImagesList(modifiedList);
                console.log(modifiedList, "modifiedList")
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error occurred while fetching and processing data:', error);
            // Handle error as needed, e.g., displaying an error message to the user
        }
    }
    useEffect(() => {
        initilizeData();
        bindContextMenu();
        console.log("workingggggggggggggggg")
    }, []);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            initilizeData();
            bindContextMenu();
            setCustomerName('');
            console.log("workingggggggggggggggg")
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    return (
        <View style={{ flex: 1, paddingHorizontal: 5, backgroundColor: "#fff" }}>
            <View style={styles.container}>

                <FormGroupDDL
                    label="Select Mandir"
                    hideLabel
                    listKeyLable={listMandirs}
                    placeholder={mandirLabel}
                    onChange={(key, label) => {

                        setMandirVal(key);


                        setMandirLabel(label);
                        getAllEvents(key, '');
                        find_GaleryByMandirId(+key);
                    }}
                />




                <View style={{  marginTop: 10 }}>
                    <EventsTemplatePublic listData={eventsList} navigation={navigation} />
                </View>

            </View>
            <View style={{ flex: 1, }}>



                <ScrollView style={{}}>
                    {
                        detailViewVisible
                            ? (
                                <Swiper
                                    loop={false}
                                    index={selectedIndex}
                                >
                                    {
                                        imagesList.map(
                                            (item, index) => (
                                                <View
                                                    key={index}
                                                    style={{
                                                        flex: 1,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: '#333',

                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            width: "100%",
                                                            flex: 1,
                                                        }}
                                                        resizeMode="contain"
                                                        source={{
                                                            uri: item?.filePath
                                                        }}
                                                    />
                                                    <View
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: 60
                                                        }}
                                                    >
                                                        <Button
                                                            title="Close"
                                                            onPress={() => {
                                                                setDetailViewVisibility(false)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            )
                                        )
                                    }
                                </Swiper>
                            )
                            : (
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',

                                    }}
                                >
                                    {
                                        imagesList.map(
                                            (item, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={{
                                                        height: 100,
                                                        minWidth: 100,
                                                        flex: 1
                                                    }}
                                                    onPress={() => {
                                                        setDetailViewVisibility(true)
                                                        setSelectedIndex(index)
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            height: 100,
                                                            minWidth: 100,
                                                            flex: 1
                                                        }}
                                                        source={{
                                                            uri: item?.filePath
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        )
                                    }
                                </View>
                            )
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default EventsScreenPublic

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 5,
    },

    searchButton: {
        borderWidth: 1,
        borderColor: Config.appSecondaryColor,
        padding: 4,
        borderRadius: 5,
        textAlign: "center",
    },
});
