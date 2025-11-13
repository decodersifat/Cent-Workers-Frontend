import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, User, Tag, FileText, Image, Plus, X, ChevronDown } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import Navbar from "@/components/Navbar"
import toast from 'react-hot-toast'

export default function AddJob() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Category states
  const [categories, setCategories] = useState([])
  const [userCategories, setUserCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategoryTitle, setNewCategoryTitle] = useState("")
  const [newCategoryImage, setNewCategoryImage] = useState("")
  const [addingCategory, setAddingCategory] = useState(false)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    postedBy: "",
    category: "",
    summary: "",
    coverImage: ""
  })

  const API_BASE = import.meta.env.VITE_BASE_URL

  // Fetch all categories and user categories on mount
  useEffect(() => {
    if (!user) return
    fetchCategories()
  }, [user])

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true)
      
      // Fetch all categories
      const allCatsResponse = await fetch(`${API_BASE}/api/v1/category/all-categories`)
      if (allCatsResponse.ok) {
        const allCatsData = await allCatsResponse.json()
        // Backend returns { success, message, count, data: [...] }
        setCategories(allCatsData.data || [])
      }

      // Fetch user's categories
      if (user?.uid) {
        const userCatsResponse = await fetch(`${API_BASE}/api/v1/category/user-categories/${user.uid}`)
        if (userCatsResponse.ok) {
          const userCatsData = await userCatsResponse.json()
          // Backend returns { success, message, count, data: [...] }
          setUserCategories(userCatsData.data || [])
        }
      }
    } catch (err) {
      console.error("Error fetching categories:", err)
      setError("Failed to load categories")
    } finally {
      setLoadingCategories(false)
    }
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCategoryTitle.trim()) {
      setError("Category title is required")
      return
    }

    setAddingCategory(true)
    setError("")

    try {
      const urlSlug = newCategoryTitle.toLowerCase().replace(/\s+/g, "-")
      const categoryData = {
        title: newCategoryTitle,
        uid: user.uid,
        image: newCategoryImage || "https://via.placeholder.com/800?text=" + encodeURIComponent(newCategoryTitle),
        urlSlug: urlSlug
      }

      const response = await fetch(`${API_BASE}/api/v1/category/add-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData)
      })

      if (!response.ok) throw new Error("Failed to add category")

      const result = await response.json()
      // Backend returns { message, data: { insertedId, ... } }
      // We need to fetch the newly created category
      const newCategoryId = result.data.insertedId
      
      // Fetch the new category details
      const newCatResponse = await fetch(`${API_BASE}/api/v1/category/category/${newCategoryId}`)
      if (newCatResponse.ok) {
        const newCatData = await newCatResponse.json()
        const newCat = newCatData.data
        setUserCategories([...userCategories, newCat])
        setFormData({ ...formData, category: newCat._id })
      }
      
      setNewCategoryTitle("")
      setNewCategoryImage("")
      setShowAddCategory(false)
      setSuccess("Category added successfully!")
      toast.success("Category added successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("Error adding category:", err)
      setError(err.message || "Failed to add category")
      toast.error(err.message || "Failed to add category")
    } finally {
      setAddingCategory(false)
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return

    try {
      const response = await fetch(`${API_BASE}/api/v1/category/delete-category/${categoryId}`, {
        method: "DELETE"
      })

      if (!response.ok) throw new Error("Failed to delete category")

      setUserCategories(userCategories.filter(cat => cat._id !== categoryId))
      if (formData.category === categoryId) {
        setFormData({ ...formData, category: "" })
      }
      setSuccess("Category deleted successfully!")
      toast.success("Category deleted successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("Error deleting category:", err)
      setError(err.message || "Failed to delete category")
      toast.error(err.message || "Failed to delete category")
    }
  }

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
      // Validate category selection
      if (!formData.category) {
        setError("Please select a category")
        setLoading(false)
        return
      }

      const jobData = {
        title: formData.title,
        postedBy: formData.postedBy,
        category: formData.category,
        summary: formData.summary,
        coverImage: formData.coverImage,
        userEmail: user.email,
        uid: user.uid
      }

      console.log("Job Data to be saved:", jobData)

      const API = `${API_BASE}/api/v1/jobs/add-job`
      
      const response = await fetch(API, {
        method: "POST",  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to post job")
      }
      
      setSuccess("Job posted successfully!")
      toast.success("Job posted successfully!")
      
      setFormData({
        title: "",
        postedBy: "",
        category: "",
        summary: "",
        coverImage: ""
      })

      setTimeout(() => {
        navigate("/all-jobs")
      }, 2000)

    } catch (err) {
      console.error("Error posting job:", err)
      setError(err.message || "Failed to post job. Please try again.")
      toast.error(err.message || "Failed to post job. Please try again.")
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

              {/* Category Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <div className="relative">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                      className="w-full pl-10 pr-10 py-2 border border-input rounded-md bg-white text-left flex items-center justify-between hover:bg-accent/50 transition-colors"
                    >
                      <span className="text-sm">
                        {formData.category
                          ? categories.find(c => c._id === formData.category)?.title ||
                            userCategories.find(c => c._id === formData.category)?.title ||
                            "Select a category"
                          : "Select a category"}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>

                  {categoryDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-input rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                      {/* All Categories Section */}
                      {categories.length > 0 && (
                        <>
                          <div className="px-3 py-2 border-b border-border sticky top-0 bg-muted/50">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Available Categories</p>
                          </div>
                          {categories.map(cat => (
                            <button
                              key={cat._id}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, category: cat._id })
                                setCategoryDropdownOpen(false)
                              }}
                              className={`w-full text-left px-3 py-2 hover:bg-accent transition-colors text-sm ${formData.category === cat._id ? "bg-[#14A800]/10 text-[#14A800] font-medium" : ""}`}
                            >
                              {cat.title}
                            </button>
                          ))}
                        </>
                      )}

                      {/* User Categories Section */}
                      {userCategories.length > 0 && (
                        <>
                          <div className="px-3 py-2 border-b border-border sticky top-0 bg-muted/50">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">My Categories</p>
                          </div>
                          {userCategories.map(cat => (
                            <div
                              key={cat._id}
                              className="flex items-center justify-between px-3 py-2 hover:bg-accent group"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, category: cat._id })
                                  setCategoryDropdownOpen(false)
                                }}
                                className={`flex-1 text-left text-sm ${formData.category === cat._id ? "text-[#14A800] font-medium" : ""}`}
                              >
                                {cat.title}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCategory(cat._id)}
                                className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-all p-1"
                                title="Delete category"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </>
                      )}

                      {/* Add New Category Button */}
                      <div className="px-3 py-2 border-t border-border sticky bottom-0 bg-muted/50">
                        <button
                          type="button"
                          onClick={() => setShowAddCategory(!showAddCategory)}
                          className="w-full flex items-center justify-center gap-2 text-sm text-[#14A800] hover:text-[#0f8000] font-medium py-1 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add New Category
                        </button>
                      </div>

                      {/* Add Category Form */}
                      {showAddCategory && (
                        <div className="p-3 border-t border-border bg-accent/5 space-y-2">
                          <Input
                            type="text"
                            placeholder="Category name"
                            value={newCategoryTitle}
                            onChange={(e) => setNewCategoryTitle(e.target.value)}
                            className="text-sm"
                          />
                          <Input
                            type="url"
                            placeholder="Image URL (optional)"
                            value={newCategoryImage}
                            onChange={(e) => setNewCategoryImage(e.target.value)}
                            className="text-sm"
                          />
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              onClick={handleAddCategory}
                              disabled={addingCategory || !newCategoryTitle.trim()}
                              size="sm"
                              className="flex-1 bg-[#14A800] hover:bg-[#0f8000] text-white"
                            >
                              {addingCategory ? "Adding..." : "Add"}
                            </Button>
                            <Button
                              type="button"
                              onClick={() => {
                                setShowAddCategory(false)
                                setNewCategoryTitle("")
                                setNewCategoryImage("")
                              }}
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
