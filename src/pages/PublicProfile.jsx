import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { MapPin, Briefcase, Calendar, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const PublicProfile = () => {
    const { email } = useParams(); // User's email from URL
    const { user } = useAuth(); // Currently logged-in user
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [postedJobs, setPostedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const API_BASE = import.meta.env.VITE_BASE_URL;

    // Helper function to check if a value is empty
    const isEmpty = (value) => {
        return !value || value.trim() === '';
    };

    useEffect(() => {
        const loadData = async () => {
            const profileData = await fetchUserProfile();
            await fetchUserJobs(profileData);
        };
        loadData();
    }, [email]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/v1/users/profile/${email}`);
            const result = await response.json();
            
            if (result.success) {
                setProfile(result.data);
                return result.data;
            }
            return null;
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load profile");
            return null;
        }
    };

    const fetchUserJobs = async (profileData) => {
        try {
            const response = await fetch(`${API_BASE}/api/v1/jobs/myAddedJobs/${email}`);
            const result = await response.json();
            
            if (result.success) {
                const jobs = result.data || [];
                setPostedJobs(jobs);
                
                // If profile doesn't have name/photo (empty strings or null/undefined), get from first job
                if (jobs.length > 0 && profileData) {
                    const firstJob = jobs[0];
                    const updatedProfile = {
                        ...profileData,
                        displayName: isEmpty(profileData.displayName) ? (firstJob.postedBy || 'Anonymous User') : profileData.displayName,
                        photoURL: isEmpty(profileData.photoURL) ? null : profileData.photoURL
                    };
                    setProfile(updatedProfile);
                }
            } else {
                setPostedJobs([]);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setPostedJobs([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-base-200 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-ghost btn-sm mb-6"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    {/* Profile Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card bg-base-100 shadow-xl mb-8"
                    >
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="avatar">
                                    <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img 
                                            src={!isEmpty(profile?.photoURL) ? profile.photoURL : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.displayName || email)}&background=14A800&color=fff`} 
                                            alt={profile?.displayName || "User"} 
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold mb-2">
                                        {!isEmpty(profile?.displayName) ? profile.displayName : "Anonymous User"}
                                    </h2>
                                    <p className="text-base-content/70 mb-2">{email}</p>
                                    
                                    {profile?.bio && (
                                        <p className="text-base-content/70 mb-4">{profile.bio}</p>
                                    )}

                                    <div className="flex flex-wrap gap-4 mb-4">
                                        {profile?.location && (
                                            <div className="flex items-center gap-2 text-base-content/70">
                                                <MapPin size={18} />
                                                <span>{profile.location}</span>
                                            </div>
                                        )}
                                        
                                        {profile?.createdAt && (
                                            <div className="flex items-center gap-2 text-base-content/70">
                                                <Calendar size={18} />
                                                <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 text-base-content/70">
                                            <Briefcase size={18} />
                                            <span>{postedJobs.length} Jobs Posted</span>
                                        </div>
                                    </div>

                                    {profile?.skills && profile.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {profile.skills.map((skill, index) => (
                                                <span key={index} className="badge badge-primary badge-outline">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Jobs Posted Section */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Briefcase size={24} />
                            Jobs Posted ({postedJobs.length})
                        </h3>
                    </div>

                    {/* Jobs Grid */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {postedJobs.length === 0 && (
                            <div className="col-span-full text-center py-12">
                                <Briefcase size={64} className="mx-auto mb-4 text-base-content/30" />
                                <p className="text-xl text-base-content/70">No jobs posted yet</p>
                            </div>
                        )}

                        {postedJobs.map((job) => (
                            <motion.div
                                key={job._id}
                                whileHover={{ y: -5 }}
                                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                                onClick={() => navigate(`/job-details/${job._id}`)}
                            >
                                <div className="card-body">
                                    <h3 className="card-title">{job.title}</h3>
                                    <p className="text-base-content/70 line-clamp-2">{job.summary}</p>
                                    
                                    <div className="divider my-2"></div>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="badge badge-secondary">{job.category}</span>
                                        {job.salary && (
                                            <span className="font-bold text-primary">${job.salary}</span>
                                        )}
                                    </div>
                                    
                                    {job.deadline && (
                                        <div className="text-sm text-base-content/60 mt-2">
                                            Deadline: {new Date(job.deadline).toLocaleDateString()}
                                        </div>
                                    )}
                                    
                                    <div className="text-xs text-base-content/50 mt-2">
                                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default PublicProfile;
