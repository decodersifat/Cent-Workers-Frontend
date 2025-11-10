import React, { useState } from 'react'
import { List, LayoutGrid, Briefcase, Clock, User } from 'lucide-react'
import GridJobsCard from './GridJobsCard'
import ListJobsCard from './ListJobsCard'
export default function RecentJob() {
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

    // Sample job data - replace with API call
    const jobs = [
        {
            id: 1,
            title: 'Senior React Developer',
            company: 'Tech Corp',
            category: 'Web Development',
            postedDate: '2 days ago',
            image: 'https://via.placeholder.com/300x200?text=React+Developer'
        },
        {
            id: 2,
            title: 'UI/UX Designer',
            company: 'Design Studio',
            category: 'Design',
            postedDate: '1 week ago',
            image: 'https://via.placeholder.com/300x200?text=UI+Designer'
        },
        {
            id: 3,
            title: 'Full Stack Developer',
            company: 'StartUp Inc',
            category: 'Web Development',
            postedDate: '3 days ago',
            image: 'https://via.placeholder.com/300x200?text=Full+Stack'
        },
        {
            id: 4,
            title: 'Mobile App Developer',
            company: 'App Studios',
            category: 'Mobile',
            postedDate: '5 days ago',
            image: 'https://via.placeholder.com/300x200?text=Mobile+Dev'
        },
    ]

    return (
        <div className='w-full py-16 bg-accent/10'>
            <div className='container mx-auto px-4'>

                <div className='text-center mb-12'>
                    <h2 className='text-4xl lg:text-5xl font-display font-bold mb-4 '>
                        Recently Posted Jobs
                    </h2>
                    <div className='w-24 h-1 bg-linear-to-r from-[#14A800] to-[#0f8000] mx-auto rounded-full'></div>
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
                    <a href='/all-jobs' className='text-[#14A800] hover:text-[#0f8000] font-medium transition-colors duration-200'>
                        View all →
                    </a>

                    <div className='flex gap-2 bg-white border border-border rounded-lg p-1 shadow-sm'>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded transition-all duration-200 ${
                                viewMode === 'grid'
                                    ? 'bg-[#14A800] text-white'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                            title='Grid view'
                        >
                            <LayoutGrid className='w-5 h-5' />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded transition-all duration-200 ${
                                viewMode === 'list'
                                    ? 'bg-[#14A800] text-white'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                            title='List view'
                        >
                            <List className='w-5 h-5' />
                        </button>
                    </div>
                </div>

                {viewMode === 'grid' ? (

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {jobs.map((job) => (
                            <GridJobsCard job={job}/>
                        ))}
                    </div>
                ) : (

                    <div className='space-y-3'>
                        {jobs.map((job) => (
                            <ListJobsCard job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
