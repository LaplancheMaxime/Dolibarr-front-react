import Axios from "axios";
import { AuthContext } from "../context/Auth";
import { config } from "../constants";

class DolibarrApiService {

  Axios = null;

  AxiosConfig = {
    baseURL: config.url.API_URL,
  }

  constructor() {
    console.log(this.context);
    this.Axios = Axios.create(this.AxiosConfig);
    if (this.context?.user?.dolitoken) {
      this.Axios.defaults.headers = {
        headers: {
          "DOLAPIKEY": this.context.user.dolitoken
        },
      }
    }
  }
}

DolibarrApiService.contextType = AuthContext;
export default DolibarrApiService;