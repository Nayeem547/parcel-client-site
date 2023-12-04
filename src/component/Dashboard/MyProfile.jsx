import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import UseAxiosPublic from '../Hook/UseAxiosPublic';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';


const image_hosting_key = "6556843c7660482ef03ef054d9d22208";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
console.log(image_hosting_key);

const MyProfile = () => {

    const {user} = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();

    const { data: profile = [] } = useQuery({
      queryKey: ["profile"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/users/${user.email}`);
        return res.data;
      },
    });
    

    const {
        register,
        handleSubmit,
        reset,
        
      } = useForm();

    const onSubmit = async (data) => {


      const imagefile = {image: data.image[0]};
    const res = await axiosPublic.post(image_hosting_api, imagefile, {
        headers: {
            'content-type' : 'multipart/form-data'
        }
    } );
    if(res.data.success){
      
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            image: res.data.data.display_url
                        }
                        console.log(userInfo.name);
                        console.log(userInfo.image);  
                        axiosPublic.put(`/users/${user?.email}`, {userInfo})
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
                                    
                                }
                            })


                          
                    .catch(error => console.log(error))
            
    };
  };
    return (
        <div>
            {profile.map( (item) => (
              <div key={item._id} >
                <div className=' bg-blue-950 w-[400px] rounded-xl shadow-2xl '>

<form onSubmit={handleSubmit(onSubmit)} className="card-body">
<div className=' flex flex-col items-center gap-6 justify-center '>
    <img className=' w-56 rounded-full ' src={item?.image} alt="" />

    <div>
<input {...register('image')} type="file" className="file-input w-full max-w-xs" />
</div>
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
  defaultValue={item?.name}
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
  defaultValue={item?.email}
  className="input input-bordered"
  required
  readOnly
/>
</div>
</div>

<div className=" mt-8 text-center ">
<input  
type="submit"
value="Update"
className=" btn btn-block mt-8 bg-slate-800 text-white "
/>

</div>

</form>
</div>
              </div>
            )
            
            )}
        </div>
    );
};

export default MyProfile;