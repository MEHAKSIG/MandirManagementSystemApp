import { View, FlatList } from 'react-native'
import React from 'react'
import GlobalStyles from '../../../shared/GlobalStyles';
import EmptyListMessage from '../../molecules/EmptyListMessage';
import CallableMobileNo from '../../atoms/CallableMobileNo';
import { navigateToBookUnit, navigateToLeadDetailScreen } from '../../../shared/Routes';
import { AppColors, ScreenNames } from '../../../shared/Config';
import MyText from '../../atoms/MyText';
import MyButton from '../../atoms/MyButton';
import { FetchDashboardDataTypeEnum } from '../../../types/CommonTypes';

interface DashboardLMSCountsDetailTemplateProps {
    listData: any,
    navigation: any,
    type: FetchDashboardDataTypeEnum,
    onActionClick?: (actionName: 'update-active', selectedItem: any) => void,
}
export default function DashboardLMSCountsDetailTemplate(props: DashboardLMSCountsDetailTemplateProps) {
    const { listData, navigation, type, onActionClick } = props;

    const getSiteVisitColor = (item: any) => {

        if (item?.isSiteVisitDone) {
            return AppColors.siteVisitColors.siteVisitDone;
        } else if (item?.isSiteVisitPlanned) {
            return AppColors.siteVisitColors.siteVisitPlanned;
        } else {
            // return AppColors.siteVisitColors.siteVisitDone;
            return '#000';
        }

    }

    const renderItem = ({ item, index }: { item: any, index: number }): React.ReactElement => {
        let mobile = item.mobile;
        if (mobile.length == 6) {
            mobile = "****" + mobile;
        }

        return (
            <View style={[{ padding: 8, backgroundColor: '#fff' }, GlobalStyles.borderBottom]}>
                {/* <Text>
                    {JSON.stringify(item)}
                </Text> */}

                <View style={GlobalStyles.rowSpaceBetween}>
                    <MyText bold text={item.custName} />
                    <MyText text={`${item.queryDateStr ?? item.querydate}`} />
                </View>
                <View style={GlobalStyles.rowSpaceBetween}>
                    <CallableMobileNo mobileNo={`${mobile}`} lable='' />
                    {
                        item.Email &&
                        <MyText text={`${item.Email ?? "-"}`} />
                    }
                </View>

                {
                    item.sourceName &&
                    <View style={GlobalStyles.rowSpaceBetween}>
                        <MyText text={`Source : ${item.sourceName ?? ""}`} />
                        {
                            item.subSourceName &&
                            <MyText text={`Sub Source : ${item.subSourceName ?? ""}`} />
                        }
                    </View>
                }
                {
                    item.lastFollowup &&
                    <MyText text={`Last Followup Date : ${item.lastFollowupDateStr ?? item.lastFollowup}`} />
                }
                {
                    item.lastFollowupType &&
                    <MyText text={`Last Followup Type : ${item.lastFollowupType ?? ""}`} />
                }

                {
                    item.lastFollowupRemark &&
                    <MyText text={`Last Followup Remakrs : ${item.lastFollowupRemark ?? ""}`} />
                }
                {
                    item.brokerName &&
                    <MyText text={`C.P Name : ${item.brokerName ?? ""}`} />
                }
                {
                    item.brokerMobile &&
                    <CallableMobileNo mobileNo={`${item.brokerMobile}`} lable='C.P Mobile : ' />

                    // <MyText text={`C.P Name : ${item.brokerMobile ?? ""}`} />
                }
                <View style={GlobalStyles.rowSpaceBetween}>
                    {
                        item.isSiteVisitDone && <MyText bold color={getSiteVisitColor(item)} mt5>Site Visit Done</MyText>
                    }
                    {
                        item.isSiteVisitPlanned && !item.isSiteVisitDone && <MyText color={getSiteVisitColor(item)} mt5 bold >Site Visit Planned</MyText>
                    }
                    {
                        !item.isSiteVisitPlanned && !item.isSiteVisitDone && <MyText bold mt5> </MyText>
                    }
                    <View style={GlobalStyles.rowFlexEnd}>
                        <MyButton mt5 mr5 text={item.status ? 'Active' : 'Inactive'}
                            type='solid'
                            color={item.status ? 'green' : 'red'}
                            buttonStyle={{ paddingVertical: 0 }}
                            containerStyle={{ width: 80 }}
                            fontSize={14}
                            onPress={() => {
                                // console.log(item, "item-selected");
                                onActionClick && onActionClick('update-active', item);
                                // navigateToBookUnit(navigation, item.custID, item, ScreenNames.SHOW_LEADS);
                            }} />

                        <MyButton mt5 mr5 text='Book Unit'
                            type='solid'
                            color='green'
                            buttonStyle={{ paddingVertical: 0 }}
                            containerStyle={{ width: 90 }}
                            fontSize={14}
                            onPress={() => {
                                console.log(item, "item-selected");
                                navigateToBookUnit(navigation, item.custID, item, ScreenNames.SHOW_LEADS);
                            }} />

                        <MyButton mt5 text='Detail'
                            type='solid'
                            buttonStyle={{ paddingVertical: 0 }}
                            containerStyle={{ width: 65 }}
                            fontSize={14}
                            onPress={() => {
                                // console.log(item, "item-selected");
                                navigateToLeadDetailScreen(navigation, item.custID, item.custName, ScreenNames.SHOW_LEADS);
                            }} />
                    </View>
                </View>
            </View>

        );
    };

    return (
        <View style={{ padding: 0, paddingBottom: type == 'TotalLeads' ? 70 : 0 }}>
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<EmptyListMessage text="No Data Found" />}
            />
        </View >
    )
}
