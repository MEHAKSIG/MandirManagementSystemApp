import React, { useEffect } from "react";
import { BaseProps } from "../Dashboard/DashboardScreen";
import ContextMenuIcons, { ContextMenu } from "../../components/organisms/ContextMenuIcons";
import { TouchableOpacity, View,StyleSheet } from "react-native";
import GlobalStyles from "../../shared/GlobalStyles";
import FormGroup from "../../components/molecules/FormGroup";
import LoadingIcon from "../../components/atoms/LoadingIcon";
import { SearchIcon } from "../../shared/Icons";
import MyText from "../../components/atoms/MyText";
import Config, { ScreenNames } from "../../shared/Config";

import { navigateToAddEventScreen, navigateToAddMemberScreen, navigateToAddPhotoScreen } from "../../shared/Routes";
import FormGroupDDL from "../../components/molecules/FormGroupDDL";
import { DropDownModel } from "../../components/atoms/DropDownModalSelector";
import EventsTemplate from "../../components/templates/Events/EventsTemplate";
import PhotoGalleryTemplate from "../../components/templates/PhotoGallery/PhotoGalleryTemplate";
import { GetAllEvents } from "../../services/EventsService";
import { getUserDetail } from "../../services/DataStorageService";
import { GetAllMandirs } from "../../services/RegistrationService";

const PhotoGalleryScreen = (props: BaseProps) => {
    const { navigation, route } = props;
    const [listMandirs, setListMandirs] = React.useState<DropDownModel[]>([]);
    const [mandirVal, setMandirVal] = React.useState<string>('');
    const [mandirLabel, setMandirLabel] = React.useState('Select');


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
        const user = await getUserDetail();
        let contextMenu: ContextMenu[] = [
            { type: 'LOGOUT', size: 28, color: '#fff' },
        ];
    
        if (!user?.isSuperAdmin) {
            contextMenu.unshift({ type: 'ADD', size: 33, color: '#fff' });
        }
    
        navigation.setOptions({
            headerTitle: "Photo Gallery",
            headerRight: () =>
            (<ContextMenuIcons
                menus={contextMenu}
                onPress={(val) => {
                    if (val == 'ADD') {
                        navigateToAddPhotoScreen(navigation, ScreenNames.PHOTO_GALLERY_SCREEN,+mandirVal);
                    }
                }}
            />)
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

            if (user?.isSuperAdmin) {
                setMandirVal(list[0]?.key?.toString());
                setMandirLabel(list[0]?.label);
                console.log(list[0]?.key, mandirVal, "selectedMandir")
                getAllEvents(list[0]?.key, customerName);
            } else if (!user?.isSuperAdmin && user?.mandirId > 0) {
                // Search for the item in the list whose key matches the mandirId
                const selectedMandir = list.find((item: { key: number; label: string }) => item.key === user.mandirId);
                if (selectedMandir) {
                    // console.log(selectedMandir, "selectedMandir")
                    setMandirVal(selectedMandir?.key?.toString());
                    setMandirLabel(selectedMandir?.label);
                    getAllEvents(selectedMandir?.key, customerName);
                }
            }


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

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }
    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const preDisabled = currentPage === 1;
    const nextDisable = currentPage === totalPages;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = eventsList.slice(startIndex, endIndex)
    return (
        <View style={{ flex: 1,  paddingHorizontal: 5, }}>
            <View style={styles.container}>
            {isSuperAdmin &&
                    <FormGroupDDL
                        label="Select Mandir"
                        listKeyLable={listMandirs}
                        placeholder={mandirLabel}
                        onChange={(key, label) => {

                            setMandirVal(key);


                            setMandirLabel(label);

                        }}
                    />
                }
                <View style={GlobalStyles.leftRightParentContainer}>
                    <View style={GlobalStyles.leftContainer}>
                        <FormGroup val={customerName} setVal={setCustomerName} label='Search Event' />
                    </View>
                   
                    <View style={[GlobalStyles.leftContainer, { marginTop: 23, marginLeft: 2 }, { flex: 0.15 }]}>
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => {
                                getAllEvents(mandirVal, customerName);
                            }}
                        >
                            {isLoading ? <LoadingIcon size="small" style={{ padding: 6 }} /> : <SearchIcon size={30} />}
                        </TouchableOpacity>
                    </View>
                </View>
               
                <View style={[GlobalStyles.rowFlexStart, { marginTop: 5.3, marginBottom:10 }]}>
                    <TouchableOpacity
                        onPress={handlePrevClick}
                        disabled={preDisabled}
                        style={{
                            marginRight: 4,
                            paddingVertical: 4,
                            paddingHorizontal: 6,
                            backgroundColor: preDisabled ? '#ccc' : '#005ca8', // Change color when disabled
                            borderRadius: 4
                        }}
                    >
                        <MyText text="<" color="#fff" />
                    </TouchableOpacity>

                    {Array.from({ length: totalPages }, (_, i) => {
                        const isDisabled = i + 1 === currentPage;
                        return (
                            <View style={[GlobalStyles.rowFlexStart]} key={i}>
                                <TouchableOpacity
                                    onPress={() => handlePageChange(i + 1)}
                                    disabled={isDisabled}
                                    style={{
                                        marginRight: 4,
                                        paddingVertical: 4,
                                        paddingHorizontal: 6,
                                        backgroundColor: isDisabled ? '#ccc' : '#005ca8', // Change color when disabled
                                        borderRadius: 4
                                    }}
                                >
                                    <MyText text={`${i + 1}`} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        );
                    })}

                    <TouchableOpacity
                        onPress={handleNextClick}
                        disabled={nextDisable}
                        style={{
                            marginRight: 4,
                            paddingVertical: 4,
                            paddingHorizontal: 6,
                            backgroundColor: nextDisable ? '#ccc' : '#005ca8', // Change color when disabled
                            borderRadius: 4
                        }}
                    >
                        <MyText text=">" color="#fff" />
                    </TouchableOpacity>
                </View>


                <View style={{ flex:1 ,  }}>
                    <PhotoGalleryTemplate listData={itemsToDisplay} navigation={navigation} isSuperAdmin={isSuperAdmin} />
                </View>
            </View>

        </View>
    )
}

export default PhotoGalleryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
