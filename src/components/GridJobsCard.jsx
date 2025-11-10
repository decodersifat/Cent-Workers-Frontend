import React from 'react'
import { Link } from 'react-router'
import {  Clock } from 'lucide-react'
function GridJobsCard({ job: job }) {
    return (
        <div>

            <Link to={`/job-details/${job._id}`}>
            <div
                key={job.id}
                className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg border border-border transition-all duration-200 hover:-translate-y-1 cursor-pointer'
            >

                <div className='h-40 overflow-hidden bg-muted'>
                    <img
                        src={job.coverImage || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(job.title)}
                        alt={job.title}
                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                    />
                </div>


                <div className='p-4 space-y-3'>
                    <div className='space-y-1'>
                        <h3 className='font-display font-bold text-lg text-foreground line-clamp-2'>
                            {job.title}
                        </h3>
                        <p className='text-sm text-muted-foreground'>{job.postedBy}</p>
                    </div>


                    <span className='inline-block bg-[#14A800]/10 text-[#14A800] text-xs px-3 py-1 rounded-full font-medium'>
                        {job.category}
                    </span>

                    <div className='flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t border-border'>
                        <Clock className='w-4 h-4' />
                        <span>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}</span>
                    </div>


                    <button className='w-full mt-4 bg-[#14A800] hover:bg-[#0f8000] text-white py-2 rounded-md font-medium transition-all duration-200 hover:shadow-md'>
                        Apply Now
                    </button>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default GridJobsCard
