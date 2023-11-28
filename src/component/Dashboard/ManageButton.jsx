import React from 'react';
import useaxiosSecure from '../Hook/useaxiosSecure';

const ManageButton = () => {
    const axiosSecure = useaxiosSecure();
    const {   data: manage = []  } = useQuery({
        queryKey: ['delivery-men'],
        queryFn: async () => {
          const res = await axiosSecure.get('/delivery-men');
          return res.data;
        },
      });
      console.log(manage);
    return (
        <div>
            
        </div>
    );
};

export default ManageButton;