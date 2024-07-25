import React, { useEffect } from "react";
import { BaseProps } from "../Dashboard/DashboardScreen";
import ContextMenuIcons, { ContextMenu } from "../../components/organisms/ContextMenuIcons";
import { TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import GlobalStyles from "../../shared/GlobalStyles";
import FormGroup from "../../components/molecules/FormGroup";
import LoadingIcon from "../../components/atoms/LoadingIcon";
import { SearchIcon } from "../../shared/Icons";
import MyText from "../../components/atoms/MyText";
import Config, { ScreenNames } from "../../shared/Config";

import MembersTemplate from "../../components/templates/member/MembersTemplate";
import { navigateToAddMandirScreen, navigateToAddMemberScreen } from "../../shared/Routes";
import MandirsTemplate from "../../components/templates/Registration/MandirsTemplate";
import { Delete_Mandir, GetAllMandirs } from "../../services/RegistrationService";
import { getUserDetail } from "../../services/DataStorageService";
import Loader from "../../components/molecules/Loader";

const MandirsScreen = (props: BaseProps) => {
    const { navigation, route } = props;


    const [customerName, setCustomerName] = React.useState('');

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [mandirsList, setMandirsList] = React.useState<any[]>([]);
    const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);
 
    // const [mandirId, setMandirId] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const itemsPerPage = 20;
    const initilizeData = async () => {

        const user = await getUserDetail();
        // console.log(isAdminUser, "isAdminUser");
        if (user) {
            setIsSuperAdmin(user?.isSuperAdmin);
          
            // setMandirId(user?.mandirId);
            getAllMandirs();
        }



    }

    const bindContextMenu = async () => {
        const user = await getUserDetail();
        const contextMenu: ContextMenu[] = [
            // { type:'REFRESH', size: 28, color: '#fff' },
            // { type: 'ADD', size: 33, color: '#fff' },
            // { type: 'CHANGE_PASSWORD', size: 33, color: '#fff' },
            // { type: 'LOGOUT', size: 28, color: '#fff' },
        ];
        if (user?.isSuperAdmin) {
            contextMenu.push({ type: 'ADD', size: 33, color: '#fff' });
        }
        contextMenu.push({ type: 'LOGOUT', size: 28, color: '#fff' });
        navigation.setOptions({
            headerTitle: "Mandir",
            headerRight: () =>
            (<ContextMenuIcons
                menus={contextMenu}
                onPress={(val) => {
                    if (val == 'ADD') {
                        navigateToAddMandirScreen(navigation, ScreenNames.MANDIRS_SCREEN);
                    }
                }}
            />)
        });
    };
    const getAllMandirs = async () => {
        setIsLoading(true);

        try {
            const user = await getUserDetail();
            // const res = await GetAllMandirs(customerName);
            // setMandirsList(res.list);
            // setTotalPages(Math.ceil(res.list.length / itemsPerPage));
            if (user?.isSuperAdmin) {
                // If the user is a super admin, display all items
                const res = await GetAllMandirs(customerName);
                setMandirsList(res.list);
                setTotalPages(Math.ceil(res.list.length / itemsPerPage));
            } else if (user) {
                // If the user is not a super admin, filter the list based on mandirId
                const res = await GetAllMandirs(customerName);
                const filteredList = res.list.filter((mandir: { mandirId: number }) => mandir.mandirId === user.mandirId);
                setMandirsList(filteredList);
                setTotalPages(Math.ceil(filteredList.length / itemsPerPage));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const delete_Mandir = async (mandirId: number) => {
        // Display confirmation dialog
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this Mandir?",
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
                            const res = await Delete_Mandir(mandirId);
                            if (res?.successMsg) {
                                setIsLoading(false);
                                alert(res?.successMsg);
                                getAllMandirs();
                                // navigateToMandirScreen(navigation, ScreenNames.ADD_MANDIR_SCREEN);
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
        initilizeData();
        bindContextMenu();
        setCustomerName('');
        console.log("workingggggggggggggggg 1")
    }, []);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            initilizeData();
            bindContextMenu();
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
    const itemsToDisplay = mandirsList.slice(startIndex, endIndex)
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 5, }}>
            <View style={styles.container}>
                {isSuperAdmin &&
                    <View style={GlobalStyles.leftRightParentContainer}>

                        <View style={GlobalStyles.leftContainer}>
                            <FormGroup val={customerName} setVal={setCustomerName} label='Search Mandir' />
                        </View>



                        <View style={[GlobalStyles.leftContainer, { marginTop: 20, marginLeft: 2 }, { flex: 0.15 }]}>
                            <TouchableOpacity
                                style={styles.searchButton}
                                onPress={() => {
                                    getAllMandirs();
                                    //setCurrentPage(1);
                                }}
                            >
                                {isLoading ? <LoadingIcon size="small" style={{ padding: 6 }} /> : <SearchIcon size={30} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {isSuperAdmin &&
                    <View style={[GlobalStyles.rowFlexStart, { paddingVertical: 2 }]}>
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

                }
                {/* {isLoading ? <Loader /> : */}
                    <View style={{ flex: 1,paddingBottom: 10 }}>
                        <MandirsTemplate listData={itemsToDisplay} navigation={navigation} delete_Mandir={delete_Mandir} />
                    </View>
                {/* } */}
            </View>

        </View>
    )
}

export default MandirsScreen

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
