


import { useContext, useEffect, useRef, useState } from 'react';

import { Link,  useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthProvider';



const Login = () => {

    const CaptchaRef = useRef(null);

    const [disabled, setDisablad] = useState(true);

    const {signIn} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    
    
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
        .then(result => {
            const user = result.user;
           console.log(user);
            Swal.fire({
                title: "Custom animation with Animate.css",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });

           navigate(from, {replace: true})
        })
    }  

  

    return (
        <div>
            <h2>Please Login</h2>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card justify-center text-center pb-4  flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        
        <div className="form-control mt-6">
          
          <input  type="submit"  value="Login" className="btn btn-primary"  />
        </div>
      </form>
      <p className=' pb-2 ' ><small>New Here? <Link to="/signUp" >Create an Account</Link> </small></p>
      
    </div>
   
  </div>
</div>
        </div>
    );
};

export default Login;