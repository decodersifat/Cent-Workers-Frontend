

'use client'


import React, { useEffect, useState } from 'react'
import { List, LayoutGrid, Briefcase, Clock, User } from 'lucide-react'
import GridJobsCard from './GridJobsCard'
import ListJobsCard from './ListJobsCard'


export default function RecentJob() {
    const [viewMode, setViewMode] = useState('grid')
    const API = `${import.meta.env.VITE_BASE_URL}/api/v1/jobs/recent-jobs`
    const [jobs, setJobs] = useState([]);
    

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(API);
                
                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("Jobs fetched:", data);
                
                // Handle different response formats
                let jobsArray = [];
                if (Array.isArray(data)) {
                    jobsArray = data;
                } else if (data.jobs) {
                    jobsArray = data.jobs;
                } else if (data.data) {
                    jobsArray = data.data;
                } else if (data.Job) {
                    // Handle single job response, wrap in array
                    jobsArray = [data.Job];
                }
                setJobs(jobsArray);
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setJobs([]); 
            }
        };
        
        fetchJobs();
    }, [API])



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
                            className={`p-2 rounded transition-all duration-200 ${viewMode === 'grid'
                                ? 'bg-[#14A800] text-white'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                            title='Grid view'
                        >
                            <LayoutGrid className='w-5 h-5' />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded transition-all duration-200 ${viewMode === 'list'
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
                            <GridJobsCard key={job.id || job._id} job={job} />
                        ))}
                    </div>
                ) : (

                    <div className='space-y-3'>
                        {jobs.map((job) => (
                            <ListJobsCard key={job.id || job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
