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
import { navigateToAddMemberScreen } from "../../shared/Routes";
import FormGroupDDL from "../../components/molecules/FormGroupDDL";
import { DropDownModel } from "../../components/atoms/DropDownModalSelector";
import { getUserDetail } from "../../services/DataStorageService";

import { ScrollView } from "react-native-gesture-handler";
import { GetAllMandirs } from "../../services/RegistrationService";

const MembersScreen = (props: BaseProps) => {
    const { navigation, route } = props;
    console.log(route, "route-MembersScreen");

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

    const initilizeData = async (navigateFrom?: string) => {

        const user = await getUserDetail();
        // console.log(isAdminUser, "isAdminUser");
        if (user) {
            setIsSuperAdmin(user?.isSuperAdmin);
            // setMandirId(user?.mandirId);
            await getAllMandirs(navigateFrom);
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
            headerTitle: "Members",
            headerRight: () =>
            (<ContextMenuIcons
                menus={contextMenu}
                onPress={(val) => {
                    if (val == 'ADD') {
                        navigateToAddMemberScreen(navigation, ScreenNames.MEMBERS_SCREEN);
                    }
                }}
            />)
        });
    };
  
    const getAllMandirs = async (navigateFrom?: string) => {
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
                getAllMembers(list[0]?.key, customerName, navigateFrom);
            } else if (!user?.isSuperAdmin && user?.mandirId > 0) {
                // Search for the item in the list whose key matches the mandirId
                const selectedMandir = list.find((item: { key: number; label: string }) => item.key === user.mandirId);
                if (selectedMandir) {
                    // console.log(selectedMandir, "selectedMandir")
                    setMandirVal(selectedMandir?.key?.toString());
                    setMandirLabel(selectedMandir?.label);
                    getAllMembers(selectedMandir?.key, customerName, navigateFrom);
                }
            }


            setListMandirs(list);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    const getAllMembers = async (mandirVal: string, customerName: string, navigateFrom?: string) => {
        setIsLoading(true);
        console.log(mandirVal,navigateFrom, "getAllMembers called")
        try {
            if (mandirVal) {
                const res = await GetAllMembers(mandirVal, customerName);
                if (navigateFrom) {
                    if (navigateFrom === "DASHBOARDMALE") {
                        // Add only male members to the list
                        const maleMembers = res?.list.filter((member:any) =>  member.gender.trim() === "Male");
                        
                        setMembersList(maleMembers);
                        setTotalPages(Math.ceil(maleMembers.length / itemsPerPage));
                    } else if (navigateFrom === "DASHBOARDFEMALE") {
                        // Add only female members to the list
                        const femaleMembers = res?.list.filter((member:any) => member.gender.trim() === "Female");
                        setMembersList(femaleMembers);
                        setTotalPages(Math.ceil(femaleMembers.length / itemsPerPage));
                    }else {
                        setMembersList(res?.list);
                    setTotalPages(Math.ceil(res?.list?.length / itemsPerPage));
                    }
                } else {
                    // If navigateFrom is not provided, set the whole list
                    setMembersList(res?.list);
                    setTotalPages(Math.ceil(res?.list?.length / itemsPerPage));
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const delete_Member = async (memberId: number) => {
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
                            const res = await Delete_Member(memberId);
                            if (res?.successMsg) {
                                setIsLoading(false);
                                alert(res?.successMsg);
                                getAllMembers(mandirVal, customerName);
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
        const onFocus = navigation.addListener('focus', () => {
            // Call necessary functions when component comes into focus
            initilizeData(props?.route?.params?.navigateFrom);
            bindContextMenu();
            setCustomerName('');
            console.log("workingggggggggggggggg");
        });
    
        // Clean up the listener
        return onFocus;
    }, []);
    
    // Another useEffect
    useEffect(() => {
        // This useEffect will run whenever props, route, or navigateFrom changes
        initilizeData(props?.route?.params?.navigateFrom);
    }, [ props.route.params?.navigateFrom]);
    
  
    
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
                        <FormGroup val={customerName} setVal={setCustomerName} label='Search Member' />
                    </View>

                    <View style={[GlobalStyles.leftContainer, { marginTop: 23, marginLeft: 2 }, { flex: 0.15 }]}>
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => {
                                getAllMembers(mandirVal, customerName);
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
                <View style={{ flex: 1, paddingBottom: 0 }}>
                    <MembersTemplate listData={itemsToDisplay} navigation={navigation} delete_Member={delete_Member} isSuperAdmin={isSuperAdmin}/>
                </View>
                {/* </ScrollView> */}
            </View>

        </View>
    )
}

export default MembersScreen

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
