import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Tag, FileText, Image } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import Navbar from "@/components/Navbar"
import toast from 'react-hot-toast'

export default function UpdateJob() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { jobId } = useParams()
    const [loading, setLoading] = useState(false)
    const [fetchingJob, setFetchingJob] = useState(true)
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        summary: "",
        coverImage: ""
    })

    const API_BASE = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        fetchJobDetails()
        fetchCategories()
    }, [jobId])

    const fetchJobDetails = async () => {
        try {
            setFetchingJob(true)
            const response = await fetch(`${API_BASE}/api/v1/jobs/job-details/${jobId}`)
            
            if (!response.ok) {
                throw new Error('Failed to load job')
            }

            const result = await response.json()
            const job = result.data

            setFormData({
                title: job.title || "",
                category: job.category || "",
                summary: job.summary || "",
                coverImage: job.coverImage || ""
            })
        } catch (err) {
            console.error("Error fetching job:", err)
            toast.error('Failed to load job details')
        } finally {
            setFetchingJob(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/v1/category/all-categories`)
            if (response.ok) {
                const data = await response.json()
                setCategories(data.data || [])
            }
        } catch (err) {
            console.error("Error fetching categories:", err)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`${API_BASE}/api/v1/jobs/update-job/${jobId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.message || "Failed to update job")
            }
            
            toast.success('Job updated successfully!')
            
            setTimeout(() => {
                navigate("/my-added-jobs")
            }, 1500)

        } catch (err) {
            console.error("Error updating job:", err)
            toast.error(err.message || 'Failed to update job. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!user) {
        return null
    }

    if (fetchingJob) {
        return (
            <>
                <Navbar />
                <div className='min-h-screen flex items-center justify-center bg-accent/20'>
                    <div className='text-center'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#14A800] mx-auto'></div>
                        <p className='text-muted-foreground mt-4'>Loading job details...</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="min-h-screen bg-accent/20">
            <Navbar />
            
            <div className="container mx-auto px-4 py-12">
                <Card className="max-w-2xl mx-auto shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl lg:text-3xl font-bold font-display text-center">
                            Update Job
                        </CardTitle>
                        <CardDescription className="text-center">
                            Update the details of your job listing
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Job Title *</Label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="e.g., Senior React Developer"
                                        className="pl-10"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                                    <select
                                        id="category"
                                        name="category"
                                        className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#14A800]"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat.title}>
                                                {cat.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="summary">Job Summary *</Label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <textarea
                                        id="summary"
                                        name="summary"
                                        placeholder="Describe the job, requirements, and responsibilities..."
                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 pl-10 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.summary}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="coverImage">Cover Image URL</Label>
                                <div className="relative">
                                    <Image className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="coverImage"
                                        name="coverImage"
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        className="pl-10"
                                        value={formData.coverImage}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-[#14A800] hover:bg-[#0f8000] text-white"
                                    disabled={loading}
                                >
                                    {loading ? "Updating Job..." : "Update Job"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => navigate('/my-added-jobs')}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
