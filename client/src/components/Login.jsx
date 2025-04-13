import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';
import { AppContext } from '../context/AppContext.jsx';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Login');
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading || otpLoading) return;

    try {
      setLoading(true);

      // LOGIN FLOW
      if (state === 'Login') {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email: formData.email,
          password: formData.password,
        });

        if (data.token) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          setShowLogin(false);
          toast.success('Login successful');
        }
        return;
      }

      // SIGNUP FLOW - SEND OTP
      if (!otpSent) {
        setOtpLoading(true);
        const { data } = await axios.post(`${backendUrl}/api/user/send-otp`, {
          email: formData.email,
        });

        if (data.success) {
          toast.success('OTP sent to your email');
          setOtpSent(true);
        } else {
          toast.error(data.message || 'Failed to send OTP');
        }
        return;
      }

      // SIGNUP FLOW - VERIFY OTP AND REGISTER
      if (!formData.otp) {
        toast.error('Please enter OTP');
        return;
      }

      // First verify OTP
      const otpRes = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        email: formData.email,
        otp: formData.otp,
      });

      if (!otpRes.data.success) {
        toast.error(otpRes.data.message || 'Invalid OTP');
        return;
      }

      // Then register user
      const regRes = await axios.post(`${backendUrl}/api/user/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (regRes.data.token) {
        setToken(regRes.data.token);
        setUser(regRes.data.user);
        localStorage.setItem('token', regRes.data.token);
        setShowLogin(false);
        toast.success('Account created successfully!');
      }
    } catch (error) {
      // Debugging: Log the error message for troubleshooting
      console.error('Error during API call:', error);

      // Error handling with more detailed error messages
      const errorMsg =
        error.response?.data?.message || error.message || 'An error occurred';
      toast.error(
        errorMsg.includes('Network Error')
          ? 'Unable to connect to server'
          : errorMsg
      );
    } finally {
      setLoading(false);
      setOtpLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      otp: '',
    });
    setOtpSent(false);
  };

  const toggleState = () => {
    setState((prev) => (prev === 'Login' ? 'Sign Up' : 'Login'));
    resetForm();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='relative bg-white p-8 rounded-xl text-slate-500 w-full max-w-md'
      >
        <h1 className='text-center text-2xl text-neutral-700 font-medium mb-2'>{state}</h1>
        <p className='text-sm text-center mb-6'>
          {state === 'Login' ? 'Welcome back!' : 'Create your account'}
        </p>

        {state === 'Sign Up' && !otpSent && (
          <div className='border px-4 py-3 flex items-center gap-3 rounded-lg mb-4'>
            <img src={assets.user_icon} alt='' className='w-5 h-5' />
            <input
              onChange={handleChange}
              value={formData.name}
              type='text'
              name='name'
              className='outline-none w-full text-sm'
              placeholder='Full Name'
              required
              disabled={loading}
            />
          </div>
        )}

        <div className='border px-4 py-3 flex items-center gap-3 rounded-lg mb-4'>
          <img src={assets.email_icon} alt='' className='w-5 h-5' />
          <input
            onChange={handleChange}
            value={formData.email}
            type='email'
            name='email'
            className='outline-none w-full text-sm'
            placeholder='Email Address'
            required
            disabled={loading || (state === 'Sign Up' && otpSent)}
          />
        </div>

        {(state === 'Login' || (state === 'Sign Up' && !otpSent)) && (
          <div className='border px-4 py-3 flex items-center gap-3 rounded-lg mb-4'>
            <img src={assets.lock_icon} alt='' className='w-5 h-5' />
            <input
              onChange={handleChange}
              value={formData.password}
              type='password'
              name='password'
              className='outline-none w-full text-sm'
              placeholder='Password'
              required
              disabled={loading}
              minLength={6}
            />
          </div>
        )}

        {state === 'Sign Up' && otpSent && (
          <div className='border px-4 py-3 flex items-center gap-3 rounded-lg mb-4'>
            <img src={assets.lock_icon} alt='' className='w-5 h-5' />
            <input
              onChange={handleChange}
              value={formData.otp}
              type='text'
              name='otp'
              className='outline-none w-full text-sm'
              placeholder='Enter 6-digit OTP'
              required
              disabled={loading}
              maxLength={6}
              pattern='\d{6}'
            />
          </div>
        )}

        <button
          type='submit'
          className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${loading || otpLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={loading || otpLoading}
        >
          {loading || otpLoading ? (
            <span className='flex items-center justify-center gap-2'>
              <svg
                className='animate-spin h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              {otpLoading ? 'Sending OTP...' : 'Processing...'}
            </span>
          ) : (
            state === 'Login' ? 'Login' : otpSent ? 'Verify OTP' : 'Send OTP'
          )}
        </button>

        <div className='text-center mt-4'>
          <p className='text-sm'>
            {state === 'Login' ? "Don't have an account?" : 'Already have an account?'}
            <span
              onClick={toggleState}
              className='cursor-pointer text-blue-600 hover:text-blue-700 font-medium ml-1'
            >
              {state === 'Login' ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
