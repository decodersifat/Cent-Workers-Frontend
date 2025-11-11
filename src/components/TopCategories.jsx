import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Loader } from 'lucide-react'

function TopCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const API_BASE = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        fetchTopCategories()
    }, [])

    const fetchTopCategories = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_BASE}/api/v1/category/all-categories`)
            
            if (!response.ok) throw new Error('Failed to fetch categories')
            
            const data = await response.json()
            // Backend returns { success, message, count, data: [...] }
            const allCategories = data.data || []
            
            // Take only the first 4 categories
            setCategories(allCategories.slice(0, 4))
            setError(null)
        } catch (err) {
            console.error("Error fetching top categories:", err)
            setError(err.message)
            setCategories([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='w-full py-16 bg-white'>
            <div className='container mx-auto px-4'>
                {/* Section Header */}
                <div className='text-center mb-12'>
                    <h2 className='text-4xl lg:text-5xl font-display font-bold mb-4'>
                        Browse by Category
                    </h2>
                    <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
                        Explore jobs across diverse fields and find the perfect opportunity for your skills
                    </p>
                    <div className='w-24 h-1 bg-linear-to-r from-[#14A800] to-[#0f8000] mx-auto rounded-full mt-4'></div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className='flex justify-center items-center py-12'>
                        <div className='flex flex-col items-center gap-3'>
                            <Loader className='w-8 h-8 text-[#14A800] animate-spin' />
                            <p className='text-muted-foreground'>Loading categories...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className='bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-center'>
                        Failed to load categories. Please try again later.
                    </div>
                )}

                {/* Categories Grid */}
                {!loading && !error && categories.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {categories.map((category, index) => (
                            <Link
                                key={category._id || index}
                                to={`/all-jobs?category=${encodeURIComponent(category.title)}`}
                                className='group'
                            >
                                <div className='relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-56'>
                                    {/* Background Image */}
                                    <img
                                        src={category.image || 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(category.title)}
                                        alt={category.title}
                                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                    />

                                    {/* Overlay */}
                                    <div className='absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300'></div>

                                    {/* Content */}
                                    <div className='absolute inset-0 flex flex-col justify-between p-6'>
                                        {/* Top Category Badge */}
                                        <div className='flex justify-between items-start'>
                                            <span className='inline-block bg-[#14A800] text-white px-3 py-1 rounded-full text-xs font-semibold'>
                                                Featured
                                            </span>
                                        </div>

                                        {/* Bottom Title and Arrow */}
                                        <div className='flex items-end justify-between'>
                                            <h3 className='text-white font-display font-bold text-xl line-clamp-2'>
                                                {category.title}
                                            </h3>
                                            <div className='bg-[#14A800] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300'>
                                                <ArrowRight className='w-5 h-5' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && categories.length === 0 && (
                    <div className='text-center py-12'>
                        <p className='text-lg text-muted-foreground'>No categories available at the moment.</p>
                    </div>
                )}

                {/* View All Button */}
                {!loading && !error && categories.length > 0 && (
                    <div className='flex justify-center mt-12'>
                        <Link
                            to='/all-jobs'
                            className='inline-flex items-center gap-2 bg-[#14A800] hover:bg-[#0f8000] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg'
                        >
                            View All Categories
                            <ArrowRight className='w-5 h-5' />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}

export default TopCategories
