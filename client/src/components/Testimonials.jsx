import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-20 py-12 px-4'
    >
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2 dark:text-white'>
        Customer Testimonials
      </h1>
      <p className='text-gray-500 mb-12 dark:text-gray-300'>
        What Our Users Are Saying?
      </p>

      <div className='flex flex-wrap justify-center gap-6'>
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className='bg-white/20 dark:bg-gray-800/80 p-12 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 w-80 cursor-pointer hover:scale-[1.02] transition-all'
          >
            <div className='flex flex-col items-center'>
              <img
                src={testimonial.image}
                alt=""
                className='rounded-full w-14'
              />
              <h2 className='text-xl font-semibold mt-3 dark:text-white'>
                {testimonial.name}
              </h2>
              <p className='text-gray-500 mb-4 dark:text-gray-400'>
                {testimonial.role}
              </p>
              <div className='flex mb-4'>
                {Array(testimonial.stars).fill().map((_, i) => (
                  <img key={i} src={assets.rating_star} alt="star" />
                ))}
              </div>
              <p className='text-center text-sm text-gray-600 dark:text-gray-300'>
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials;
