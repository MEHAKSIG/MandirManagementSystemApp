import axios from "axios";
import Config from "../shared/Config";
import { Member } from "../models/Member";
import { Donation } from "../models/Donation";
const apiRootUrl1 = Config.apiRootUrl1;

  export const GetAllDonations  = async (mandirID:string,str:string) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/MandirDoantion/FindByString?mandirId=${mandirID}&strText=${str}`;
    console.log(url, "GetAllDonations-url");
    const res = await axios.get(url);
    return await res.data;
  };
  export const FindByDonationId  = async (donationID:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/MandirDoantion/FindByDonationId?donationId=${donationID}`;
    console.log(url, "FindByDonationId-url");
    const res = await axios.get(url);
    return await res.data;
  };
  export const Save_Donation = async (donation: Donation) => {
    // const userDetail = await getUserDetail();
  
    const param = donation;
    const url = `${apiRootUrl1}/MandirDoantion/Save_Donation`;
    console.log({ url, param }, "url-Save_Donation");
    const res = await axios.post(url, param);
    return await res.data;
  };
  export const Delete_Donation  = async (donationID:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/MandirDoantion/Delete_Donation?donationId=${donationID}`;
    console.log(url, "Delete_Donation-url");
    const res = await axios.post(url);
    return await res.data;
  };