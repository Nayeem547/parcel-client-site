import  { createContext, useEffect, useState } from 'react';

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../Firebase/firebase.config';
import UseAxiosPublic from '../Hook/UseAxiosPublic';
const auth = getAuth(app);
 export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const axiosPublic = UseAxiosPublic();
    
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword( auth ,email, password);
      }

      const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
      }

      const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name, photoURL: photo
        })
      }

      const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    // useEffect(()=>{
    //     const unSbscribe = onAuthStateChanged(auth, currentUser =>{
    //         setUser(currentUser);
    //         setLoading(false);
    //     });
    //     return()=>{
    //         unSbscribe();
    //     }
    
    //   }, []) 

    useEffect( () => {
        const  unsubscribe = onAuthStateChanged(auth, currentUser => {
           setUser(currentUser);

           if(currentUser){
             const userInfo = {
               email: currentUser.email
             }
             axiosPublic.post('/jwt', userInfo)
             .then(res => {
               if(res.data.token){
                 localStorage.setItem('access-token', res.data.token);
               }
             })
           }
           else{
             localStorage.removeItem('access-token');
           }

           setLoading(false);
       });
       return () => {
           return unsubscribe();
       }
   } , [axiosPublic])

//     useEffect( () => {
//         const  unsubscribe = onAuthStateChanged(auth, currentUser => {
//            setUser(currentUser);

//         //    if(currentUser){
//         //      const userInfo = {
//         //        email: currentUser.email
//         //      }
//         //      axiosPublic.post('/jwt', userInfo)
//         //      .then(res => {
//         //        if(res.data.token){
//         //          localStorage.setItem('access-token', res.data.token);
//         //        }
//         //      })
//         //    }
//         //    else{
//         //      localStorage.removeItem('access-token');
//         //    }

//            setLoading(false);
//        });
//        return () => {
//            return unsubscribe();
//        }
//    } , [])


   const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile

  }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;