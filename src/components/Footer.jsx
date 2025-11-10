import React from 'react'
import { Briefcase, Mail, MapPin, Phone, Facebook, Twitter, X,  Linkedin, Github } from 'lucide-react'
import { Link } from 'react-router'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className='bg-slate-900 text-white mt-16'>
            <div className='container mx-auto px-4 py-12'>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>

                    <div className='space-y-4'>
                        <div className='flex items-center gap-2'>
                            <Briefcase className='w-6 h-6 text-[#14A800]' />
                            <h3 className='text-xl font-display font-bold'>Cent Workers</h3>
                        </div>
                        <p className='text-slate-400 text-sm leading-relaxed'>
                            Connecting talented freelancers with amazing projects. Build your career on your terms.
                        </p>
                        <div className='flex gap-3 pt-2'>
                            <a
                                href='#'
                                className='w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#14A800] flex items-center justify-center transition-colors'
                                title='Facebook'
                            >
                                <Facebook className='w-4 h-4' />
                            </a>
                            <a
                                href='#'
                                className='w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#14A800] flex items-center justify-center transition-colors'
                                title='Twitter'
                            >
                                <X className='w-4 h-4' />
                            </a>
                            <a
                                href='#'
                                className='w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#14A800] flex items-center justify-center transition-colors'
                                title='LinkedIn'
                            >
                                <Linkedin className='w-4 h-4' />
                            </a>
                            <a
                                href='#'
                                className='w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#14A800] flex items-center justify-center transition-colors'
                                title='GitHub'
                            >
                                <Github className='w-4 h-4' />
                            </a>
                        </div>
                    </div>


                    <div className='space-y-4'>
                        <h4 className='text-lg font-display font-semibold'>Quick Links</h4>
                        <nav className='space-y-2'>
                            <Link
                                to='/'
                                className='block text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                            >
                                Home
                            </Link>
                            <Link
                                to='/all-jobs'
                                className='block text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                            >
                                Browse Jobs
                            </Link>
                            <Link
                                to='/add-job'
                                className='block text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                            >
                                Post a Job
                            </Link>
                            <a
                                href='#'
                                className='block text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                            >
                                How it Works
                            </a>
                        </nav>
                    </div>


                    <div className='space-y-4'>
                        <h4 className='text-lg font-display font-semibold'>For Workers</h4>
                        <nav className='space-y-2'>
                            <a
                                href='#'
                                className='block text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                            >
                                Find Jobs
                            </a>
                            <a
                                href='#'
                                className='block text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                            >
                                Build Profile
                            </a>
                            <a
                                href='#'
                                className='block text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                            >
                                Safety Tips
                            </a>
                            <a
                                href='#'
                                className='block text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                            >
                                FAQ
                            </a>
                        </nav>
                    </div>


                    <div className='space-y-4'>
                        <h4 className='text-lg font-display font-semibold'>Contact Us</h4>
                        <div className='space-y-3'>
                            <a
                                href='mailto:support@centworkers.com'
                                className='flex items-start gap-3 text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                            >
                                <Mail className='w-4 h-4 mt-1 shrink-0' />
                                <span>support@centworkers.com</span>
                            </a>
                            <a
                                href='tel:+1234567890'
                                className='flex items-start gap-3 text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                            >
                                <Phone className='w-4 h-4 mt-1 shrink-0' />
                                <span>+1 (234) 567-890</span>
                            </a>
                            <div className='flex items-start gap-3 text-slate-400 text-sm'>
                                <MapPin className='w-4 h-4 mt-1 shrink-0' />
                                <span>123 Business Ave, City, Country</span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='border-t border-slate-800 mb-8'></div>

                <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                    <p className='text-slate-400 text-sm'>
                        © {currentYear} Cent Workers. All rights reserved.
                    </p>

                    <div className='flex flex-wrap justify-center gap-6'>
                        <a
                            href='#'
                            className='text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                        >
                            Privacy Policy
                        </a>
                        <a
                            href='#'
                            className='text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                        >
                            Terms of Service
                        </a>
                        <a
                            href='#'
                            className='text-slate-400 hover:text-[#14A800] transition-colors text-sm'
                        >
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
