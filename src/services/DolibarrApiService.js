import Axios from "axios";
import { AuthContext } from "../context/Auth";
import { config } from "../constants";

class DolibarrApiService {

  Axios = null;
  AxiosConfig = {
    baseURL: config.url.API_URL,
    headers: {
      "DOLAPIKEY": this.context.user.dolitoken
    },
  }

  constructor() {
    this.Axios = Axios.create()
  }

}

DolibarrApiService.contextType = AuthContext;
export default DolibarrApiService;