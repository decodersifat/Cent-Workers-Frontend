import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AddJob from './pages/AddJob.jsx'
import JobDetails from './pages/JobDetails'
import MyAddedJobs from './pages/MyAddedJobs'
import MyAcceptedTasks from './pages/MyAcceptedTasks'
import UpdateJob from './pages/UpdateJob'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import PublicProfile from './pages/PublicProfile'
import AuthProvider from './contexts/AuthProvider.jsx'
import ThemeProvider from './contexts/ThemeProvider.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AllJobs from './pages/AllJobs'
import { Toaster } from 'react-hot-toast'


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
    element: (
      <PrivateRoute>
        <AddJob />
      </PrivateRoute>
    ),
  },
  {
    path: "/job-details/:jobId",
    element: (
      <PrivateRoute>
        <JobDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/all-jobs",
    element: <AllJobs/>,
  },
  {
    path: "/my-added-jobs",
    element: (
      <PrivateRoute>
        <MyAddedJobs />
      </PrivateRoute>
    ),
  },
  {
    path: "/my-accepted-tasks",
    element: (
      <PrivateRoute>
        <MyAcceptedTasks />
      </PrivateRoute>
    ),
  },
  {
    path: "/update-job/:jobId",
    element: (
      <PrivateRoute>
        <UpdateJob />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile/:uid",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/user/:email",
    element: <PublicProfile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
