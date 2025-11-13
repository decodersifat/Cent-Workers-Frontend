import React, { useEffect, useState } from 'react'
import { Pencil, Trash2, Briefcase, User, Tag, Calendar } from 'lucide-react'
import Navbar from '@/components/Navbar'
import useAuth from '@/hooks/useAuth'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

function MyAddedJobs() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_BASE = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        if (user?.email) {
            fetchMyJobs()
        }
    }, [user])

    const fetchMyJobs = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(`${API_BASE}/api/v1/jobs/myAddedJobs/${user.email}`)
            
            // If 404, it means no jobs found (not an error)
            if (response.status === 404) {
                setJobs([])
                setLoading(false)
                return
            }
            
            if (!response.ok) {
                throw new Error('Failed to load jobs')
            }

            const data = await response.json()
            setJobs(data.data || [])
        } catch (err) {
            console.error("Error fetching jobs:", err)
            setError('Could not load jobs. Please try again later.')
            setJobs([])
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return

        try {
            const response = await fetch(`${API_BASE}/api/v1/jobs/delete-job/${jobId}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('Failed to delete job')
            }

            setJobs(jobs.filter(job => job._id !== jobId))
            toast.success('Job deleted successfully!')
        } catch (err) {
            console.error("Error deleting job:", err)
            toast.error('Failed to delete job. Please try again.')
        }
    }

    const handleUpdate = (jobId) => {
        navigate(`/update-job/${jobId}`)
    }

    return (
        <>
            <Navbar />
            <div className='w-full min-h-screen bg-accent/5 py-12'>
                <div className='container mx-auto px-4'>
                    <div className='text-center mb-12'>
                        <h1 className='text-4xl lg:text-5xl font-display font-bold mb-4'>
                            My Added Jobs
                        </h1>
                        <p className='text-muted-foreground text-lg'>
                            Manage all your posted jobs
                        </p>
                        <div className='w-24 h-1 bg-linear-to-r from-[#14A800] to-[#0f8000] mx-auto rounded-full mt-4'></div>
                    </div>

                    {loading && (
                        <div className='text-center py-12'>
                            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#14A800] mx-auto'></div>
                            <p className='text-muted-foreground mt-4'>Loading your jobs...</p>
                        </div>
                    )}

                    {error && (
                        <div className='max-w-md mx-auto text-center py-16'>
                            <div className='bg-base-100 rounded-2xl shadow-xl p-8 border-2 border-red-200'>
                                <div className='bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6'>
                                    <svg className='w-12 h-12 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                                    </svg>
                                </div>
                                
                                <h2 className='text-3xl font-bold text-foreground mb-3'>
                                    Oops! Something went wrong
                                </h2>
                                
                                <p className='text-red-600 text-lg mb-6'>
                                    {error}
                                </p>
                                
                                <button 
                                    onClick={fetchMyJobs}
                                    className='bg-[#14A800] hover:bg-[#0f8000] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg'
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    )}

                    {!loading && !error && jobs.length === 0 && (
                        <div className='max-w-md mx-auto text-center py-16'>
                            <div className='bg-base-100 rounded-2xl shadow-xl p-8 border-2 border-dashed border-muted'>
                                <div className='bg-accent/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6'>
                                    <Briefcase className='w-12 h-12 text-[#14A800]' />
                                </div>
                                
                                <h2 className='text-3xl font-bold text-foreground mb-3'>
                                    No Jobs Found
                                </h2>
                                
                                <p className='text-muted-foreground text-lg mb-2'>
                                    You haven't posted any jobs yet.
                                </p>
                                
                                <p className='text-muted-foreground text-sm mb-6'>
                                    Start by creating your first job posting and reach talented professionals!
                                </p>
                                
                                <button 
                                    onClick={() => navigate('/add-job')}
                                    className='bg-[#14A800] hover:bg-[#0f8000] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                >
                                    <div className='flex items-center gap-2 justify-center'>
                                        <Briefcase className='w-5 h-5' />
                                        Post Your First Job
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {!loading && !error && jobs.length > 0 && (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {jobs.map((job) => (
                                <div key={job._id} className='bg-base-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg border border-border transition-all duration-200'>
                                    <div className='h-40 overflow-hidden bg-muted'>
                                        <img
                                            src={job.coverImage || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(job.title)}
                                            alt={job.title}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>

                                    <div className='p-4 space-y-3'>
                                        <h3 className='font-display font-bold text-lg text-foreground line-clamp-2'>
                                            {job.title}
                                        </h3>

                                        <div className='space-y-2 text-sm text-muted-foreground'>
                                            <div className='flex items-center gap-2'>
                                                <User className='w-4 h-4' />
                                                <span>{job.postedBy}</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <Tag className='w-4 h-4' />
                                                <span className='text-[#14A800] font-medium'>{job.category}</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <Calendar className='w-4 h-4' />
                                                <span>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}</span>
                                            </div>
                                        </div>

                                        <div className='pt-3 border-t border-border flex gap-2'>
                                            <button
                                                onClick={() => handleUpdate(job._id)}
                                                className='flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium transition-all duration-200'
                                            >
                                                <Pencil className='w-4 h-4' />
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className='flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition-all duration-200'
                                            >
                                                <Trash2 className='w-4 h-4' />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default MyAddedJobs
