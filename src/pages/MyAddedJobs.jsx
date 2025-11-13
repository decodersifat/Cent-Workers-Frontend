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
                        <div className='bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-center'>
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && jobs.length === 0 && (
                        <div className='text-center py-12'>
                            <Briefcase className='w-16 h-16 text-muted-foreground mx-auto mb-4' />
                            <p className='text-muted-foreground text-lg'>You haven't posted any jobs yet.</p>
                            <button 
                                onClick={() => navigate('/add-job')}
                                className='mt-4 bg-[#14A800] hover:bg-[#0f8000] text-white px-6 py-2 rounded-lg transition-colors'
                            >
                                Post Your First Job
                            </button>
                        </div>
                    )}

                    {!loading && !error && jobs.length > 0 && (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {jobs.map((job) => (
                                <div key={job._id} className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg border border-border transition-all duration-200'>
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
