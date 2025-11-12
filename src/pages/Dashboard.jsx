import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { createPageUrl } from "@/utils";
import {
  FileText,
  Plus,
  Download,
  Edit,
  Trash2,
  Copy,
  Search,
  Calendar,
  TrendingUp,
  Sparkles,
  LayoutTemplate,
  FolderOpen,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState("");

  const queryClient = useQueryClient();

  const { data: resumes, isLoading, error } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const data = await base44.entities.Resume.list();
      return data;
    },
    initialData: [],
  });

  const createResumeMutation = useMutation({
    mutationFn: async (title) => {
      return await base44.entities.Resume.create({
        title: title,
        template: "minimal-clean",
        sections_order: ["personal_info", "experience", "education", "skills", "projects"],
        enabled_sections: ["personal_info", "experience", "education", "skills", "projects"],
        customization: {
          color_scheme: "#2563EB",
          font_family: "inter",
          font_size: "medium",
          spacing: "comfortable"
        },
        personal_info: {},
        experience: [],
        education: [],
        skills: [],
        projects: []
      });
    },
    onSuccess: (newResume) => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      window.location.href = createPageUrl('Editor') + `?id=${newResume.id}`;
    },
  });

  const deleteResumeMutation = useMutation({
    mutationFn: (id) => base44.entities.Resume.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      setShowDeleteDialog(false);
      setSelectedResume(null);
    },
  });

  const duplicateResumeMutation = useMutation({
    mutationFn: async (resume) => {
      const duplicate = { ...resume };
      delete duplicate.id;
      delete duplicate.created_date;
      delete duplicate.updated_date;
      delete duplicate.created_by;
      duplicate.title = `${resume.title} (Copy)`;
      return await base44.entities.Resume.create(duplicate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });

  const handleCreateResume = () => {
    if (!newResumeTitle.trim()) {
      alert("Please enter a resume title");
      return;
    }
    createResumeMutation.mutate(newResumeTitle);
  };

  const handleDeleteResume = () => {
    if (selectedResume) {
      deleteResumeMutation.mutate(selectedResume.id);
    }
  };

  const filteredResumes = resumes.filter((resume) =>
    resume.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                My Resumes
              </h1>
              <p className="text-gray-600">
                Create, edit, and manage your professional resumes
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => window.location.href = createPageUrl('Templates')}
                variant="outline"
                className="flex-1 md:flex-none"
              >
                <LayoutTemplate className="w-4 h-4 mr-2" />
                Browse Templates
              </Button>
              
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Resume
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 md:mb-6"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200/50 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Resumes</p>
                  <p className="text-3xl font-bold text-gray-900">{resumes.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200/50 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Recently Updated</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {resumes.filter(r => {
                      const updated = new Date(r.updated_date);
                      const now = new Date();
                      const diffDays = (now - updated) / (1000 * 60 * 60 * 24);
                      return diffDays <= 7;
                    }).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-200/50 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Templates Used</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {new Set(resumes.map(r => r.template)).size}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 md:mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search resumes by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white/80 backdrop-blur-sm border-gray-200"
            />
          </div>
        </motion.div>

        {/* Resumes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white/80 backdrop-blur-sm animate-pulse">
                <CardContent className="p-4 md:p-6">
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredResumes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-300">
              <CardContent className="p-4 md:p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchQuery ? "No resumes found" : "No resumes yet"}
                </h3>
                <p className="text-gray-600 mb-4 md:mb-6">
                  {searchQuery 
                    ? "Try adjusting your search terms" 
                    : "Create your first professional resume to get started"
                  }
                </p>
                {!searchQuery && (
                  <Button
                    onClick={() => setShowCreateDialog(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Resume
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence>
              {filteredResumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 group">
                    <CardHeader className="p-4 md:p-6 pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg font-bold text-gray-900 mb-2 truncate">
                            {resume.title || "Untitled Resume"}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              {resume.template?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Custom"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {(resume.enabled_sections || []).length} sections
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 ml-3 group-hover:scale-110 transition-transform">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Updated {formatDate(resume.updated_date)}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 md:p-6 pt-0">
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <Button
                          onClick={() => window.location.href = createPageUrl('Editor') + `?id=${resume.id}`}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          size="sm"
                        >
                          <Edit className="w-3.5 h-3.5 mr-1" />
                          Edit
                        </Button>
                        
                        <Button
                          onClick={() => duplicateResumeMutation.mutate(resume)}
                          variant="outline"
                          className="w-full"
                          size="sm"
                        >
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          Duplicate
                        </Button>
                      </div>

                      <Button
                        onClick={() => {
                          setSelectedResume(resume);
                          setShowDeleteDialog(true);
                        }}
                        variant="ghost"
                        className="w-full text-red-600 hover:bg-red-50"
                        size="sm"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 md:mt-8"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Need Help Getting Started?</h3>
                    <p className="text-blue-100 text-sm">
                      Browse our professional templates or use AI to generate your resume
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Button
                    onClick={() => window.location.href = createPageUrl('Templates')}
                    variant="outline"
                    className="flex-1 md:flex-none bg-white text-blue-600 hover:bg-blue-50 border-0"
                  >
                    <LayoutTemplate className="w-4 h-4 mr-2" />
                    Templates
                  </Button>
                  <Button
                    onClick={() => window.location.href = createPageUrl('AIResumeReview')}
                    variant="outline"
                    className="flex-1 md:flex-none bg-white text-blue-600 hover:bg-blue-50 border-0"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Create Resume Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Give your resume a title to get started
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="e.g., Software Engineer Resume"
              value={newResumeTitle}
              onChange={(e) => setNewResumeTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateResume()}
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                onClick={() => setShowCreateDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateResume}
                disabled={createResumeMutation.isPending}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                {createResumeMutation.isPending ? "Creating..." : "Create Resume"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Resume</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedResume?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowDeleteDialog(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteResume}
              disabled={deleteResumeMutation.isPending}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {deleteResumeMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}