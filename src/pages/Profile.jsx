import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { MapPin, Briefcase, Calendar, Edit, Save, X } from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
    const { uid } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [postedJobs, setPostedJobs] = useState([]);
    const [acceptedJobs, setAcceptedJobs] = useState([]);
    const [activeTab, setActiveTab] = useState("posted");
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        displayName: "",
        photoURL: "",
        bio: "",
        skills: [],
        location: ""
    });

    const isOwnProfile = user?.uid === uid;

    useEffect(() => {
        fetchUserProfile();
        fetchUserJobs();
        fetchAcceptedJobs();
    }, [uid]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`https://cent-workers-backend.vercel.app/api/v1/users/profile/${uid}`);
            const result = await response.json();
            
            if (result.success) {
                setProfile(result.data);
                setFormData({
                    displayName: result.data.displayName || "",
                    photoURL: result.data.photoURL || "",
                    bio: result.data.bio || "",
                    skills: result.data.skills || [],
                    location: result.data.location || ""
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load profile");
        }
    };

    const fetchUserJobs = async () => {
        try {
            // Use the correct endpoint for fetching user's jobs
            const response = await fetch(`https://cent-workers-backend.vercel.app/api/v1/jobs/myAddedJobs/${uid}`);
            const result = await response.json();
            
            if (result.success) {
                setPostedJobs(result.data || []);
            } else {
                // If no jobs found, just set empty array (not an error)
                setPostedJobs([]);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setPostedJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchAcceptedJobs = async () => {
        try {
            // Use the correct endpoint for fetching accepted jobs
            const response = await fetch(`https://cent-workers-backend.vercel.app/api/v1/accepted-jobs/my-accepted-jobs/${uid}`);
            const result = await response.json();
            
            if (result.success) {
                setAcceptedJobs(result.data || []);
            } else {
                // If no jobs found, just set empty array (not an error)
                setAcceptedJobs([]);
            }
        } catch (error) {
            console.error("Error fetching accepted jobs:", error);
            setAcceptedJobs([]);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`https://cent-workers-backend.vercel.app/api/v1/users/profile/${uid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.success) {
                toast.success("Profile updated successfully!");
                setProfile({ ...profile, ...formData });
                setEditMode(false);
            } else {
                toast.error(result.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillsChange = (e) => {
        const skills = e.target.value.split(",").map(s => s.trim()).filter(s => s);
        setFormData(prev => ({
            ...prev,
            skills: skills
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Profile Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card bg-base-100 shadow-xl mb-8"
                >
                    <div className="card-body">
                        {editMode ? (
                            <form onSubmit={handleUpdateProfile}>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="card-title text-3xl">Edit Profile</h2>
                                    <div className="flex gap-2">
                                        <button type="submit" className="btn btn-primary btn-sm">
                                            <Save size={16} /> Save
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setEditMode(false)}
                                            className="btn btn-ghost btn-sm"
                                        >
                                            <X size={16} /> Cancel
                                        </button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Display Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="displayName"
                                            value={formData.displayName}
                                            onChange={handleChange}
                                            className="input input-bordered"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Photo URL</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="photoURL"
                                            value={formData.photoURL}
                                            onChange={handleChange}
                                            className="input input-bordered"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Location</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="input input-bordered"
                                            placeholder="City, Country"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Skills (comma-separated)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.skills.join(", ")}
                                            onChange={handleSkillsChange}
                                            className="input input-bordered"
                                            placeholder="React, Node.js, MongoDB"
                                        />
                                    </div>

                                    <div className="form-control md:col-span-2">
                                        <label className="label">
                                            <span className="label-text">Bio</span>
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            className="textarea textarea-bordered h-24"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="avatar">
                                        <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img 
                                                src={profile?.photoURL || user?.photoURL || "https://via.placeholder.com/150"} 
                                                alt={profile?.displayName || "User"} 
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-3xl font-bold mb-2">
                                                    {profile?.displayName || user?.displayName || "Anonymous User"}
                                                </h2>
                                                {profile?.bio && (
                                                    <p className="text-base-content/70 mb-4">{profile.bio}</p>
                                                )}
                                            </div>
                                            
                                            {isOwnProfile && (
                                                <button 
                                                    onClick={() => setEditMode(true)}
                                                    className="btn btn-outline btn-sm"
                                                >
                                                    <Edit size={16} /> Edit Profile
                                                </button>
                                            )}
                                        </div>

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
                        )}
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="tabs tabs-boxed mb-6 bg-base-100 p-2 shadow-lg">
                    <button 
                        className={`tab tab-lg ${activeTab === "posted" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("posted")}
                    >
                        <Briefcase size={18} className="mr-2" />
                        Posted Jobs ({postedJobs.length})
                    </button>
                    <button 
                        className={`tab tab-lg ${activeTab === "accepted" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("accepted")}
                    >
                        <Briefcase size={18} className="mr-2" />
                        Accepted Jobs ({acceptedJobs.length})
                    </button>
                </div>

                {/* Jobs Grid */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {activeTab === "posted" && postedJobs.length === 0 && (
                        <div className="col-span-full text-center py-12">
                            <Briefcase size={64} className="mx-auto mb-4 text-base-content/30" />
                            <p className="text-xl text-base-content/70">No jobs posted yet</p>
                        </div>
                    )}

                    {activeTab === "accepted" && acceptedJobs.length === 0 && (
                        <div className="col-span-full text-center py-12">
                            <Briefcase size={64} className="mx-auto mb-4 text-base-content/30" />
                            <p className="text-xl text-base-content/70">No jobs accepted yet</p>
                        </div>
                    )}

                    {activeTab === "posted" && postedJobs.map((job) => (
                        <motion.div
                            key={job._id}
                            whileHover={{ y: -5 }}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                            onClick={() => navigate(`/jobs/${job._id}`)}
                        >
                            <div className="card-body">
                                <h3 className="card-title">{job.jobTitle}</h3>
                                <p className="text-base-content/70 line-clamp-2">{job.description}</p>
                                
                                <div className="divider my-2"></div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="badge badge-secondary">{job.category}</span>
                                    <span className="font-bold text-primary">${job.salary}</span>
                                </div>
                                
                                <div className="text-sm text-base-content/60 mt-2">
                                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {activeTab === "accepted" && acceptedJobs.map((job) => (
                        <motion.div
                            key={job._id}
                            whileHover={{ y: -5 }}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                            onClick={() => navigate(`/jobs/${job.jobId}`)}
                        >
                            <div className="card-body">
                                <h3 className="card-title">{job.jobTitle}</h3>
                                <p className="text-base-content/70 line-clamp-2">{job.description}</p>
                                
                                <div className="divider my-2"></div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="badge badge-secondary">{job.category}</span>
                                    <span className="font-bold text-primary">${job.salary}</span>
                                </div>
                                
                                <div className="text-sm text-base-content/60 mt-2">
                                    Accepted: {new Date(job.acceptedAt).toLocaleDateString()}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
