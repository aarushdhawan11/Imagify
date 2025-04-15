import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const textItems = [
  "● Imagine it. Describe it. See it!",
  "● Turn words into art with AI magic!",
  "● Your ideas, AI’s brush—limitless possibilities!",
  "● Transform imagination into reality, one prompt at a time!",
  "● From text to stunning visuals in seconds!",
  "● A picture is worth a thousand words. AI makes it instant!",
  "● Unleash your creativity—AI does the rest!",
  "● Type it, click it, love it!"
];

const TextCarousel = () => {
  return (
    <div className="overflow-hidden w-full mt-6">
      <motion.div
        className="flex text-lg text-gray-700 font-semibold whitespace-nowrap dark:text-white"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      >
        {[...textItems, ...textItems].map((text, index) => (
          <span key={index} className="mx-2">{text}&nbsp;</span>
        ))}
      </motion.div>
    </div>
  );
};

const ImageCarousel = () => {
  return (
    <div className="overflow-hidden w-full mt-10 relative">
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...Array(6)].map((_, index) => (
          <motion.img
            whileHover={{ scale: 1.05 }}
            key={index}
            className="rounded mx-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt="Generated"
            width={150}
          />
        ))}
        {[...Array(6)].map((_, index) => (
          <motion.img
            whileHover={{ scale: 1.05 }}
            key={index + 6}
            className="rounded mx-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt="Generated"
            width={150}
          />
        ))}
      </motion.div>
    </div>
  );
};

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500 dark:bg-gray-800 dark:text-white dark:border-neutral-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p>Describe It, See It – AI Brings Your Vision to Life</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>

      <motion.h1
        className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center leading-tight dark:text-white'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      >
        Turn Text to <span className='text-blue-600'>image</span>, in seconds
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 2 }}
        className="w-full mt-4 sm:w-[350px] text-center mx-auto"
      >
        <button
          onClick={onClickHandler}
          className="px-6 py-3 bg-blue-600 text-white rounded-full w-full transition duration-200"
        >
          Generate Image
        </button>
      </motion.div>

      <TextCarousel />
      <ImageCarousel />
    </motion.div>
  );
};

export default Header;
