import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { Briefcase, ListTodo } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Profile = () => {
    const { uid } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card bg-base-100 shadow-2xl w-full max-w-md"
            >
                <div className="card-body items-center text-center p-8">
                    {/* Profile Picture */}
                    <div className="avatar mb-4">
                        <div className="w-32 h-32 rounded-full ring ring-[#14A800] ring-offset-base-100 ring-offset-4 mx-auto">
                            <img 
                                src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=14A800&color=fff&size=128`} 
                                alt={user?.displayName || "User"}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <h2 className="text-3xl font-bold mb-2">
                        {user?.displayName || "Anonymous User"}
                    </h2>

                    {/* UID/Email */}
                    <p className="text-base-content/60 mb-8 text-sm">
                        {user?.email}
                    </p>

                    <div className="divider"></div>

                    {/* Action Buttons */}
                    <div className="w-full space-y-3 mt-4">
                        <Button
                            onClick={() => navigate('/my-added-jobs')}
                            variant="outline"
                            className="w-full gap-2 hover:bg-[#14A800] hover:text-white hover:border-[#14A800] transition-all"
                        >
                            <Briefcase size={20} />
                            My Posted Jobs
                        </Button>
                        
                        <Button
                            onClick={() => navigate('/my-accepted-tasks')}
                            variant="outline"
                            className="w-full gap-2 hover:bg-[#14A800] hover:text-white hover:border-[#14A800] transition-all"
                        >
                            <ListTodo size={20} />
                            My Accepted Tasks
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
