import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

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
        className="flex text-lg text-gray-700 font-semibold whitespace-nowrap"
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
          <img
            key={index}
            className="rounded mx-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt="Generated"
            width={150}
          />
        ))}
        {[...Array(6)].map((_, index) => (
          <img
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
  return (
    <div className='flex flex-col justify-center items-center text-center my-20'>
        <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
            <p>Describe It, See It – AI Brings Your Vision to Life</p>
            <img src={assets.star_icon} alt="" />
        </div>

        <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center leading-tight'>
          Turn Text to <span className='text-blue-600'>image</span>, in seconds.
        </h1>

        <p className='text-center max-w-xl mx-auto mt-5'>
          Transform text into stunning AI-generated visuals effortlessly. Just describe, generate, and create with precision. Unleash your creativity with the power of AI!
        </p>

        <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>
            Generate Images
            <img className='h-6' src={assets.star_group} alt=""/>
        </button>

        <TextCarousel />
        <ImageCarousel />
        <p className='mt-2 text-neutral-600'>Generated images from imagify</p>
    </div>
  );
}

export default Header;