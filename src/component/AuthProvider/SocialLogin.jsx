import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import UseAxiosPublic from '../Hook/UseAxiosPublic';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            console.log(result.user );
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
        })

    }
    return (
        <div>
            <div>
                <button  onClick={handleGoogleSignIn}
                className='btn bg-blue-950 text-white' >
                    <FaGoogle></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;