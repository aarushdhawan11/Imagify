import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-4 mt-20 px-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'>
      <img src={assets.logo} alt="Logo" width={150} />

      <p className='flex-1 border-l border-gray-400 dark:border-gray-600 pl-4 text-sm text-gray-600 dark:text-gray-300 max-sm:hidden'>
        © xyz.dev | All rights reserved.
      </p>

      <div className='flex gap-2.5'>
        <img src={assets.facebook_icon} alt="Facebook" width={35} className='hover:opacity-80 transition' />
        <img src={assets.twitter_icon} alt="Twitter" width={35} className='hover:opacity-80 transition' />
        <img src={assets.instagram_icon} alt="Instagram" width={35} className='hover:opacity-80 transition' />
      </div>
    </div>
  );
};

export default Footer;
