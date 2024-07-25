import axios from "axios";
import Config from "../shared/Config";
import { Member } from "../models/Member";
import { VipPass } from "../models/VipPass";
const apiRootUrl1 = Config.apiRootUrl1;

  export const GetAllVipEntryy  = async (mandirID:string,str:string) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/vipEntryy/FindByString?mandirId=${mandirID}&strText=${str}`;
    console.log(url, "GetAllVipEntryy-url");
    const res = await axios.get(url);
    return await res.data;
  };
  export const FindByvipPassId  = async (vipPassID:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/vipEntryy/FindByvipPassId?vipPassId=${vipPassID}`;
    console.log(url, "FindByvipPassId-url");
    const res = await axios.get(url);
    return await res.data;
  };
  export const Save_Entry = async (vipPass: VipPass) => {
    // const userDetail = await getUserDetail();
  
    const param = vipPass;
    const url = `${apiRootUrl1}/vipEntryy/Save_Entry`;
    console.log({ url, param }, "url-Save_Entry");
    const res = await axios.post(url, param);
    return await res.data;
  };
  export const Delete_VipEntry_Member  = async (detailID:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/vipEntryy/Delete_VipEntry_Member?detailId=${detailID}`;
    console.log(url, "Delete_VipEntry_Member-url");
    const res = await axios.post(url);
    return await res.data;
  };
  export const Delete_VipEntry  = async (vipPassID:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/vipEntryy/Delete_VipEntry?vipPassId=${vipPassID}`;
    console.log(url, "Delete_VipEntry-url");
    const res = await axios.post(url);
    return await res.data;
  };