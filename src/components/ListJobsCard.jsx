import React from 'react'
import {  Clock, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
function ListJobsCard( {job:job} ) {
    const navigate = useNavigate()
    
    const handlePosterClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        navigate(`/user/${job.userEmail}`)
    }
    
    return (
        <div>

             <Link to={`/job-details/${job._id}`}>
            

            <div
                key={job._id}
                className='bg-base-100 rounded-lg p-4 shadow-sm hover:shadow-md border border-border transition-all duration-200 flex gap-4 cursor-pointer hover:bg-accent/5'
            >

                <div className='hidden sm:block w-32 h-24 shrink-0 rounded-lg overflow-hidden bg-muted'>
                    <img
                        src={job.coverImage || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(job.title)}
                        alt={job.title}
                        className='w-full h-full object-cover'
                    />
                </div>


                <div className='flex-1 min-w-0'>
                    <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
                        <div className='space-y-1'>
                            <h3 className='font-display font-bold text-lg text-foreground'>
                                {job.title}
                            </h3>
                            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground'>
                                <button 
                                    onClick={handlePosterClick}
                                    className='flex items-center gap-1 hover:text-[#14A800] transition-colors'
                                >
                                    <User className='w-4 h-4' />
                                    {job.postedBy}
                                </button>
                                <span className='flex items-center gap-1'>
                                    <Clock className='w-4 h-4' />
                                    {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
                                </span>
                            </div>
                        </div>


                        <div className='flex flex-col sm:items-end gap-2'>
                            <span className='inline-block bg-[#14A800]/10 text-[#14A800] text-xs px-3 py-1 rounded-full font-medium w-fit'>
                                {job.category}
                            </span>
                            <button className='bg-[#14A800] hover:bg-[#0f8000] text-white px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 hover:shadow-md'>
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default ListJobsCard
