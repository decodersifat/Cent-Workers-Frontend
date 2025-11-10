import React from 'react'
import Navbar from './components/Navbar'
import RecentJob from './components/RecentJob';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className='text-4xl lg:text-5xl font-bold text-[#14A800] mb-4 font-display'>
          Welcome to Cent Workers
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Your professional freelance marketplace built with modern technology and beautiful design.
          Connect with talented professionals and grow your business today.
        </p>
      </div>
      <RecentJob/>
    </div>
  )
}

export default App;
