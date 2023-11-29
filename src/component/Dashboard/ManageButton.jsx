import React from 'react';
import useaxiosSecure from '../Hook/useaxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageButton = () => {
    const axiosSecure = useaxiosSecure();
    const {   data: deliveryMan = []  } = useQuery({
        queryKey: ['delivery-men'],
        queryFn: async () => {
          const res = await axiosSecure.get('/delivery-men');
          return res.data;
        },
      });
      console.log(deliveryMan);
    return (
        <div>
            
        </div>
    );
};

export default ManageButton;