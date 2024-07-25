import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MyGradiantCard from '../../molecules/MyGradiantCard';
import { getUserDetail } from '../../../services/DataStorageService';
import { FetchDashboardDataTypeEnum } from '../../../types/CommonTypes';
import { navigateToAddDonationScreen, navigateToDashboardLMSCountsDetailScreen, navigateToDocumentShareWithWhatsApp, navigateToDonationScreen, navigateToEventsScreen, navigateToMandirPhotosScreen, navigateToMembersScreen, navigateToPhotoGalleryScreen, navigateToProjectDocuments, navigateToVideoGalleryScreen, navigateToVipPassScreen } from '../../../shared/Routes';
import MyText from '../../atoms/MyText';
import { GetSettings } from '../../../services/SeetingsService';
import { LinearGradient } from 'expo-linear-gradient';
import { FileShareIcon, WhatsAppIcon } from '../../../shared/Icons';
import GlobalStyles from '../../../shared/GlobalStyles';
import Config, { AppColors, ScreenNames } from '../../../shared/Config';
import LoaderIcon from '../../atoms/LoaderIcon';
import { GetAllJuniors } from '../../../services/CommonService';
import DropDownModalSelector from '../../atoms/DropDownModalSelector';
import { User } from '../../../models/User';
import { FormatName } from '../../../utilities/CommonHelper';
import MyButton from '../../atoms/MyButton';

interface DashboardLMSTemplateProps {
    counts: any,
    navigation: any,
    isLoading: boolean,
    setIsLoading: any,
    selectedJuniorUserId: number,
    onJuniorDropDownChange: (userId: number) => void
}
export default function DashboardLMSTemplate(props: DashboardLMSTemplateProps) {
    const { counts, navigation, isLoading, setIsLoading, selectedJuniorUserId, onJuniorDropDownChange } = props;

    const [userDetail, setUserDetail] = React.useState<User>();
    const [allowShareWithWhatsAppAPI, setAllowShareWithWhatsAppAPI] = React.useState<boolean>(false);
    const [listJuniors, setListJuniors] = React.useState<any[]>([]);
    const [juniorLabel, setJuniorLabel] = React.useState<string>("Select User");
    // const [juniorSelectedUserId, setJuniorSelectedUserId] = React.useState<number>(0);
    // const [loadingJuniors, setLoadingJuniors] = React.useState<boolean>(false);

    React.useEffect(() => {
        (
            async function () {
                const userD = await getUserDetail();
                console.log(userD, "userD");
                setUserDetail(userD);
            }
        )();

       
    }, []);

    const onCountsClick = (type: FetchDashboardDataTypeEnum) => {
        // alert(type);
        navigateToDashboardLMSCountsDetailScreen(navigation, selectedJuniorUserId, "", type);
    }

    

    return (
        <View style={styles.container}>

            {/* {
                listJuniors.length > 1 &&
                <View style={[GlobalStyles.rowFlexEnd, { paddingRight: 5, backgroundColor: AppColors.appPrimaryColor }]}> */}
                    {/* <MyText text='sdf' /> */}
                    {/* <DropDownModalSelector
                        initValueTextStyle={{ color: "#fff" }}
                        listKeyLable={listJuniors}
                        placeholder={juniorLabel}
                        onChange={(key, label) => {
                            const selectedUserId = +key;
                            setJuniorLabel(label);
                            onJuniorDropDownChange(selectedUserId);
                            // setJuniorUserId(selectedUserId);

                        }} />
                </View>
            } */}
            
            <View style={[styles.userDetailContainer, {paddingBottom:15} ]}>
                {/* <View style={styles.userIcon}> */}
                <Ionicons name="person-circle-outline" size={55} color="#FFFFFF" />
                {/* </View> */}
                <MyText fontSize={20} style={styles.username}>{FormatName(userDetail?.userName ?? "")}</MyText>
                {/* <MyText fontSize={13} mt5 color='#fff' text={FormatName(userDetail?.groupName ?? "")} /> */}
                {/* <MyText fontSize={13} color='#fff' text={userDetail?.department} /> */}
            </View>

            <ScrollView>

            <View style={[styles.bodyContainer, { marginTop: 20 }]}>

                <View style={styles.bodyRow}>
                    <MyGradiantCard onPress={() => navigateToMembersScreen(navigation, ScreenNames.DASHBOARD)} gradiantColors={['#74EBD5', '#ACD7F2']} containerStyle={{ marginRight: 15 }}>
                        <View style={styles.cardContent}>
                            <View>
                                <Text style={styles.bodyCardText}>Total Members</Text>
                                {
                                    isLoading &&
                                    <LoaderIcon style={{ padding: 10 }} color={"#fff"} size={"small"} />
                                }
                               

                            </View>
                        </View>
                    </MyGradiantCard>
                    <MyGradiantCard onPress={() => navigateToDonationScreen(navigation, ScreenNames.DASHBOARD)} gradiantColors={['#FF6B6B', '#FFD6AD']} >
                        <View style={styles.cardContent}>
                            {/* <Ionicons name="calendar-outline" size={32} color="white" style={styles.icon} /> */}
                            <View>
                                <Text style={styles.bodyCardText}>Total Donation</Text>
                                {/* <Text style={styles.bodyCardNumber}>{counts?.MissedFollowupLeads}</Text> */}
                                {
                                    isLoading &&
                                    <LoaderIcon style={{ padding: 10 }} color={"#fff"} size={"small"} />
                                }
                                
                            </View>
                        </View>
                    </MyGradiantCard>
                </View>

                <View style={[styles.bodyRow, { marginTop: 5 }]}>
                    <MyGradiantCard onPress={() => navigateToMembersScreen(navigation, ScreenNames.DASHBOARDMALE)} gradiantColors={['#8E54E9', '#4776E6']} containerStyle={{ marginRight: 15 }}>
                        <View style={styles.cardContent}>
                            <View>
                                <Text style={styles.bodyCardText}>Total Male</Text>
                                {
                                    isLoading &&
                                    <LoaderIcon style={{ padding: 10 }} color={"#fff"} size={"small"} />
                                }
                               
                            </View>
                        </View>
                    </MyGradiantCard>
                    <MyGradiantCard onPress={() => navigateToMembersScreen(navigation, ScreenNames.DASHBOARDFEMALE)} gradiantColors={['#FF68B8', '#8D3DAF']} >
                        <View style={styles.cardContent}>

                            <View>
                                {/* <Ionicons name="calendar-outline" size={32} color="white" style={styles.icon} /> */}

                                <Text style={styles.bodyCardText}>Total Female</Text>
                                {
                                    isLoading &&
                                    <LoaderIcon style={{ padding: 10 }} color={"#fff"} size={"small"} />
                                }
                                
                            </View>
                        </View>
                    </MyGradiantCard>
                </View>

                <View style={[styles.bodyRow, { marginTop: 5 }]}>
                    <MyGradiantCard onPress={() => navigateToVipPassScreen(navigation, ScreenNames.DASHBOARD)}
                        gradiantColors={['#4387FD', '#2BD4D9']} containerStyle={{ marginRight: 15 }}>
                        <View style={styles.cardContent}>
                            <View>
                                <Text style={styles.bodyCardText}>VIP Pass</Text>
                                {/* <Text style={styles.bodyCardNumber}>{counts?.NoFollowupLeads}</Text> */}
                                {
                                    isLoading &&
                                    <LoaderIcon style={{ padding: 10 }} color={"#fff"} size={"small"} />
                                }
                                
                            </View>
                        </View>
                    </MyGradiantCard>
                    <MyGradiantCard  onPress={() => navigateToEventsScreen(navigation, ScreenNames.DASHBOARD)}
                        gradiantColors={['#A770EF', '#CF8BF3']} >
                        <View style={styles.cardContent}>
                            <View>

                                <MyText style={[styles.bodyCardText, GlobalStyles.m10]}>Events</MyText>
                                {
                                    isLoading &&
                                    <LoaderIcon style={{ padding: 10 }} color={"#fff"} size={"small"} />
                                }
                               
                                {/* {
                                    isLoading &&
                                    <LoaderIcon style={{ padding: 10 }} color={"#fff"} size={"small"} />
                                }
                                {
                                    !isLoading &&
                                    <Text style={styles.bodyCardNumber}>
                                        {counts?.AllSiteVisitDone}
                                    </Text>
                                } */}
                            </View>
                        </View>
                    </MyGradiantCard>
                </View>
                <View style={[styles.bodyRow, { marginTop: 5 }]}>
                    <MyGradiantCard onPress={() => navigateToPhotoGalleryScreen(navigation, ScreenNames.DASHBOARD)}
                        gradiantColors={['#4CAF50', '#40E0D0']}
                        containerStyle={{ marginRight: 15 }}>
                        <View style={styles.cardContent}>
                            <View>
                                <Text style={styles.bodyCardText}>Photo Gallery</Text>
                                {/* <Text style={styles.bodyCardNumber}>{counts?.NoFollowupLeads}</Text> */}
                                {
                                    isLoading &&
                                    <LoaderIcon style={{ padding: 10 }} color={"#fff"} size={"small"} />
                                }
                               
                            </View>
                        </View>
                    </MyGradiantCard>
                    <MyGradiantCard  onPress={() => navigateToVideoGalleryScreen(navigation, ScreenNames.DASHBOARD)}
                       gradiantColors={['#4B0082', '#FF1493']}


                        >
                        <View style={styles.cardContent}>
                            <View>

                                <MyText style={[styles.bodyCardText, GlobalStyles.m10]}>Video Gallery</MyText>
                                {
                                    isLoading &&
                                    <LoaderIcon style={{ padding: 10 }} color={"#fff"} size={"small"} />
                                }
                                
                                {/* {
                                    isLoading &&
                                    <LoaderIcon style={{ padding: 10 }} color={"#fff"} size={"small"} />
                                }
                                {
                                    !isLoading &&
                                    <Text style={styles.bodyCardNumber}>
                                        {counts?.AllSiteVisitDone}
                                    </Text>
                                } */}
                            </View>
                        </View>
                    </MyGradiantCard>
                    
                </View>
                <View style={[styles.bodyRow, { marginTop: 5, }]}>
                    <MyGradiantCard onPress={() => navigateToMandirPhotosScreen(navigation, ScreenNames.DASHBOARD)}
                    //   gradiantColors={['#0077A7', '#E6D6B4']}
                    gradiantColors={['#4B0082', '#FF00FF']}


                       containerStyle={{ marginRight: 15, flex:0.5 }}>
                        <View style={styles.cardContent}>
                            <View>
                                <Text style={styles.bodyCardText}>Temple Photos</Text>
                                {/* <Text style={styles.bodyCardNumber}>{counts?.NoFollowupLeads}</Text> */}
                                {
                                    isLoading &&
                                    <LoaderIcon style={{ padding: 10 }} color={"#fff"} size={"small"} />
                                }
                               
                            </View>
                        </View>
                    </MyGradiantCard>
                    
                    
                </View>

            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    userDetailContainer: {
        backgroundColor: '#006290',
        // padding: 20,
        alignItems: 'center',
        elevation: 3,
        height: 210,
        justifyContent:'center'
    },
    userIcon: {
        width: 50,
        height: 50,
        backgroundColor: 'gray',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    designation: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    cardsContainer: {
        marginTop: -50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1,
        // borderRadius: 100
    },
    card: {
        width: 150,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3, // Add shadow effect
        position: 'relative',
        overflow: 'hidden',
    },
    cardOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
        borderRadius: 10,
        zIndex: -1,
    },

    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        // color: AppColors.appPrimaryColor,
        zIndex: 1,
    },
    cardNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        // color: '#FFFFFF',
        marginTop: 10,
        zIndex: 1,
    },



    bodyContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    bodyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    bodyCard: {
        flex: 1,
        height: 120,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    gradient: {
        flex: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    icon: {
        marginRight: 16,
    },
    bodyCardText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    bodyCardNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
});
