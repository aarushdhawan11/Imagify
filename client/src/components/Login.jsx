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

      if (!formData.otp) {
        toast.error('Please enter OTP');
        return;
      }

      const otpRes = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        email: formData.email,
        otp: formData.otp,
      });

      if (!otpRes.data.success) {
        toast.error(otpRes.data.message || 'Invalid OTP');
        return;
      }

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
      console.error('Error during API call:', error);
      const errorMsg =
        error.response?.data?.message || error.message || 'An error occurred';
      toast.error(errorMsg.includes('Network Error')
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

        {/* Google Sign-In */}
        <div className='flex items-center justify-center gap-2 my-4'>
          <a
            href={"http://localhost:4000/auth/google"}
            className='flex items-center justify-center gap-3 w-full py-2 px-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md transition'
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className='w-5 h-5' />
            <span className='text-sm text-gray-700 font-medium'>Sign in with Google</span>
          </a>
        </div>

        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* OTP Verification */}
        {state === 'Sign Up' && otpSent && (
          <div className='border px-4 py-3 flex items-center gap-3 rounded-lg mb-4'>
            <img src={assets.lock_icon} alt='' className='w-5 h-5' />
            <input
              onChange={handleChange}
              value={formData.otp}
              type='text'
              name='otp'
              className='outline-none w-full text-sm'
              placeholder='Enter OTP'
              required
              disabled={loading}
            />
          </div>
        )}

        <div className='text-center mb-4'>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-500 text-white rounded-lg'
            disabled={loading || otpLoading}
          >
            {loading || otpLoading ? 'Processing...' : state === 'Login' ? 'Log In' : otpSent ? 'Verify OTP' : 'Sign Up'}
          </button>
        </div>

        <div className='text-center'>
          <p className='text-sm'>
            {state === 'Login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={toggleState} className='text-blue-500'>
              {state === 'Login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
