import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Upload, X, GripVertical } from "lucide-react";

export default function PersonalSection({ data, onChange, dragHandleProps, onRemove }) {
  const [isUploading, setIsUploading] = useState(false);

  const updateField = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await base44.integrations.Core.UploadFile({ file });
      updateField('profile_photo', response.file_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setIsUploading(false);
  };

  const removePhoto = () => {
    updateField('profile_photo', '');
  };

  return (
    <Card className="bg-[#F8FAFC] border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-900 text-lg font-bold">
            <User className="w-4 h-4 text-gray-600" />
            Personal Information
          </CardTitle>
          <div {...dragHandleProps} className="cursor-grab hover:bg-gray-200 p-1.5 rounded-lg transition-colors">
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4">
        {/* Profile Photo Upload */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            {data.profile_photo ? (
              <div className="relative">
                <img 
                  src={data.profile_photo} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={removePhoto}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
                <User className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <Label className="text-xs font-medium text-gray-700">Profile Photo (Optional)</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="flex-1 text-xs h-8"
                disabled={isUploading}
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              Upload a professional headshot (JPG, PNG)
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="fullName" className="text-xs font-medium text-gray-700">Full Name *</Label>
            <Input
              id="fullName"
              value={data.full_name || ""}
              onChange={(e) => updateField('full_name', e.target.value)}
              placeholder="John Doe"
              className="mt-1 h-9 text-sm placeholder:text-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-xs font-medium text-gray-700">Email *</Label>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="john@example.com"
              className="mt-1 h-9 text-sm placeholder:text-gray-400"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="phone" className="text-xs font-medium text-gray-700">Phone</Label>
            <Input
              id="phone"
              value={data.phone || ""}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="mt-1 h-9 text-sm placeholder:text-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-xs font-medium text-gray-700">Location</Label>
            <Input
              id="location"
              value={data.location || ""}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="San Francisco, CA"
              className="mt-1 h-9 text-sm placeholder:text-gray-400"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="linkedin" className="text-xs font-medium text-gray-700">LinkedIn</Label>
            <Input
              id="linkedin"
              value={data.linkedin || ""}
              onChange={(e) => updateField('linkedin', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className="mt-1 h-9 text-sm placeholder:text-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="website" className="text-xs font-medium text-gray-700">Website/Portfolio</Label>
            <Input
              id="website"
              value={data.website || ""}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="johndoe.com"
              className="mt-1 h-9 text-sm placeholder:text-gray-400"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="summary" className="text-xs font-medium text-gray-700">Professional Summary</Label>
          <Textarea
            id="summary"
            value={data.summary || ""}
            onChange={(e) => updateField('summary', e.target.value)}
            placeholder="A brief professional summary highlighting your key strengths and achievements..."
            rows={3}
            className="mt-1 text-sm placeholder:text-gray-400"
          />
        </div>
      </CardContent>
    </Card>
  );
}