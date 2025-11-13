import React from 'react'
import { Navigate, useLocation } from 'react-router'
import useAuth from '@/hooks/useAuth'

function PrivateRoute({ children }) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#14A800] mx-auto'></div>
                    <p className='text-muted-foreground mt-4'>Loading...</p>
                </div>
            </div>
        )
    }

    if (user) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace />
}

export default PrivateRoute
