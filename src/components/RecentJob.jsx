

'use client'


import React, { useEffect, useState } from 'react'
import { List, LayoutGrid, Briefcase, Clock, User } from 'lucide-react'
import GridJobsCard from './GridJobsCard'
import ListJobsCard from './ListJobsCard'


export default function RecentJob() {
    const [viewMode, setViewMode] = useState('grid')
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_BASE = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`${API_BASE}/api/v1/jobs/recent-jobs`)

                if (!response.ok) {
                    throw new Error('Failed to load jobs')
                }

                const data = await response.json()
                
                const jobsArray = Array.isArray(data) 
                    ? data 
                    : data.jobs || data.data || (data.Job ? [data.Job] : [])

                setJobs(jobsArray)
            } catch (err) {
                console.error("Error fetching jobs:", err)
                setError('Could not load jobs. Please try again later.')
                setJobs([])
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])



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

                    {!loading && !error && (
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
                    )}
                </div>

                {loading && (
                    <div className='text-center py-12'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#14A800] mx-auto'></div>
                        <p className='text-muted-foreground mt-4'>Loading jobs...</p>
                    </div>
                )}

                {error && (
                    <div className='bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-center'>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && jobs.length === 0 && (
                    <div className='text-center py-12'>
                        <p className='text-muted-foreground'>No jobs available.</p>
                    </div>
                )}

                {!loading && !error && jobs.length > 0 && (
                    <>
                        {viewMode === 'grid' ? (

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                {jobs.map((job) => (
                                    <GridJobsCard key={job._id} job={job} />
                                ))}
                            </div>
                        ) : (

                            <div className='space-y-3'>
                                {jobs.map((job) => (
                                    <ListJobsCard key={job._id} job={job} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
