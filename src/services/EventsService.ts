import axios from "axios";
import Config from "../shared/Config";
import { EventDetails } from "../models/Event";

const apiRootUrl1 = Config.apiRootUrl1;

  export const GetAllEvents  = async (mandirID:string,str:string) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/mandirEvents/FindByString?mandirId=${mandirID}&strText=${str}`;
    console.log(url, "GetAllEvents-url");
    const res = await axios.get(url);
    return await res.data;
  };
  export const FindByEventId  = async (eventID:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/mandirEvents/FindByEventId?eventId=${eventID}`;
    console.log(url, "FindByEventId-url");
    const res = await axios.get(url);
    return await res.data;
  };
  export const Save_Event = async (event: EventDetails) => {
    // const userDetail = await getUserDetail();
  
    const param = event;
    const url = `${apiRootUrl1}/mandirEvents/Save_Event`;
    console.log({ url, param }, "url-Save_Event");
    const res = await axios.post(url, param);
    return await res.data;
  };
  export const Delete_Event  = async (eventID:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/mandirEvents/Delete_Event?eventId=${eventID}`;
    console.log(url, "Delete_Event-url");
    const res = await axios.post(url);
    return await res.data;
  };

  export const SaveEventImage  = async (eventID:number,mandirID:number, formData:FormData) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/mandirEvents/Save_GalleryData?eventId=${eventID}&MandirId=${mandirID}&Doctype=Photo&eventImageId=0&docName=abc.pdf&remarks&crtUser`;
    console.log({ url, formData }, "url-SaveEventImage");
    const res = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return await res.data;
  };
  export const Find_GaleryByEventId  = async (eventID:number,mandirID:number,) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/mandirEvents/Find_GaleryByEventId?eventId=${eventID}&mandirId=${mandirID}`;
    console.log(url, "Find_GaleryByEventId-url");
    const res = await axios.get(url);
    return await res.data;
  };
  export const Find_GaleryByMandirId  = async (mandirID:number,) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/mandirEvents/Find_GaleryByMandirId?mandirId=${mandirID}`;
    console.log(url, "Find_GaleryByMandirId-url");
    const res = await axios.get(url);
    return await res.data;
  };
  export const Delete_EventImage  = async (eventImageId:number) => {

    // const userDetail = await DataStorageService.getUserDetail();
    // console.log(userDetail, "userDetail");
    const url = `${apiRootUrl1}/mandirEvents/Delete_File?eventImageId=${eventImageId}`;
    console.log(url, "Delete_EventImage-url");
    const res = await axios.get(url);
    return await res.data;
  };