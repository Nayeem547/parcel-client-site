import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useaxiosSecure from "./useaxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useaxiosSecure();
  // const [loading, setLoading] = useState(true);
  const { data: role, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      // console.log('asking or checking is admin', user)
      const res = await axiosSecure.get(`/users/checkRole/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return { role, isAdminLoading };
};

export default UseAdmin;
