import React from 'react'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'
import Navbar from '@/components/Navbar'

function NotFound() {
    const navigate = useNavigate()

    return (
        <>
            <Navbar />
            <div className='min-h-screen bg-accent/5 flex items-center justify-center px-4'>
                <div className='text-center max-w-2xl'>
                    <FileQuestion className='w-32 h-32 text-[#14A800] mx-auto mb-6 animate-bounce' />
                    
                    <h1 className='text-6xl lg:text-8xl font-display font-bold text-foreground mb-4'>
                        404
                    </h1>
                    
                    <h2 className='text-2xl lg:text-3xl font-display font-semibold text-foreground mb-4'>
                        Page Not Found
                    </h2>
                    
                    <p className='text-lg text-muted-foreground mb-8'>
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                    
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <button
                            onClick={() => navigate(-1)}
                            className='flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md'
                        >
                            <ArrowLeft className='w-5 h-5' />
                            Go Back
                        </button>
                        
                        <button
                            onClick={() => navigate('/')}
                            className='flex items-center justify-center gap-2 px-6 py-3 bg-[#14A800] hover:bg-[#0f8000] text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md'
                        >
                            <Home className='w-5 h-5' />
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound
