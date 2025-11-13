import React, { useEffect, useState } from 'react'
import { Clock, CheckCircle, User } from 'lucide-react';
import { useParams, useNavigate } from 'react-router';
import Navbar from '@/components/Navbar'
import useAuth from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import dummy from '../assets/dummy.jpg'

function JobDetails() {
    const { user } = useAuth()
    const { jobId } = useParams();
    const navigate = useNavigate();
    const API = `${import.meta.env.VITE_BASE_URL}/api/v1/jobs/job-details/${jobId}`
    const API_BASE = import.meta.env.VITE_BASE_URL
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAccepted, setIsAccepted] = useState(false);
    const [accepting, setAccepting] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true)
                const response = await fetch(API)
                
                if (!response.ok) {
                    throw new Error('Failed to load job details')
                }
                
                const result = await response.json()
                console.log("Job details fetched:", result)
                
                setJob(result.data)
                setError(null)
            } catch (err) {
                console.error("Error fetching job:", err)
                setError('Could not load job details. Please try again.')
                setJob(null)
            } finally {
                setLoading(false)
            }
        }
        
        if (jobId) fetchJob()
    }, [jobId, API])

    useEffect(() => {
        if (user?.email && jobId) {
            checkIfAccepted()
        }
    }, [user, jobId])

    const checkIfAccepted = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/v1/accepted-jobs/check-accepted/${jobId}/${user.email}`)
            if (response.ok) {
                const data = await response.json()
                setIsAccepted(data.isAccepted)
            }
        } catch (err) {
            console.error("Error checking acceptance:", err)
        }
    }

    const handleAcceptJob = async () => {
        if (!user) {
            toast.error('Please login to accept jobs')
            return
        }

        if (job.userEmail === user.email) {
            toast.error('You cannot accept your own job posting')
            return
        }

        setAccepting(true)

        try {
            const acceptData = {
                jobId: job._id,
                jobTitle: job.title,
                postedBy: job.postedBy,
                postedByEmail: job.userEmail,
                category: job.category,
                summary: job.summary,
                coverImage: job.coverImage,
                acceptedBy: user.displayName || user.email,
                acceptedByEmail: user.email
            }

            const response = await fetch(`${API_BASE}/api/v1/accepted-jobs/accept-job`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(acceptData)
            })

            if (!response.ok) {
                throw new Error('Failed to accept job')
            }

            setIsAccepted(true)
            toast.success('Job accepted successfully!')
        } catch (err) {
            console.error("Error accepting job:", err)
            toast.error('Failed to accept job. Please try again.')
        } finally {
            setAccepting(false)
        }
    }

    return (
        <>
            <Navbar />
            <section className='w-full bg-accent/20 min-h-screen'>
                <div className='container mx-auto px-4 py-8 max-w-4xl'>

                    {loading && (
                        <div className='text-center py-12'>
                            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#14A800] mx-auto'></div>
                            <p className='text-muted-foreground mt-4'>Loading job details...</p>
                        </div>
                    )}

                    {error && (
                        <div className='bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-center'>
                            <p>{error}</p>
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
                                Posted by: 
                                <button 
                                    onClick={() => navigate(`/user/${job.userEmail}`)}
                                    className='text-[#14A800] font-semibold ml-2 hover:underline hover:text-[#0f8000] transition-colors inline-flex items-center gap-1'
                                >
                                    <User size={18} />
                                    {job.postedBy}
                                </button>
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
                                    {user && job.userEmail !== user.email && !isAccepted && (
                                        <button 
                                            onClick={handleAcceptJob}
                                            disabled={accepting}
                                            className='w-full md:w-auto bg-[#14A800] hover:bg-[#0f8000] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                                        >
                                            {accepting ? 'Accepting...' : 'Accept Job'}
                                        </button>
                                    )}
                                    {user && job.userEmail !== user.email && isAccepted && (
                                        <div className='flex items-center gap-2 text-green-600 font-medium'>
                                            <CheckCircle className='w-5 h-5' />
                                            <span>You have already accepted this job</span>
                                        </div>
                                    )}
                                    {user && job.userEmail === user.email && (
                                        <div className='text-muted-foreground italic'>
                                            This is your own job posting
                                        </div>
                                    )}
                                    {!user && (
                                        <button className='w-full md:w-auto bg-[#14A800] hover:bg-[#0f8000] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg'>
                                            Login to Accept Job
                                        </button>
                                    )}
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
