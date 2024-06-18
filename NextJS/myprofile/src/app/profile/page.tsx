import React from 'react';

export default function page() {
  return (
    <div className='container mx-auto p-4'>
      <div className='bg-white dark:bg-gray-600 p-8 shadow-md shadow-slate-800 dark:shadow-slate-500 rounded-lg'>
        <h1 className='text-3xl font-semibold'>Your Name</h1>
        <p className='text-gray-600 dark:text-white'>Web Developer</p>

        <hr className='my-4' />

        <h2 className='text-xl font-semibold mb-2'>Summary</h2>
        <p className='text-gray-800 dark:text-white'>
          A passionate web developer with experience in creating responsive and
          interactive web applications.
        </p>

        <h2 className='text-xl font-semibold my-2'>Experience</h2>

        <div className='mb-4'>
          <h3 className='text-lg font-semibold'>
            Web Developer at ABC Company
          </h3>
          <p className='text-gray-700 dark:text-white'>June 2020 - Present</p>
          <ul className='list-disc list-inside text-gray-800 dark:text-white'>
            <li>Developed and maintained the company's website </li>
            <li>
              Collaborated with the design team to create visually appealing web
              pages{' '}
            </li>
            <li>Implemented responsive designs using Tailwind CSS </li>
            <li>Tailwind CSS</li>
            <li>Improved website performance by optimizing code and assets</li>
          </ul>
        </div>

        <h2 className='text-xl font-semibold my-2'>Education</h2>
        <div className='mb-4'>
          <h3 className='text-lg font-semibold'>
            Bachelor's Degree in Computer Science
          </h3>
          <p className='text-gray-700 dark:text-white'>Graduated in May 2019</p>
          <p className='text-gray-800 dark:text-white'>University of XYZ</p>
        </div>

        <h2 className='text-xl font-semibold my-2'>Skills</h2>
        <ul className='list-disc list-inside text-gray-800 dark:text-white'>
          <li>HTML5, CSS3, JavaScript</li>
          <li>React, Vue.js</li>
          <li>Responsive Web Design</li>
          <li>Tailwind CSS</li>
          <li>Git Version Control</li>
        </ul>
      </div>
    </div>
  );
}
