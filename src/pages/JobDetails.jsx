import React, { useEffect, useState } from 'react'
import { Clock } from 'lucide-react';
import { useParams } from 'react-router';
import Navbar from '@/components/Navbar'
import dummy from '../assets/dummy.jpg'

function JobDetails() {

    const { jobId } = useParams();
    const API = `${import.meta.env.VITE_BASE_URL}/api/v1/jobs/job-details/${jobId}`
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const response = await fetch(API);
                if (!response.ok) throw new Error(`API error: ${response.status}`);
                const data = await response.json();
                setJob(data.Job);
                setError(null);
            } catch (err) {
                console.error("Error fetching job:", err);
                setError(err.message);
                setJob(null);
            } finally {
                setLoading(false);
            }
        };
        
        if (jobId) fetchJob();
    }, [jobId, API])

    return (
        <>
            <Navbar />
            <section className='w-full bg-accent/20 min-h-screen'>
                <div className='container mx-auto px-4 py-8 max-w-4xl'>

                    {loading && (
                        <div className='text-center py-12'>
                            <p className='text-lg text-muted-foreground'>Loading job details...</p>
                        </div>
                    )}

                    {error && (
                        <div className='bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6'>
                            Error: {error}
                        </div>
                    )}

                    {job && (
                        <>
                            <div className='text-3xl md:text-4xl font-bold font-display mb-6 text-[#14A800]'>
                                {job.title}
                            </div>

                            <div className='w-full mb-8 rounded-xl overflow-hidden shadow-lg'>
                                <img
                                    src={job.coverImage || dummy}
                                    className='w-full h-80 object-cover rounded-xl'
                                    alt={job.title}
                                />
                            </div>


                            <div className='flex items-center gap-2 mb-4 text-muted-foreground'>
                                <Clock className='w-5 h-5' />
                                <span>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}</span>
                            </div>


                            <div className='text-lg font-medium text-foreground mb-6'>
                                Posted by: <span className='text-[#14A800] font-semibold'>{job.postedBy}</span>
                            </div>


                            <div className='text-2xl font-bold font-display mb-4 text-foreground'>
                                Job Description
                            </div>


                            <div className='bg-white rounded-lg p-6 shadow-sm border border-border space-y-4'>
                                <p className='text-base text-foreground leading-relaxed'>
                                    {job.summary}
                                </p>


                                {job.requirements && (
                                    <div className='mt-6 pt-6 border-t border-border'>
                                        <h3 className='text-lg font-semibold font-display mb-3'>Requirements:</h3>
                                        <ul className='space-y-2 text-sm text-foreground'>
                                            {(Array.isArray(job.requirements) ? job.requirements : job.requirements.split('\n')).map((req, idx) => (
                                                <li key={idx} className='flex items-start gap-2'>
                                                    <span className='text-[#14A800] font-bold mt-1'>•</span>
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className='mt-8 pt-6 border-t border-border'>
                                    <button className='w-full md:w-auto bg-[#14A800] hover:bg-[#0f8000] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg'>
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </section>
        </>
    )
}

export default JobDetails;
