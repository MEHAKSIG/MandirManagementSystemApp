// import React, { useEffect } from "react";
// import { BaseProps } from "../Dashboard/DashboardScreen";
// import ContextMenuIcons, { ContextMenu } from "../../components/organisms/ContextMenuIcons";
// import { TouchableOpacity, View,StyleSheet } from "react-native";
// import GlobalStyles from "../../shared/GlobalStyles";
// import FormGroup from "../../components/molecules/FormGroup";
// import LoadingIcon from "../../components/atoms/LoadingIcon";
// import { SearchIcon } from "../../shared/Icons";
// import MyText from "../../components/atoms/MyText";
// import Config, { ScreenNames } from "../../shared/Config";
// import { GetAllContacts } from "../../services/MembersService";
// import MembersTemplate from "../../components/templates/member/MembersTemplate";
// import { navigateToAddEventScreen, navigateToAddMemberScreen, navigateToAddPhotoScreen } from "../../shared/Routes";
// import FormGroupDDL from "../../components/molecules/FormGroupDDL";
// import { DropDownModel } from "../../components/atoms/DropDownModalSelector";
// import EventsTemplate from "../../components/templates/Events/EventsTemplate";
// import PhotoGalleryTemplate from "../../components/templates/PhotoGallery/PhotoGalleryTemplate";

// const VideoGalleryScreen = (props: BaseProps) => {
//     const { navigation, route } = props;
//     const mandirsList: DropDownModel[] = [
//         // { key: '', label: 'Select' },
//         { key: 'Mandir 1', label: 'Mandir 1' },
//         { key: 'Mandir 2', label: 'Mandir 2' },
    
//       ];
//       const [mandirVal, setMandirVal] = React.useState<string>('');
//     const [customerName, setCustomerName] = React.useState('');
  
//     const [isLoading, setIsLoading] = React.useState<boolean>(false);
//     const [contactsList, setContactsList] = React.useState<any[]>([]);
//     const [currentPage, setCurrentPage] = React.useState(1);
//     const [totalPages, setTotalPages] = React.useState(0);
//     const itemsPerPage = 20;

//     const bindContextMenu = async () => {
//         const contextMenu: ContextMenu[] = [
//             // { type:'REFRESH', size: 28, color: '#fff' },
//             { type: 'ADD', size: 33, color: '#fff' },
//             // { type: 'CHANGE_PASSWORD', size: 33, color: '#fff' },
//             { type: 'LOGOUT', size: 28, color: '#fff' },
//         ];

//         navigation.setOptions({
//             headerTitle: "Photo Gallery",
//             headerRight: () =>
//             (<ContextMenuIcons
//                 menus={contextMenu}
//                 onPress={(val) => {
//                     if (val == 'ADD') {
//                         navigateToAddPhotoScreen(navigation,ScreenNames.PHOTO_GALLERY_SCREEN);
//                     } 
//                 }}
//             />)
//         });
//     };

//     useEffect(() => {
//         bindContextMenu();
//         getAllContacts();
//     }, []);

//     const getAllContacts = async () => {
//         setIsLoading(true);

//         try {

//             const res = await GetAllContacts(customerName);
//             console.log(res.list.length, "res-getAllContacts")
//             setContactsList(res.list);
//             setTotalPages(Math.ceil(res.list.length / itemsPerPage));
//         }
//         catch (error) {
//             console.error(error);
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     const handlePageChange = (newPage: number) => {
//         setCurrentPage(newPage)
//     }
//     const handleNextClick = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1)
//         }
//     }
//     const handlePrevClick = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1)
//         }
//     }
//     const preDisabled = currentPage === 1;
//     const nextDisable = currentPage === totalPages;

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const itemsToDisplay = contactsList.slice(startIndex, endIndex)
//     return (
//         <View style={{ flex: 1,  paddingHorizontal: 5, }}>
//             <View style={styles.container}>
//             <FormGroupDDL
//               label="Select Mandir"
//               listKeyLable={mandirsList}
//               placeholder={mandirsList.find((item) => item.key === mandirVal)?.label || 'Select'}
//               onChange={(key, label) =>
//                 setMandirVal(key)
//               }
//             />
//                 <View style={GlobalStyles.leftRightParentContainer}>
//                     <View style={GlobalStyles.leftContainer}>
//                         <FormGroup val={customerName} setVal={setCustomerName} label='Search Album' />
//                     </View>
                   
//                     <View style={[GlobalStyles.leftContainer, { marginTop: 23, marginLeft: 2 }, { flex: 0.15 }]}>
//                         <TouchableOpacity
//                             style={styles.searchButton}
//                             onPress={() => {
//                                 getAllContacts();
//                                 //setCurrentPage(1);
//                             }}
//                         >
//                             {isLoading ? <LoadingIcon size="small" style={{ padding: 6 }} /> : <SearchIcon size={30} />}
//                         </TouchableOpacity>
//                     </View>
//                 </View>
               
//                 <View style={[GlobalStyles.rowFlexStart, { marginTop: 5.3, marginBottom:10 }]}>
//                     <TouchableOpacity
//                         onPress={handlePrevClick}
//                         disabled={preDisabled}
//                         style={{
//                             marginRight: 4,
//                             paddingVertical: 4,
//                             paddingHorizontal: 6,
//                             backgroundColor: preDisabled ? '#ccc' : '#005ca8', // Change color when disabled
//                             borderRadius: 4
//                         }}
//                     >
//                         <MyText text="<" color="#fff" />
//                     </TouchableOpacity>

//                     {Array.from({ length: totalPages }, (_, i) => {
//                         const isDisabled = i + 1 === currentPage;
//                         return (
//                             <View style={[GlobalStyles.rowFlexStart]} key={i}>
//                                 <TouchableOpacity
//                                     onPress={() => handlePageChange(i + 1)}
//                                     disabled={isDisabled}
//                                     style={{
//                                         marginRight: 4,
//                                         paddingVertical: 4,
//                                         paddingHorizontal: 6,
//                                         backgroundColor: isDisabled ? '#ccc' : '#005ca8', // Change color when disabled
//                                         borderRadius: 4
//                                     }}
//                                 >
//                                     <MyText text={`${i + 1}`} color="#fff" />
//                                 </TouchableOpacity>
//                             </View>
//                         );
//                     })}

//                     <TouchableOpacity
//                         onPress={handleNextClick}
//                         disabled={nextDisable}
//                         style={{
//                             marginRight: 4,
//                             paddingVertical: 4,
//                             paddingHorizontal: 6,
//                             backgroundColor: nextDisable ? '#ccc' : '#005ca8', // Change color when disabled
//                             borderRadius: 4
//                         }}
//                     >
//                         <MyText text=">" color="#fff" />
//                     </TouchableOpacity>
//                 </View>


//                 <View style={{flex: 1,}}>
//                     <PhotoGalleryTemplate listData={itemsToDisplay} navigation={navigation}  />
//                 </View>
//             </View>

//         </View>
//     )
// }

// export default VideoGalleryScreen

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 5,
//     },

//     searchButton: {
//         borderWidth: 1,
//         borderColor: Config.appSecondaryColor,
//         padding: 4,
//         borderRadius: 5,
//         textAlign: "center",
//     },
// });
