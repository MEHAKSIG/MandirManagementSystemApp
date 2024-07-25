import axios from "axios";
import Config from "../shared/Config";



const apiRootUrl = Config.apiRootUrl;
const apiRootUrl1 = Config.apiRootUrl1;

export const AuthenticateUser = async (username: string, pwd: string) => {
  const url = `${apiRootUrl1}/user/ValidateUser?userName=${username}&password=${pwd}`;
  
  
  const res = await axios.get(url);
    return await res.data;
};



