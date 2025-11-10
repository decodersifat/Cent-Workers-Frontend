import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, User, Tag, FileText, Image } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import Navbar from "@/components/Navbar"

export default function AddJob() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    postedBy: "",
    category: "",
    summary: "",
    coverImage: ""
  })

  // Redirect to login if not authenticated
//   React.useEffect(() => {
//     if (!user) {
//       navigate("/login")
//     }
//   }, [user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
  
      const jobData = {
        ...formData,
        userEmail: user.email,
        uid: user.uid,
        createdAt: new Date()
      }

      console.log("Job Data to be saved:", jobData)

      const API = `${import.meta.env.VITE_BASE_URL}/api/v1/jobs/add-job`
      
      const response = await fetch(
        API,
        {
        method: "POST",  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData)
      })
      
      
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to post job")
      }
      
      setSuccess("Job posted successfully!")
      
      // Reset form
      setFormData({
        title: "",
        postedBy: "",
        category: "",
        summary: "",
        coverImage: ""
      })

      // Redirect to all jobs page after 2 seconds
    //   setTimeout(() => {
    //     navigate("/all-jobs")
    //   }, 2000)

    } catch (err) {
      console.error("Error posting job:", err)
      setError(err.message || "Failed to post job. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null 
  }

  return (
    <div className="min-h-screen bg-accent/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl lg:text-3xl font-bold font-display text-center">
              Post a New Job
            </CardTitle>
            <CardDescription className="text-center">
              Fill in the details below to post your job listing
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            {success && (
              <div className="bg-[#14A800]/10 border border-[#14A800]/20 text-[#14A800] px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}


            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}


            <div className="bg-muted/50 border rounded-md p-4 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Posted By:</p>
              <div className="space-y-1">
                <p className="text-sm"><span className="font-medium">Email:</span> {user.email}</p>
                <p className="text-sm"><span className="font-medium">User ID:</span> {user.uid}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Job Title */}
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
                <Label htmlFor="postedBy">Posted By (Name/Company) *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="postedBy"
                    name="postedBy"
                    type="text"
                    placeholder="e.g., John Doe or Acme Corp"
                    className="pl-10"
                    value={formData.postedBy}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="category"
                    name="category"
                    type="text"
                    placeholder="e.g., Web Development, Design, Marketing"
                    className="pl-10"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Summary */}
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

              {/* Cover Image URL */}
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
                <p className="text-xs text-muted-foreground">
                  Optional: Add a cover image URL for your job listing
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#14A800] hover:bg-[#0f8000] text-white"
                disabled={loading}
              >
                {loading ? "Posting Job..." : "Post Job"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
