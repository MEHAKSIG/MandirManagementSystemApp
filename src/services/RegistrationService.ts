import axios from "axios";
import Config from "../shared/Config";
import { Mandir } from "../models/Mandir";
import { Member } from "../models/Member";

const apiRootUrl1 = Config.apiRootUrl1;
export const GetAllMandirs  = async (str:string) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/Mandir/FindByString?strText=${str}`;
    console.log(url, "GetAllMandirs-url");
    const res = await axios.get(url);
    return await res.data;
  };

  export const FindByMandirId  = async (mandirID:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/Mandir/FindByMandirId?mandirId=${mandirID}`;
    console.log(url, "FindByMandirId-url");
    const res = await axios.get(url);
    return await res.data;
  };

  export const SaveMandir = async (mandir: Mandir) => {
    // const userDetail = await getUserDetail();
  
    const param = mandir;
    const url = `${apiRootUrl1}/Mandir/Save_Mandir`;
    console.log({ url, param }, "url-SaveMandir");
    const res = await axios.post(url, param);
    return await res.data;
  };
  export const Delete_Mandir  = async (mandirID:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/Mandir/Delete_Mandir?mandirId=${mandirID}`;
    console.log(url, "Delete_Mandir-url");
    const res = await axios.get(url);
    return await res.data;
  };


