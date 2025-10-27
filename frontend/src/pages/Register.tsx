
// import React, { useState } from 'react'
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios'

// const Register = () => {

//     const [values, setValues] = useState({
//         username: '',
//         email: '',
//         password: ''
//     })

//     const navigate = useNavigate()

//     const handleChanges = (e) => {
//         setValues({...values, [e.target.name]:e.target.value})
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const response = await axios.post('http://localhost:3000/auth/register', values)
//             if(response.status === 201) {
//                 navigate('/login')
//             }
//         } catch (error) {
//             console.log(error)
//         }

//     }

//   return (
//     <div className="flex flex-col justify-center sm:h-screen p-4">
//         <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
//             <div className="text-center mb-12">
//                 <Link to='/' className="text-blue-600 font-medium hover:underline ml-1">RNM AUTH
//                     <img src="" alt="logo" className="w-40 inline-block" />
//                 </Link>
//             </div>

//             <form onSubmit={handleSubmit}>
//                 <div className="space-y-6">
//                     <div>
//                         <label className="text-slate-900 text-sm font-medium mb-2 block">Username</label>
//                         <input name="username" type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter username" onChange={handleChanges} />
//                     </div>
                    
//                     <div>
//                         <label className="text-slate-900 text-sm font-medium mb-2 block">Email Id</label>
//                         <input name="email" type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" onChange={handleChanges} />
//                     </div>
                    
//                     <div>
//                         <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
//                         <input name="password" type="password" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" onChange={handleChanges} />
//                     </div>

//                     <div className="flex items-center">
//                         <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
//                         <label for="remember-me" className="text-slate-600 ml-3 block text-sm">
//                             I accept the <a href="javascript:void(0);" className="text-blue-600 font-medium hover:underline ml-1">Terms and Conditions</a>
//                         </label>
//                     </div>
//                 </div>

//                 <div className="mt-12">
//                     <button className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
//                     Create an account
//                     </button>
//                 </div>
//                 <p className="text-slate-600 text-sm mt-6 text-center">Already have an account? <Link to='/login' className="text-blue-600 font-medium hover:underline ml-1">Login here</Link></p>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default Register


import { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [values, setValues] = useState<RegisterFormValues>({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', values);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <Link to='/' className="text-blue-600 font-medium hover:underline ml-1">RNM AUTH
            <img src="" alt="logo" className="w-40 inline-block" />
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">Username</label>
              <input 
                name="username" 
                type="text" 
                className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" 
                placeholder="Enter username" 
                onChange={handleChanges} 
              />
            </div>
            
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">Email Id</label>
              <input 
                name="email" 
                type="email" 
                className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" 
                placeholder="Enter email" 
                onChange={handleChanges} 
              />
            </div>
            
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
              <input 
                name="password" 
                type="password" 
                className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" 
                placeholder="Enter password" 
                onChange={handleChanges} 
              />
            </div>

            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="text-slate-600 ml-3 block text-sm">
                I accept the <a href="#" className="text-blue-600 font-medium hover:underline ml-1">Terms and Conditions</a>
              </label>
            </div>
          </div>

          <div className="mt-12">
            <button 
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              Create an account
            </button>
          </div>
          <p className="text-slate-600 text-sm mt-6 text-center">Already have an account? <Link to='/login' className="text-blue-600 font-medium hover:underline ml-1">Login here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;

