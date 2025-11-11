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
            setError(null)

            const response = await fetch(`${API_BASE}/api/v1/category/all-categories`)

            if (!response.ok) {
                throw new Error('Failed to load categories')
            }

            const data = await response.json()
            const allCategories = data.data || []

            setCategories(allCategories.slice(0, 4))
        } catch (err) {
            console.error("Error fetching categories:", err)
            setError('Could not load categories. Please try again later.')
            setCategories([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='w-full py-16 bg-white'>
            <div className='container mx-auto px-4'>

                <div className='text-center mb-12'>
                    <h2 className='text-4xl lg:text-5xl font-display font-bold mb-4'>
                        Browse by Category
                    </h2>
                    <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
                        Explore jobs across diverse fields and find the perfect opportunity for your skills
                    </p>
                    <div className='w-24 h-1 bg-linear-to-r from-[#14A800] to-[#0f8000] mx-auto rounded-full mt-4'></div>
                </div>

    
                {loading && (
                    <div className='text-center py-12'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#14A800] mx-auto'></div>
                        <p className='text-muted-foreground mt-4'>Loading categories...</p>
                    </div>
                )}


                {error && (
                    <div className='bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-center'>
                        <p>{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && categories.length === 0 && (
                    <div className='text-center py-12'>
                        <p className='text-muted-foreground'>No categories available.</p>
                    </div>
                )}


                {!loading && !error && categories.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {categories.map((category, index) => (
                            <Link
                                key={category._id || index}
                                to={`/all-jobs?category=${encodeURIComponent(category.title)}`}
                                className='group'
                            >
                                <div className='relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-56'>

                                    <img
                                        src={category.image || 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(category.title)}
                                        alt={category.title}
                                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                    />


                                    <div className='absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300'></div>


                                    <div className='absolute inset-0 flex flex-col justify-between p-6'>
 
                                        <div className='flex justify-between items-start'>
                                            <span className='inline-block bg-[#14A800] text-white px-3 py-1 rounded-full text-xs font-semibold'>
                                                Featured
                                            </span>
                                        </div>

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
