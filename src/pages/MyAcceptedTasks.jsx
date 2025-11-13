import React, { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Briefcase, User, Tag, Calendar } from 'lucide-react'
import Navbar from '@/components/Navbar'
import useAuth from '@/hooks/useAuth'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

function MyAcceptedTasks() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [acceptedJobs, setAcceptedJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_BASE = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        if (user?.email) {
            fetchAcceptedJobs()
        }
    }, [user])

    const fetchAcceptedJobs = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(`${API_BASE}/api/v1/accepted-jobs/my-accepted-jobs/${user.email}`)
            
            if (response.status === 404) {
                setAcceptedJobs([])
                return
            }
            
            if (!response.ok) {
                throw new Error('Failed to load accepted jobs')
            }

            const data = await response.json()
            setAcceptedJobs(data.data || [])
        } catch (err) {
            console.error("Error fetching accepted jobs:", err)
            setError('Could not load accepted jobs. Please try again later.')
            setAcceptedJobs([])
        } finally {
            setLoading(false)
        }
    }

    const handleDone = async (jobId) => {
        try {
            const response = await fetch(`${API_BASE}/api/v1/accepted-jobs/remove-accepted-job/${jobId}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('Failed to mark as done')
            }

            setAcceptedJobs(acceptedJobs.filter(job => job._id !== jobId))
            toast.success('Task marked as done!')
        } catch (err) {
            console.error("Error marking as done:", err)
            toast.error('Failed to mark as done. Please try again.')
        }
    }

    const handleCancel = async (jobId) => {
        if (!window.confirm('Are you sure you want to cancel this task?')) return

        try {
            const response = await fetch(`${API_BASE}/api/v1/accepted-jobs/remove-accepted-job/${jobId}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('Failed to cancel task')
            }

            setAcceptedJobs(acceptedJobs.filter(job => job._id !== jobId))
            toast.success('Task cancelled successfully!')
        } catch (err) {
            console.error("Error cancelling task:", err)
            toast.error('Failed to cancel task. Please try again.')
        }
    }

    return (
        <>
            <Navbar />
            <div className='w-full min-h-screen bg-accent/5 py-12'>
                <div className='container mx-auto px-4'>
                    <div className='text-center mb-12'>
                        <h1 className='text-4xl lg:text-5xl font-display font-bold mb-4'>
                            My Accepted Tasks
                        </h1>
                        <p className='text-muted-foreground text-lg'>
                            Manage your accepted jobs
                        </p>
                        <div className='w-24 h-1 bg-linear-to-r from-[#14A800] to-[#0f8000] mx-auto rounded-full mt-4'></div>
                    </div>

                    {loading && (
                        <div className='text-center py-12'>
                            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#14A800] mx-auto'></div>
                            <p className='text-muted-foreground mt-4'>Loading your tasks...</p>
                        </div>
                    )}

                    {error && (
                        <div className='bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-center'>
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && acceptedJobs.length === 0 && (
                        <div className='text-center py-12'>
                            <Briefcase className='w-16 h-16 text-muted-foreground mx-auto mb-4' />
                            <p className='text-muted-foreground text-lg'>You haven't accepted any tasks yet.</p>
                            <button 
                                onClick={() => navigate('/all-jobs')}
                                className='mt-4 bg-[#14A800] hover:bg-[#0f8000] text-white px-6 py-2 rounded-lg transition-colors'
                            >
                                Browse Available Jobs
                            </button>
                        </div>
                    )}

                    {!loading && !error && acceptedJobs.length > 0 && (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {acceptedJobs.map((job) => (
                                <div key={job._id} className='bg-base-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg border border-border transition-all duration-200'>
                                    <div className='h-40 overflow-hidden bg-muted'>
                                        <img
                                            src={job.coverImage || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(job.jobTitle)}
                                            alt={job.jobTitle}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>

                                    <div className='p-4 space-y-3'>
                                        <h3 className='font-display font-bold text-lg text-foreground line-clamp-2'>
                                            {job.jobTitle}
                                        </h3>

                                        <div className='space-y-2 text-sm text-muted-foreground'>
                                            <div className='flex items-center gap-2'>
                                                <User className='w-4 h-4' />
                                                <span>Posted by: {job.postedBy}</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <Tag className='w-4 h-4' />
                                                <span className='text-[#14A800] font-medium'>{job.category}</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <Calendar className='w-4 h-4' />
                                                <span>Accepted: {job.acceptedAt ? new Date(job.acceptedAt).toLocaleDateString() : 'Recently'}</span>
                                            </div>
                                        </div>

                                        <div className='pt-3 border-t border-border flex gap-2'>
                                            <button
                                                onClick={() => handleDone(job._id)}
                                                className='flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition-all duration-200'
                                                title='Mark as Done'
                                            >
                                                <CheckCircle className='w-4 h-4' />
                                                Done
                                            </button>
                                            <button
                                                onClick={() => handleCancel(job._id)}
                                                className='flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition-all duration-200'
                                                title='Cancel Task'
                                            >
                                                <XCircle className='w-4 h-4' />
                                                Cancel
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

export default MyAcceptedTasks
