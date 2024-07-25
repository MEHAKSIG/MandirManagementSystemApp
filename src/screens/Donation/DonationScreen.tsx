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
import { Delete_Member,  GetAllMembers } from "../../services/MembersService";
import MembersTemplate from "../../components/templates/member/MembersTemplate";
import { navigateToAddDonationScreen, navigateToAddMemberScreen } from "../../shared/Routes";
import FormGroupDDL from "../../components/molecules/FormGroupDDL";
import { DropDownModel } from "../../components/atoms/DropDownModalSelector";
import { getUserDetail } from "../../services/DataStorageService";

import { ScrollView } from "react-native-gesture-handler";
import { GetAllMandirs } from "../../services/RegistrationService";
import DonationTemplate from "../../components/templates/Donation/DonationTemplate";
import { Delete_Donation, GetAllDonations } from "../../services/DonationService";

const DonationScreen = (props: BaseProps) => {
    const { navigation, route } = props;
   
    const [listMandirs, setListMandirs] = React.useState<DropDownModel[]>([]);
    const [mandirVal, setMandirVal] = React.useState<string>('');
    const [mandirLabel, setMandirLabel] = React.useState('Select');


    const [customerName, setCustomerName] = React.useState('');
    const [membersList, setMembersList] = React.useState<any[]>([]);
    const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [contactsList, setContactsList] = React.useState<any[]>([]);
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
            //  getAllMembers();
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
            headerTitle: "Donation",
            headerRight: () =>
            (<ContextMenuIcons
                menus={contextMenu}
                onPress={(val) => {
                    if (val == 'ADD') {
                        navigateToAddDonationScreen(navigation, ScreenNames.MEMBERS_SCREEN);
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
                console.log(list[0]?.key, mandirVal,"selectedMandir")
                getAllDonations(list[0]?.key,customerName);
            } else if (!user?.isSuperAdmin && user?.mandirId > 0) {
                // Search for the item in the list whose key matches the mandirId
                const selectedMandir = list.find((item: { key: number; label: string }) => item.key === user.mandirId);
                if (selectedMandir) {
                    // console.log(selectedMandir, "selectedMandir")
                    setMandirVal(selectedMandir?.key?.toString());
                    setMandirLabel(selectedMandir?.label);
                    getAllDonations(selectedMandir?.key,customerName);
                }
            }

            
            setListMandirs(list);
            
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    const getAllDonations = async (mandirVal:string,customerName:string) => {
        setIsLoading(true);
console.log(mandirVal,"getAllMembers called")
        try {
            if (mandirVal) {
                const res = await GetAllDonations(mandirVal, customerName);

                setMembersList(res?.list);
                setTotalPages(Math.ceil(res?.list?.length / itemsPerPage));
            }


        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const delete_Donation = async (donationID: number) => {
        // Display confirmation dialog
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this member?",
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
                            const res = await Delete_Donation(donationID);
                            if (res?.successMsg) {
                                setIsLoading(false);
                                alert(res?.successMsg);
                                getAllDonations(mandirVal, customerName);
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
    const itemsToDisplay = membersList.slice(startIndex, endIndex)
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 5, }}>
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
                        <FormGroup val={customerName} setVal={setCustomerName} label='Search Donation' />
                    </View>

                    <View style={[GlobalStyles.leftContainer, { marginTop: 23, marginLeft: 2 }, { flex: 0.15 }]}>
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => {
                                getAllDonations(mandirVal,customerName);
                            }}
                        >
                            {isLoading ? <LoadingIcon size="small" style={{ padding: 6 }} /> : <SearchIcon size={30} />}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[GlobalStyles.rowFlexStart, { paddingVertical: 5 }]}>
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

                {/* <ScrollView> */}
                    <View style={{ flex:1,paddingBottom:0 }}>
                        <DonationTemplate listData={itemsToDisplay} navigation={navigation} delete_Donation={delete_Donation} isSuperAdmin={isSuperAdmin}/>
                    </View>
                {/* </ScrollView> */}
            </View>

        </View>
    )
}

export default DonationScreen

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