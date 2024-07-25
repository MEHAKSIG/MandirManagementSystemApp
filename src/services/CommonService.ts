// import axios from "axios";
import Config from "../shared/Config";
import { getUserDetail } from "./DataStorageService";
import { ApiContext } from "./api-context/ApiContext";

const apiRootUrl = Config.apiRootUrl;

export const GenerateUUID = () => {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const GetAllStates = async () => {
  const url = `${apiRootUrl}/Common/GetAllStates`;
  console.log(url, "url-GetAllStates");
  return await ApiContext.get(url);
};

export const GetAllCities = async () => {
  const url = `${apiRootUrl}/Common/GetAllCities`;
  console.log(url, "url-GetAllCities");
  return await ApiContext.get(url);
};

export const GetAllProjects = async () => {
  const url = `${apiRootUrl}/Common/getAllProj`;
  console.log(url, "url-GetAllProjects");
  return await ApiContext.get(url);
};

export const GetAllJuniors = async () => {
  const user = await getUserDetail();

  const url = `${apiRootUrl}/common/getJuniors_byUserId?userId=${user.userId}`;
  console.log(url, "url-GetAllJuniors");
  return await ApiContext.get(url);
};

export const GetAllSources = async () => {
  const url = `${apiRootUrl}/Common/GetAllSources`;
  console.log(url, "url-GetAllSources");
  return await ApiContext.get(url);
};

export const GetListSubSourcesBySourceId = async (sourceId: number) => {
  const url = `${apiRootUrl}/Common/GetSubSourcesBySourceId?sourceId=${sourceId}`;
  console.log(url, "url-GetListSubSourcesBySourceId");
  return await ApiContext.get(url);
};

export const GetAllPropType = async () => {
  const url = `${apiRootUrl}/Common/getAllPropType`;
  console.log(url, "url-GetAllPropType");
  return await ApiContext.get(url);
};

export const GetInstrumentTypes = async () => {
  const url = `${apiRootUrl}/Common/GetInstrumentTypes`;
  console.log(url, "url-GetInstrumentTypes");
  return await ApiContext.get(url);
};
