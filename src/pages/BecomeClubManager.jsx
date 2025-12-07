import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import {
  UserCheck,
  Mail,
  Phone,
  MessageSquare,
  Shield,
  AlertCircle,
  LocationEdit,
} from 'lucide-react';
import { AuthContext } from '../provider/authProvider';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';

const BecomeManager = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  const {register,handleSubmit,formState:{errors},reset}= useForm()


 const handleSubmitApplication = (data)=>{
    console.log(data)
    axiosSecure.post('/clubManager',data)
    .then(res=>{
        console.log(res.data)
        if(res.data.insertedId){
            alert('request successfull')
            reset()
        }
    })
    .catch(err=>{
        alert(err)
    })
 }


  // If not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please log in to continue
          </h2>
          <Button onClick={() => navigate('/login')} className="rounded-full px-8">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <UserCheck className="w-10 h-10 text-main" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Become a Club Manager
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Create clubs, organize events, and lead passionate communities on ClubNest.
          </p>
        </div>

        
          {/* Application Form */ }
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-linear-to-r from-main to-purple-700 p-8 text-white">
              <h2 className="text-2xl font-bold">Manager Application</h2>
              <p className="opacity-90 mt-1">One step away from leading communities</p>
            </div>

            <form onSubmit={handleSubmit(handleSubmitApplication)} className="p-8 md:p-12 space-y-8">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                    <UserCheck className="w-5 h-5" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={user?.displayName}
                    readOnly
                    {...register('name',{required:true})}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition cursor-not-allowed"
                    placeholder="John Doe"
                  />
                  {errors?.name?.type === 'required' && (
                    <p className='text-red-500 text-sm'>Name is Required</p>
                )}
                </div>

                <div>
                  <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                    <Mail className="w-5 h-5" />
                    Email (Verified)
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    {...register('email',{required:true})}
                    className="w-full px-5 py-4  border border-gray-300 rounded-xl cursor-not-allowed"
                  />
                  {errors?.email?.type === 'required' && (
                    <p className='text-red-500 text-sm'>Email is Required</p>
                )}
                </div>
              </div>

              {/* Phone & location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                    <Phone className="w-5 h-5" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    {...register('phone',{required:true})}    
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main transition"
                  />
                  {errors?.phone?.type === 'required' && (
                    <p className='text-red-500 text-sm'>Phone is Required</p>
                )}
                </div>


                <div>
                  <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                    <LocationEdit className="w-5 h-5" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="phone"
                    {...register('location',{required:true})}    
                    placeholder="Location"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main transition"
                  />
                  {errors?.location?.type === 'required' && (
                    <p className='text-red-500 text-sm'>Location is Required</p>
                )}
                </div>

                
              </div>

              {/* Motivation */}
              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-5 h-5" />
                  Why do you want to be a Club Manager?
                </label>
                <textarea
                  name="motivation"
                  rows={6}
                  {...register('motivation',{required:true})}
                  placeholder="Share your passion, ideas, or past experience in building communities..."
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-main resize-none transition"
                />
                {errors?.motivation?.type === 'required' && (
                    <p className='text-red-500 text-sm'>Motivation is Required</p>
                )}
              </div>

             

              {/* Submit Button */}
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  
                  className="px-12 py-5 text-xl font-semibold rounded-full bg-main hover:bg-main/90 text-white shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
                >
                 
                      <Shield className="w-6 h-6" />
                      Submit Application
                  
                </Button>
              </div>
            </form>
          </div>
        
      </div>
    </div>
  );
};

export default BecomeManager;