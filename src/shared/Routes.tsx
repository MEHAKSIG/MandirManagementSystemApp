export const navigateToAddMandirScreen =async (
    navigation:any,
    navigateFrom?:string,
    mandirID?:number
) => {
const param ={
    navigateFrom,
    mandirID
}

navigation.navigate("AddMandirScreen", param)
}
export const navigateToMandirScreen =async (
    navigation:any,
    navigateFrom?:string,
   
) => {
const param ={
    navigateFrom,
    
}

navigation.navigate("MandirsScreen", param)
}
export const navigateToAddMemberScreen =async (
    navigation:any,
    navigateFrom?:string,
    memberID?:number,
    mandirID?:number
) => {
const param ={
    navigateFrom,
    memberID,
    mandirID
}
navigation.navigate("AddMemberScreen", param)
}
export const navigateToMembersScreen =async (
    navigation:any,
    navigateFrom?:string,
   
) => {
const param ={
    navigateFrom,
    
}

navigation.navigate("MembersScreen", param)
}
export const navigateToDonationScreen =async (
    navigation:any,
    navigateFrom?:string,
   
) => {
const param ={
    navigateFrom,
    
}

navigation.navigate("DonationScreen", param)
}
export const navigateToAddDonationScreen =async (
    navigation:any,
    navigateFrom?:string,
    donationID?:number,
    mandirID?:number
) => {
const param ={
    navigateFrom,
    donationID,
    mandirID
}
navigation.navigate("AddDonationScreen", param)
}
export const navigateToVipPassScreen =async (
    navigation:any,
    navigateFrom?:string,
   
) => {
const param ={
    navigateFrom,
    
}

navigation.navigate("VipPassScreen", param)
}
export const navigateToAddVipPassScreen =async (
    navigation:any,
    navigateFrom?:string,
    vipPassID?:number,
    mandirID?:number
) => {
const param ={
    navigateFrom,
    vipPassID,
    mandirID
}
navigation.navigate("AddVipPassScreen", param)
}
export const navigateToAddEventScreen =async (
    navigation:any,
    navigateFrom?:string,
    eventID?:number,
    mandirID?:number
) => {
const param ={
    navigateFrom,
    eventID,
    mandirID
}
navigation.navigate("AddEventScreen", param)
}
export const navigateToEventDetailsScreen =async (
    navigation:any,
    isSuperAdmin:boolean,    
    navigateFrom?:string,
    mandirID?:number,
    eventID?:number,
    
    
) => {
const param ={
    navigateFrom,
    eventID,
    mandirID,
    isSuperAdmin
}
navigation.navigate("EventDetailsScreen", param)
}
export const navigateToEventDetailsScreenPublic =async (
    navigation:any,    
    navigateFrom?:string,
    mandirID?:number,
    eventID?:number,
    
) => {
const param ={
    navigateFrom,
    eventID,
    mandirID
}
navigation.navigate("EventDetailsScreenPublic", param)
}
export const navigateToLoginScreen =async (
    navigation:any,    
    navigateFrom?:string,
    
    
) => {
const param ={
    navigateFrom,
    
}
navigation.navigate("Login", param)
}
export const navigateToEventsScreen =async (
    navigation:any,
    navigateFrom?:string,
   
) => {
const param ={
    navigateFrom,
    
}

navigation.navigate("EventsScreen", param)
}
export const navigateToPhotoGalleryScreen =async (
    navigation:any,
    navigateFrom?:string,
   
) => {
const param ={
    navigateFrom,
    
}

navigation.navigate("PhotoGalleryScreen", param)
}
export const navigateToAlbumPhotosScreen =async (
    navigation:any,
    isSuperAdmin:boolean,
    navigateFrom?:string,
    mandirID?:number,
    eventID?:number,
) => {
const param ={
    navigateFrom,
    mandirID,
    eventID,
    isSuperAdmin
}
navigation.navigate("AlbumPhotosScreen", param)
}
export const navigateToAddPhotoScreen =async (
    navigation:any,
    navigateFrom?:string,
    mandirID?:number,
    eventID?:number,
) => {
const param ={
    navigateFrom,
    mandirID,
    eventID
}
navigation.navigate("AddPhotoScreen", param)
}
export const navigateToMandirPhotosScreen =async (
    navigation:any,
    navigateFrom?:string,
   
) => {
const param ={
    navigateFrom,
    
}

navigation.navigate("MandirPhotosScreen", param)
}
export const navigateToAddMandirPhotosScreen =async (
    navigation:any,
    navigateFrom?:string,
    
) => {
const param ={
    navigateFrom
}
navigation.navigate("AddMandirPhotoScreen", param)
}
export const navigateToVideoGalleryScreen =async (
    navigation:any,
    navigateFrom?:string,
   
) => {
const param ={
    navigateFrom,
    
}

navigation.navigate("VideosScreen", param)
}





export const navigateToAddCustomerWithCP = async (
    navigation: any,
    navigateFrom: string
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("AddCustomerWithCP", param);
};

export const navigateToAddCustomerOnly = async (
    navigation: any,
    navigateFrom: string
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("AddCustomerOnly", param);
};

export const navigateToSiteVisitReportScreen = async (
    navigation: any,
    navigateFrom: string
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("SiteVisitReport", param);
};

export const navigateToWebView = async (
    navigation: any,
    title?: string,
    url?: string,
    isHTML?: boolean,
    base64File?: string,
    navigateFrom?: string,

) => {
    const param = {
        navigateFrom,
        title,
        url,
        isHTML,
        base64File
    };
    navigation.navigate("WebView", param);
};

export const navigateToAddBrokerLeads = async (
    navigation: any,
    navigateFrom?: string,
    leadDetail?: any

) => {
    const param = {
        navigateFrom,
        leadDetail,
    };
    navigation.navigate("AddBrokerLeads", param);
};

export const navigateToBrokerLeads = async (
    navigation: any,
    navigateFrom?: string,

) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("Root", param);
};

export const navigateToAddBroker = async (
    navigation: any,
    navigateFrom?: string,
    item?: string,

) => {
    const param = {
        navigateFrom,
        item
    };
    navigation.navigate("AddBroker", param);
};

export const navigateToBroker = async (
    navigation: any,
    navigateFrom?: string,

) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("BrokersScreen", param);
};

export const navigateToShowLeadsScreen = async (
    navigation: any,
    navigateFrom?: string,

) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("Leads", param);
};

export const navigateToAddLeads = async (
    navigation: any,
    custId?: number,
    navigateFrom?: string,


) => {
    const param = {
        navigateFrom,
        custId
    };
    navigation.navigate("AddLeadsScreen", param);
};

export const navigateToLeadDetailScreen = async (
    navigation: any,
    custId?: number,
    custName?: string,
    navigateFrom?: string,


) => {
    const param = {
        navigateFrom,
        custId,
        custName
    };
    navigation.navigate("LeadDetailScreen", param);
};

export const navigateToChangePwdScreen = async (
    navigation: any,
    navigateFrom?: string,
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("ChangePwd", param);
};

export const navigateToAddCustomerPhoto = async (
    navigation: any,
    item: { custId: number },
    navigateFrom?: string,
) => {

    const param = {
        navigateFrom,
        item
    };

    navigation.navigate("AddCustomerPhoto", param);
};

export const navigateToViewCustomerPhoto = async (
    navigation: any,
    customerId: number,
    customerName: string,
    navigateFrom?: string,
) => {

    const param = {
        navigateFrom,
        customerId,
        customerName
    };

    navigation.navigate("ViewCustomerPhoto", param);
};

export const navigateToDashboardLMSCountsDetailScreen = async (
    navigation: any,
    userId: number,
    title: string,
    type: string,
    navigateFrom?: string,
) => {

    const param = {
        navigateFrom,
        userId,
        title,
        type
    };

    navigation.navigate("LMSUserDashboardCountDetail", param);
};

export const navigateToProjectDocuments = async (
    navigation: any,
    navigateFrom?: string,
) => {

    const param = {
        navigateFrom,
    };

    navigation.navigate("ProjectDocumentScreen", param);
};

export const navigateToDocumentShareWithWhatsApp = async (
    navigation: any,
    navigateFrom?: string,
) => {

    const param = {
        navigateFrom,
    };

    navigation.navigate("DocumentShareWithWhatsApp", param);
};


export const navigateToDocumentShareOnWhatsAppNo = async (
    navigation: any,
    navigateFrom?: string,
) => {

    const param = {
        navigateFrom,
    };

    navigation.navigate("DocumentShareOnWhatsAppNoScreen", param);
};

export const navigateToBookUnit = async (
    navigation: any,
    customerId: number,
    customerDetail: any,
    navigateFrom?: string,
) => {

    const param = {
        navigateFrom,
        customerId,
        customerDetail
    };

    navigation.navigate("BookUnit", param);
};