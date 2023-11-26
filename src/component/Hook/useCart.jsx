

import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useaxiosSecure from './useaxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {

    const axiosSecure = useaxiosSecure();

    const {user} = useContext(AuthContext);

    const { refetch, data: ordes = []} = useQuery({
        queryKey: ["ordes", user?.email],
        queryFn:async() => {
            const  res = await axiosSecure.get(`/order?email=${user.email}`)
            return res.data;
        }
    })
    return [ordes, refetch]
};

export default useCart;