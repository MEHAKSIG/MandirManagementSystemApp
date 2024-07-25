import { FetchDashboardDataTypeEnum } from "../types/CommonTypes";

export type StackParamList = {
  Login:{navigateFrom: string};
  Root: { navigateFrom: string };
  Dashboard: { navigateFrom: string };
  SiteUserDashboard: { navigateFrom: string };
  MandirsScreen:{navigateFrom: string};
  AddMandirScreen:{navigateFrom: string, mandirID?:number};
  MembersScreen:{navigateFrom: string};
AddMemberScreen:{navigateFrom: string,memberID?:number,mandirID?:number};
DonationScreen:{navigateFrom: string};
AddDonationScreen:{navigateFrom: string,donationID?:number,mandirID?:number};
VipPassScreen:{navigateFrom: string};
AddVipPassScreen:{navigateFrom: string,vipPassID?:number,mandirID?:number};
EventsScreen:{navigateFrom: string};
EventsScreenPublic:{navigateFrom: string};
EventDetailsScreen:{navigateFrom: string,isSuperAdmin:boolean, mandirID?:number,eventID?:number,};
EventDetailsScreenPublic:{navigateFrom: string, mandirID?:number,eventID?:number,};
AddEventScreen:{navigateFrom: string,eventID?:number,
  mandirID?:number};
PhotoGalleryScreen:{navigateFrom: string};
AlbumPhotosScreen:{navigateFrom: string,isSuperAdmin:boolean,mandirID?:number,eventID?:number,};
AddPhotoScreen:{navigateFrom: string,mandirID?:number,eventID?:number,};
MandirPhotosScreen:{navigateFrom: string};
AddMandirPhotoScreen:{navigateFrom: string};
VideosScreen:{navigateFrom: string};

 
  LMSUserDashboard: { navigateFrom: string };
  LMSUserDashboardCountDetail: {
    navigateFrom: string;
    title: string;
    type: FetchDashboardDataTypeEnum;
    userId: number;
  };
 
};
