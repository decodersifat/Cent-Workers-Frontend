import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AddJob from './pages/AddJob.jsx'
import JobDetails from './pages/JobDetails'
import AuthProvider from './contexts/AuthProvider.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AllJobs from './pages/AllJobs'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/add-job",
    element: <AddJob />,
  },
  {
    path: "/job-details/:jobId",
    element: <JobDetails/>,
  },
  {
    path: "/all-jobs",
    element: <AllJobs/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
