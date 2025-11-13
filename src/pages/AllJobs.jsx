import React, { useEffect, useState } from 'react'
import { List, LayoutGrid, Search, Filter, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react'
import Navbar from '@/components/Navbar'
import GridJobsCard from '@/components/GridJobsCard'
import ListJobsCard from '@/components/ListJobsCard'

function AllJobs() {
    const [viewMode, setViewMode] = useState('grid')
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [categories, setCategories] = useState([])
    const [sortOrder, setSortOrder] = useState('desc')

    const API = `${import.meta.env.VITE_BASE_URL}/api/v1/jobs/all-jobs`
    const API_BASE = import.meta.env.VITE_BASE_URL
    const itemsPerPage = viewMode === 'grid' ? 12 : 10

    // Fetch all jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true)
                const response = await fetch(API)
                if (!response.ok) throw new Error(`API error: ${response.status}`)
                const data = await response.json()
                console.log("All jobs fetched:", data)

                // Handle different response formats
                let jobsArray = Array.isArray(data) ? data : data.jobs || data.data || []
                setJobs(jobsArray)
                setError(null)
            } catch (err) {
                console.error("Error fetching jobs:", err)
                setError(err.message)
                setJobs([])
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])

    // Fetch categories from category collection
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/v1/category/all-categories`)
                if (!response.ok) throw new Error(`API error: ${response.status}`)
                const data = await response.json()
                
                if (data.success && data.data) {
                    // Extract category titles from category objects
                    const categoryTitles = data.data.map(cat => cat.title)
                    setCategories(categoryTitles)
                }
            } catch (err) {
                console.error("Error fetching categories:", err)
                // Fallback to empty array if category fetch fails
                setCategories([])
            }
        }

        fetchCategories()
    }, [])

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             job.postedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             job.summary.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })

    const totalPages = Math.ceil(sortedJobs.length / itemsPerPage)
    const startIdx = (currentPage - 1) * itemsPerPage
    const paginatedJobs = sortedJobs.slice(startIdx, startIdx + itemsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, selectedCategory, sortOrder])

    return (
        <>
            <Navbar />
            <div className='w-full min-h-screen bg-accent/5 py-12'>
                <div className='container mx-auto px-4'>

                    {/* Header */}
                    <div className='text-center mb-12'>
                        <h1 className='text-4xl lg:text-5xl font-display font-bold mb-4'>
                            All Available Jobs
                        </h1>
                        <p className='text-muted-foreground text-lg'>
                            Browse {filteredJobs.length} job opportunity{filteredJobs.length !== 1 ? 's' : ''}
                        </p>
                        <div className='w-24 h-1 bg-linear-to-r from-[#14A800] to-[#0f8000] mx-auto rounded-full mt-4'></div>
                    </div>

                    {/* Search and Filters */}
                    <div className='bg-base-100 rounded-lg shadow-sm border border-border p-6 mb-8'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                            {/* Search Bar */}
                            <div className='relative md:col-span-2'>
                                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                                <input
                                    type='text'
                                    placeholder='Search by job title, company, or skills...'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14A800]'
                                />
                            </div>

                            {/* Category Filter */}
                            <div className='relative'>
                                <Filter className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none' />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14A800] appearance-none bg-base-100 cursor-pointer'
                                >
                                    <option value='all'>All Categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* View Mode and Results */}
                    <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
                        <div className='text-sm text-muted-foreground'>
                            Showing {paginatedJobs.length > 0 ? startIdx + 1 : 0} - {Math.min(startIdx + itemsPerPage, sortedJobs.length)} of {sortedJobs.length} jobs
                        </div>

                        <div className='flex gap-2'>
                            <button
                                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                                className='flex items-center gap-2 bg-base-100 border border-border rounded-lg px-4 py-2 shadow-sm hover:bg-accent/50 transition-colors'
                                title={`Sort by ${sortOrder === 'desc' ? 'Oldest First' : 'Newest First'}`}
                            >
                                <ArrowUpDown className='w-4 h-4' />
                                <span className='text-sm font-medium'>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
                            </button>
                            
                            <div className='flex gap-2 bg-base-100 border border-border rounded-lg p-1 shadow-sm'>
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
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className='text-center py-16'>
                            <div className='inline-block'>
                                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#14A800]'></div>
                            </div>
                            <p className='text-muted-foreground mt-4'>Loading jobs...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className='bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6'>
                            Error: {error}
                        </div>
                    )}

                    {/* No Results */}
                    {!loading && filteredJobs.length === 0 && (
                        <div className='text-center py-16'>
                            <p className='text-lg text-muted-foreground'>No jobs found matching your criteria.</p>
                            {searchTerm && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('')
                                        setSelectedCategory('all')
                                    }}
                                    className='mt-4 text-[#14A800] hover:text-[#0f8000] font-medium'
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    )}

                    {/* Jobs Grid View */}
                    {!loading && paginatedJobs.length > 0 && viewMode === 'grid' && (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                            {paginatedJobs.map((job) => (
                                <GridJobsCard key={job._id} job={job} />
                            ))}
                        </div>
                    )}

                    {/* Jobs List View */}
                    {!loading && paginatedJobs.length > 0 && viewMode === 'list' && (
                        <div className='space-y-3 mb-8'>
                            {paginatedJobs.map((job) => (
                                <ListJobsCard key={job._id} job={job} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && totalPages > 1 && (
                        <div className='flex items-center justify-center gap-2'>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className='p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                            >
                                <ChevronLeft className='w-5 h-5' />
                            </button>

                            <div className='flex gap-1'>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1 rounded-lg transition-colors ${currentPage === page
                                            ? 'bg-[#14A800] text-white'
                                            : 'border border-border hover:bg-accent'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className='p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                            >
                                <ChevronRight className='w-5 h-5' />
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default AllJobs
