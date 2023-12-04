import axios from "axios";


 const axiosPublic = axios.create({
    baseURL: 'https://parcel-server-site.vercel.app'
 })
 //https://parcel-server-site.vercel.app
const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;