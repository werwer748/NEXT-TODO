import Axios from "axios";
import { POINT_CONVERSION_COMPRESSED } from "constants";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default axios;