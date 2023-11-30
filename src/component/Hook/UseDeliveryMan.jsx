import React, { useContext} from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from './UseAxiosPublic';

const UseDeliveryMan = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();
    
    const {data: isDeliveryMan, isPending: isDeliveryLoading } = useQuery({
        queryKey: [user?.email, 'isADeliveryMan'],
        enabled: !loading ,
        queryFn: async() => {
            console.log('asking or checking is delivery', user)
            const res = await axiosPublic.get(`/users/admin/${user.email}`);
            return res.data.deliveryMan;
        }
    })
    return [isDeliveryMan, isDeliveryLoading]
};

export default UseDeliveryMan;