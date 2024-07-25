import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/User";


export const clearAsyncStorage = async () => {
    AsyncStorage.clear();
}

export const setUserDetail = async (userObj: any) => {
    console.log(userObj, "userObj-setUserDetail")
    await AsyncStorage.setItem("userDeetail", JSON.stringify(userObj));
}

export const getUserDetail = async (): Promise<User> => {
    let userDetail: User = {
        userId: 0,
        userName: '',
        userPwd: '',
        userDisplayName: '',
        userTypeId: 0,
        userType: null, // Replace 'null' with the actual type if known
        mandirId: 0,
        mobileNo: '',
        emailId: '',
        isSuperAdmin: false,
        crtUser: '',
        modUser: '',
      
    };

    const user = await AsyncStorage.getItem("userDeetail");
    const data = user && JSON.parse(user);
    if (data) {
        userDetail = {
            userId: data.userId,
            userName: data.userName,
            userPwd: data.userPwd,
            userDisplayName: data.userDisplayName,
            userTypeId: data.userTypeId,
            userType: data.userType,
            mandirId: data.mandirId,
            mobileNo: data.mobileNo,
            emailId: data.emailId,
            isSuperAdmin: data.isSuperAdmin,
            crtUser: data.crtUser,
            modUser: data.modUser,
           
        };
    }
     console.log(userDetail, "userDetail-DataStorage")
    return userDetail;
}

// export const getIsUserSuperAdmin = async () => {
//     const user = await getUserDetail();
//     return user?.isSuperAdmin;
// }
// export const getIsUserAdmin = async () => {
//     const user = await getUserDetail();
//     return user.role?.toLocaleLowerCase() == 'admin';
// }

// export const getIsUserGateUser = async () => {
//     const user = await getUserDetail();
//     return user.role?.toLocaleLowerCase() == 'gateuser';
// }

// export const getIsUserBroker = async () => {
//     const user = await getUserDetail();
//     return user.role?.toLocaleLowerCase() == 'broker';
// }

// export const setLocalDocPDF = async (item: any, contentUri: string, localFilePath: string) => {
//     const userDetail = await getUserDetail();
//     const saveDocs = await getAllLocalDocPDF();

//     console.log(saveDocs, "saveDocs-setLocalDocPDF");
//     // console.log({ item, contentUri, localfilePath }, "item-setLocalDocPDF");

//     let docsArray: any = saveDocs;

//     if (!docsArray) {
//         docsArray = [];
//     }
//     const itemObj = {
//         groupId: userDetail.groupId,
//         filePath: item.fullPath,
//         contentUri: contentUri,
//         localFilePath: localFilePath,
//         projDocId: item.projDocId,
//         fileExtenstion: item.fileType,
//     };
//     if (
//         !docsArray.some((x: any) => x.groupId == userDetail.groupId && x.filePath == item.filePath)
//     ) {
//         docsArray.push(itemObj);
//     } else {
//         docsArray = docsArray.filter(
//             (x: any) => x.groupId != userDetail.groupId && x.filePath != item.filePath
//         );
//         docsArray.push(itemObj);
//     }

//     await AsyncStorage.setItem("PDFLocalDocPath", JSON.stringify(docsArray));
// }


export const getAllLocalDocPDF = async () => {
    let docArray = await AsyncStorage.getItem("PDFLocalDocPath");
    // console.log(docArray, "docArray-getAllLocalDocPDF");
    if (docArray) {
        docArray = JSON.parse(docArray);
    }
    return docArray;
    // return JSON.parse(arrayString);
}
export const getLocalDocPDFByFilePath = async (groupId: number, filePath: string) => {
    let docArray: any = await AsyncStorage.getItem("PDFLocalDocPath");
    // console.log(docArray, "docArray-getLocalDocPDF");
    if (docArray) {
        docArray = JSON.parse(docArray);
        return docArray.find((x: any) => x.groupId == groupId && x.filePath == filePath);
    }
    return docArray;
    // return JSON.parse(arrayString);
}

export const removeLocalPDF = async () => {
    AsyncStorage.removeItem("PDFLocalDocPath");
    const data = getAllLocalDocPDF();
    console.log(data, "data-removeLocalPDF");
}

export const setTokens = async (accessToken: string, refreshToken: string) => {
    // console.log({ accessToken, refreshToken }, "settokens");
    await AsyncStorage.setItem(
        "tokens",
        JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken,
        })
    );
};

export const getTokens = async () => {
    const tokens = await AsyncStorage.getItem("tokens");
    if (tokens) {
        const token = JSON.parse(tokens);
        // console.log(token, "getTokens-DataStorageService");
        return {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        };
    }
    return {
        accessToken: "",
        refreshToken: "",
    };
};


export const setSettingsLocalStorage = async (settings: any) => {
    console.log({ settings }, "setSettingsLocalStorage");
    await AsyncStorage.setItem(
        "appSettings",
        JSON.stringify(settings)
    );
};

export const getSettingsLocalStorage = async () => {
    const strAppSettings = await AsyncStorage.getItem("appSettings");
    if (strAppSettings) {
        const appSettings = JSON.parse(strAppSettings);
        return {
            allowAddCustomerPhoto: appSettings.allowAddCustomerPhoto,
        };
    }
    return {
        allowAddCustomerPhoto: false
    };
};