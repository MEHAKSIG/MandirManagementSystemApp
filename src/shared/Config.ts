export const AppColors = {
  appPrimaryColor: "#006290",
  appSecondaryColor: "#76bbde",
  appThirdColor: "#93b2fe",

  tabColor: "#3e8db5",
  redColor: "red",
  orangeColor: "orange",
  redGreen: "green",
  whiteColor: "#fff",

  siteVisitColors: {
    siteVisitPlanned: "orange",
    // siteVisitPlanned: "#FC977C",
    // siteVisitDone: "#97FC7C",
    siteVisitDone: "green",
  },
};

const Config = {
  apiRootUrl: "",
  apiRootUrl1: "",
  apiRootUrl2: "",
  appPrimaryColor: AppColors.appPrimaryColor,
  appSecondaryColor: AppColors.appSecondaryColor,
  appThirdColor: AppColors.appThirdColor,
  devepomentMobileNo: "",
};

export const ScreenNames = {
  DASHBOARD: "DASHBOARD",
  DASHBOARDMALE:"DASHBOARDMALE",
  DASHBOARDFEMALE:"DASHBOARDFEMALE",
  MANDIRS_SCREEN:"MANDIRS_SCREEN",
  ADD_MANDIR_SCREEN:"ADD_MANDIR_SCREEN",
  ADD_MEMBER_SCREEN:"ADD_MEMBER_SCREEN",
  MEMBERS_SCREEN:"MEMBERS_SCREEN",
  EVENTS_SCREEN:"EVENTS_SCREEN",
  ADD_EVENT_SCREEN: "ADD_EVENT_SCREEN",
  EVENT_DETAILS: "EVENT_DETAILS",
  PHOTO_GALLERY_SCREEN:"PHOTO_GALLERY_SCREEN",
  MANDIR_PHOTOS_SCREEN:"MANDIR_PHOTOS_SCREEN",
  VIPPASSSCREEN:"VIPPASSSCREEN",
  ADDVIPPASSSCREEN:"ADDVIPPASSSCREEN",
  DONATIONSCREEN: "DONATIONSCREEN",
  ADDDONATIONSCREEN: "ADDDONATIONSCREEN",

  DASHBOARD_SITEUSER: "DASHBOARD_SITEUSER",
  
  DASHBOARD_LMS_USER_COUNT_DETAIL: "DASHBOARD_LMS_USER_COUNT_DETAIL",
  DASHBOARD_LMS_USER_COUNTS: "DASHBOARD_LMS_USER_COUNTS",

};

export type ContextMenuType =
  | "REFRESH"
  | "SETTINGS"
  | "LOGOUT"
  | "LOGIN"
  | "ADD"
  | "CHANGE_PASSWORD"
  | "";

export default Config;
