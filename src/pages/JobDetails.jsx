import React from 'react'
import { Clock } from 'lucide-react';
import Navbar from '@/components/Navbar'
import dummy from '../assets/dummy.jpg'

function JobDetails() {
  return (
    <>
    <Navbar />
    <section className='w-full bg-accent/20 min-h-screen'>
      <div className='container mx-auto px-4 py-8 max-w-4xl'>

        <div className='text-3xl md:text-4xl font-bold font-display mb-6 text-[#14A800]'>
          This Is Job Title.
        </div>

        <div className='w-full mb-8 rounded-xl overflow-hidden shadow-lg'>
          <img 
            src={dummy} 
            className='w-full h-80 object-cover rounded-xl'
            alt="Job cover" 
          />
        </div>


        <div className='flex items-center gap-2 mb-4 text-muted-foreground'>
          <Clock className='w-5 h-5' />
          <span>17 Nov 2025</span>
        </div>


        <div className='text-lg font-medium text-foreground mb-6'>
          Posted by: <span className='text-[#14A800] font-semibold'>MD. Sifat Hossain</span>
        </div>


        <div className='text-2xl font-bold font-display mb-4 text-foreground'>
          Job Description
        </div>


        <div className='bg-white rounded-lg p-6 shadow-sm border border-border space-y-4'>
          <p className='text-base text-foreground leading-relaxed'>
            We are looking for a talented and detail-oriented Web Developer to join our team. The ideal candidate will be responsible for designing, developing, and maintaining high-quality, responsive, and user-friendly websites and web applications. You will collaborate with cross-functional teams including designers, product managers, and backend developers to deliver seamless digital experiences.
          </p>


          <div className='mt-6 pt-6 border-t border-border'>
            <h3 className='text-lg font-semibold font-display mb-3'>Requirements:</h3>
            <ul className='space-y-2 text-sm text-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-[#14A800] font-bold mt-1'>•</span>
                <span>3+ years of experience in web development</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-[#14A800] font-bold mt-1'>•</span>
                <span>Proficiency in React, Node.js, and modern web technologies</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-[#14A800] font-bold mt-1'>•</span>
                <span>Strong problem-solving and communication skills</span>
              </li>
            </ul>
          </div>

          <div className='mt-8 pt-6 border-t border-border'>
            <button className='w-full md:w-auto bg-[#14A800] hover:bg-[#0f8000] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg'>
              Apply Now
            </button>
          </div>
        </div>

      </div>
    </section>
    </>
  )
}

export default JobDetails;
