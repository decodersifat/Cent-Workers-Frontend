import React from 'react'
import {  Clock, User } from 'lucide-react'
function ListJobsCard( {job:job} ) {
    return (
        <div>
            <div
                key={job.id}
                className='bg-white rounded-lg p-4 shadow-sm hover:shadow-md border border-border transition-all duration-200 flex gap-4 cursor-pointer hover:bg-accent/5'
            >

                <div className='hidden sm:block w-32 h-24 shrink-0 rounded-lg overflow-hidden bg-muted'>
                    <img
                        src={job.image}
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
                                <span className='flex items-center gap-1'>
                                    <User className='w-4 h-4' />
                                    {job.company}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <Clock className='w-4 h-4' />
                                    {job.postedDate}
                                </span>
                            </div>
                        </div>


                        <div className='flex flex-col sm:items-end gap-2'>
                            <span className='inline-block bg-[#14A800]/10 text-[#14A800] text-xs px-3 py-1 rounded-full font-medium w-fit'>
                                {job.category}
                            </span>
                            <button className='bg-[#14A800] hover:bg-[#0f8000] text-white px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 hover:shadow-md'>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListJobsCard
