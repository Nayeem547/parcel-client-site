import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../Hook/UseAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const {user, updateUserProfile} = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

    const onSubmit = data => {

       
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: data.photoURL
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })


                    })
                    .catch(error => console.log(error))
            
    };
    return (
        <div>
            <div>

                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div>
                    <img className=' w-56 rounded-full ' src={user?.photoURL} alt="" />
                </div>
                <div>
                <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  defaultValue={user?.displayName}
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  defaultValue={user?.email}
                  className="input input-bordered"
                  required
                />
              </div>
                </div>

                <div className=" mt-8 text-center ">
            <input  
          type="submit"
          value="Purchase"
          className=" btn btn-block mt-8 bg-slate-800 text-white "
        />
                
            </div>

                </form>
            </div>
        </div>
    );
};

export default MyProfile;