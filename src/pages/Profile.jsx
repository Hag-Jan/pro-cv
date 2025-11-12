import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User as UserIcon, Camera, Save, Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

// Skeleton loader component
const SkeletonProfile = () => (
  <div className="p-6 lg:p-8 max-w-4xl mx-auto">
    <div className="mb-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    </div>

    <div className="space-y-8">
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "", 
    bio: "",
    avatar: "",
    job_title: "",
    company: "",
    experience_years: "",
    skills: []
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    setIsLoading(true);
    try {
      const userData = await base44.auth.me();
      setUser(userData);
      setFormData({
        full_name: userData.full_name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        location: userData.location || "",
        bio: userData.bio || "",
        avatar: userData.avatar || "",
        job_title: userData.job_title || "",
        company: userData.company || "",
        experience_years: userData.experience_years || "",
        skills: userData.skills || []
      });
    } catch (error) {
      console.error("Error loading profile:", error);
    }
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await base44.integrations.Core.UploadFile({ file });
      handleInputChange('avatar', response.file_url);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await base44.auth.updateMe(formData);
      setUser({ ...user, ...formData });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return <SkeletonProfile />;
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <UserIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Manage your account settings and personal information.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture Section */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-200">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.avatar} alt={formData.full_name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-2xl">
                  {formData.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{formData.full_name || 'Your Name'}</h3>
              <p className="text-gray-600">{formData.job_title || 'Professional'}</p>
              <p className="text-sm text-gray-500 mt-1">
                {isUploading ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-200">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State/Country"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself, your interests, and your professional background..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-200">
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="jobTitle"
                    value={formData.job_title}
                    onChange={(e) => handleInputChange('job_title', e.target.value)}
                    placeholder="Software Engineer, Product Manager, etc."
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Current Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="experienceYears">Years of Experience</Label>
              <Input
                id="experienceYears"
                type="number"
                value={formData.experience_years}
                onChange={(e) => handleInputChange('experience_years', e.target.value)}
                placeholder="5"
                min="0"
                max="50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Account Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">3</div>
                <div className="text-sm text-blue-600">Resumes Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">12</div>
                <div className="text-sm text-blue-600">Job Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">92%</div>
                <div className="text-sm text-blue-600">Average ATS Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-98 min-h-[48px]"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}