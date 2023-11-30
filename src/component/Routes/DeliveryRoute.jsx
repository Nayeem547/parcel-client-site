import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import UseDeliveryMan from '../Hook/UseDeliveryMan';

const DeliveryRoute = ({children}) => {
    const { user, loading} = useContext(AuthContext);
    const [isDeliveryMan, isDeliveryLoading] = UseDeliveryMan();
    const location = useLocation();

    if(loading || isDeliveryLoading){
        return <progress className=' progress w-56 ' ></progress>
    }

    if(user && isDeliveryMan) {
        return children;
    }


    return <Navigate to="/login" state={{from: location}} replace >  </Navigate>
};

export default DeliveryRoute;