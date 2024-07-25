import axios from "axios";
import Config from "../shared/Config";
import { Member } from "../models/Member";
const apiRootUrl1 = Config.apiRootUrl1;

  export const GetAllMembers  = async (mandirID:string,str:string) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/mandirMembers/FindByString?mandirId=${mandirID}&strText=${str}`;
    console.log(url, "GetAllMembers-url");
    const res = await axios.get(url);
    return await res.data;
  };
  export const FindByMemberId  = async (memberID:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/mandirMembers/FindByMemberId?memberId=${memberID}`;
    console.log(url, "GetAllMembers-url");
    const res = await axios.get(url);
    return await res.data;
  };
  export const Save_Member = async (member: Member) => {
    // const userDetail = await getUserDetail();
  
    const param = member;
    const url = `${apiRootUrl1}/mandirMembers/Save_Member`;
    console.log({ url, param }, "url-Save_Member");
    const res = await axios.post(url, param);
    return await res.data;
  };
  export const Delete_Member  = async (memberID:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/mandirMembers/Delete_Member?memberId=${memberID}`;
    console.log(url, "Delete_Member-url");
    const res = await axios.post(url);
    return await res.data;
  };