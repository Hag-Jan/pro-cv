import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Sparkles, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Send,
  Eye,
  Lightbulb,
  Plus,
  Minus,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeLoader from "@/components/common/ResumeLoader";

export default function JobMatcher() {
  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResults, setMatchResults] = useState(null);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isApplying, setIsApplying] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadResumes();
    loadJobs();
    loadApplications();
  }, []);

  const loadResumes = async () => {
    try {
      const data = await base44.entities.Resume.list("-updated_date");
      setResumes(data);
      if (data.length > 0) {
        setSelectedResume(data[0].id);
      }
    } catch (error) {
      console.error("Error loading resumes:", error);
    }
  };

  const loadJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const data = await base44.entities.Job.list("-posted_date", 50);
      setJobs(data);
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
    setIsLoadingJobs(false);
  };

  const loadApplications = async () => {
    try {
      const data = await base44.entities.JobApplication.list();
      setApplications(data);
    } catch (error) {
      console.error("Error loading applications:", error);
    }
  };

  const analyzeJobMatch = async (job) => {
    if (!selectedResume) {
      alert("Please select a resume first");
      return;
    }

    setSelectedJob(job);
    setIsAnalyzing(true);
    try {
      const resume = resumes.find(r => r.id === selectedResume);
      
      const prompt = `Analyze how well this resume matches the job description and provide a comprehensive match analysis.

RESUME INFORMATION:
Name: ${resume.personal_info?.full_name || ""}
Summary: ${resume.personal_info?.summary || ""}
Skills: ${resume.skills?.join(", ") || ""}
Experience: ${resume.experience?.map(exp => `${exp.title} at ${exp.company} (${exp.start_date} - ${exp.current ? 'Present' : exp.end_date}): ${exp.bullets?.join('; ')}`).join(" | ") || ""}
Education: ${resume.education?.map(edu => `${edu.degree} from ${edu.institution} (${edu.graduation_year})`).join(" | ") || ""}
Projects: ${resume.projects?.map(proj => `${proj.name}: ${proj.description}`).join(" | ") || ""}

JOB DESCRIPTION:
Title: ${job.title}
Company: ${job.company}
Location: ${job.location}
Type: ${job.type}
Experience Level: ${job.experience_level}
Description: ${job.description}
Requirements: ${job.requirements?.join(", ") || ""}
Required Skills: ${job.skills?.join(", ") || ""}

Analyze:
1. Overall Match Score (0-100) - How well does the resume match this job?
2. Skill Match - Which skills match, which are missing?
3. Experience Match - Does experience level and type align?
4. Education Match - Does education meet requirements?
5. Keyword Match - How many job keywords appear in resume?
6. Sections to Add - What new content should be added?
7. Sections to Modify - What existing content should be changed?
8. Skills to Add - Specific skills to learn or highlight
9. Resume Tailoring Suggestions - Specific rewrites for this job
10. Application Readiness - Is this resume ready to apply?

Provide actionable, specific recommendations.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            match_score: {
              type: "number",
              minimum: 0,
              maximum: 100,
              description: "Overall match percentage"
            },
            match_level: {
              type: "string",
              enum: ["excellent", "good", "fair", "poor"],
              description: "Match quality level"
            },
            skill_analysis: {
              type: "object",
              properties: {
                matching_skills: {
                  type: "array",
                  items: { type: "string" }
                },
                missing_skills: {
                  type: "array",
                  items: { type: "string" }
                },
                skill_gap_percentage: { type: "number" }
              }
            },
            experience_analysis: {
              type: "object",
              properties: {
                years_match: { type: "boolean" },
                level_match: { type: "boolean" },
                industry_match: { type: "boolean" },
                feedback: { type: "string" }
              }
            },
            education_analysis: {
              type: "object",
              properties: {
                meets_requirements: { type: "boolean" },
                feedback: { type: "string" }
              }
            },
            keyword_analysis: {
              type: "object",
              properties: {
                matched_keywords: {
                  type: "array",
                  items: { type: "string" }
                },
                missing_keywords: {
                  type: "array",
                  items: { type: "string" }
                },
                keyword_density: { type: "number" }
              }
            },
            sections_to_add: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  section: { type: "string" },
                  content_suggestion: { type: "string" },
                  priority: {
                    type: "string",
                    enum: ["high", "medium", "low"]
                  }
                }
              }
            },
            sections_to_modify: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  section: { type: "string" },
                  current_issue: { type: "string" },
                  suggested_change: { type: "string" },
                  priority: {
                    type: "string",
                    enum: ["high", "medium", "low"]
                  }
                }
              }
            },
            skills_to_add: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  skill: { type: "string" },
                  importance: {
                    type: "string",
                    enum: ["critical", "important", "nice-to-have"]
                  },
                  learning_resource: { type: "string" }
                }
              }
            },
            tailoring_suggestions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  location: { type: "string" },
                  current_text: { type: "string" },
                  suggested_text: { type: "string" },
                  reason: { type: "string" }
                }
              }
            },
            application_readiness: {
              type: "object",
              properties: {
                ready_to_apply: { type: "boolean" },
                confidence_level: {
                  type: "string",
                  enum: ["high", "medium", "low"]
                },
                estimated_time_to_ready: { type: "string" },
                blockers: {
                  type: "array",
                  items: { type: "string" }
                }
              }
            },
            summary: { type: "string" }
          }
        }
      });

      setMatchResults(response);
    } catch (error) {
      console.error("Error analyzing match:", error);
      alert("Failed to analyze job match. Please try again.");
    }
    setIsAnalyzing(false);
  };

  const applyToJob = async () => {
    if (!selectedJob || !selectedResume) {
      alert("Please select both a job and resume");
      return;
    }

    const resume = resumes.find(r => r.id === selectedResume);
    
    if (matchResults?.match_score < 60) {
      if (!confirm("Your match score is below 60%. It's recommended to tailor your resume first. Apply anyway?")) {
        return;
      }
    }

    setIsApplying(true);
    try {
      await base44.entities.JobApplication.create({
        job_title: selectedJob.title,
        company_name: selectedJob.company,
        job_url: selectedJob.company_logo || "",
        application_date: new Date().toISOString().split('T')[0],
        status: "applied",
        resume_used: selectedResume,
        notes: matchResults ? `Match Score: ${matchResults.match_score}%\n${matchResults.summary}` : ""
      });

      alert("Application submitted successfully! Track it in the Analytics page.");
      loadApplications();
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Failed to submit application. Please try again.");
    }
    setIsApplying(false);
  };

  const getMatchColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMatchBgColor = (score) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getMatchBadgeColor = (level) => {
    switch (level) {
      case "excellent": return "bg-green-500 text-white";
      case "good": return "bg-blue-500 text-white";
      case "fair": return "bg-yellow-500 text-white";
      case "poor": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-300";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low": return "bg-blue-100 text-blue-800 border-blue-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case "critical": return "bg-red-100 text-red-800";
      case "important": return "bg-orange-100 text-orange-800";
      case "nice-to-have": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const hasApplied = (jobId) => {
    return applications.some(app => 
      app.job_title === selectedJob?.title && 
      app.company_name === selectedJob?.company
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || job.type === filterType;
    return matchesSearch && matchesType;
  });

  if (isLoadingJobs) {
    return <ResumeLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Job Matcher</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Analyze your resume against job descriptions and get tailored recommendations for better matches
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Job List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Resume Selector */}
            <Card className="bg-white/80 backdrop-blur-sm border border-blue-200/50">
              <CardHeader>
                <CardTitle className="text-lg">Select Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedResume} onValueChange={setSelectedResume}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a resume" />
                  </SelectTrigger>
                  <SelectContent>
                    {resumes.map((resume) => (
                      <SelectItem key={resume.id} value={resume.id}>
                        {resume.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="bg-white/80 backdrop-blur-sm border border-blue-200/50">
              <CardContent className="p-4 space-y-3">
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Job List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredJobs.map((job) => {
                const applied = hasApplied(job.id);
                return (
                  <Card 
                    key={job.id}
                    className={`cursor-pointer hover:shadow-lg transition-all ${
                      selectedJob?.id === job.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        {applied && (
                          <Badge className="bg-green-500 text-white text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Applied
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span>{job.type}</span>
                        {job.salary_min && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {job.salary_min.toLocaleString()}-{job.salary_max?.toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          analyzeJobMatch(job);
                        }}
                        disabled={isAnalyzing || !selectedResume}
                        className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                      >
                        {isAnalyzing && selectedJob?.id === job.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Analyze Match
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right: Match Analysis */}
          <div className="lg:col-span-2">
            {!matchResults && !isAnalyzing && (
              <Card className="bg-white/80 backdrop-blur-sm h-full flex items-center justify-center">
                <CardContent className="text-center p-12">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Ready to Match
                  </h3>
                  <p className="text-gray-500">
                    Select a job and click "Analyze Match" to get AI-powered compatibility insights
                  </p>
                </CardContent>
              </Card>
            )}

            {isAnalyzing && (
              <Card className="bg-white/80 backdrop-blur-sm h-full flex items-center justify-center">
                <CardContent className="text-center p-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Analyzing Match...
                  </h3>
                  <p className="text-gray-500">
                    AI is comparing your resume with the job description
                  </p>
                </CardContent>
              </Card>
            )}

            {matchResults && selectedJob && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Match Score Card */}
                <Card className={`border-2 ${getMatchBgColor(matchResults.match_score)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {selectedJob.title}
                        </h3>
                        <p className="text-gray-600">{selectedJob.company}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-5xl font-bold ${getMatchColor(matchResults.match_score)}`}>
                          {matchResults.match_score}%
                        </div>
                        <Badge className={`mt-2 ${getMatchBadgeColor(matchResults.match_level)}`}>
                          {matchResults.match_level} match
                        </Badge>
                      </div>
                    </div>
                    <Progress value={matchResults.match_score} className="mb-4" />
                    <p className="text-gray-700 text-sm">{matchResults.summary}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={applyToJob}
                        disabled={isApplying || hasApplied()}
                        className={`flex-1 ${
                          matchResults.match_score >= 70 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {isApplying ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Applying...
                          </>
                        ) : hasApplied() ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Already Applied
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Apply Now
                          </>
                        )}
                      </Button>
                      {selectedJob.company_logo && (
                        <Button
                          variant="outline"
                          onClick={() => window.open(selectedJob.company_logo, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Job
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Analysis Tabs */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <Tabs defaultValue="skills" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 mb-6">
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="sections">Sections</TabsTrigger>
                        <TabsTrigger value="tailoring">Tailoring</TabsTrigger>
                        <TabsTrigger value="readiness">Readiness</TabsTrigger>
                      </TabsList>

                      {/* Skills Analysis */}
                      <TabsContent value="skills" className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Matching Skills */}
                          <Card className="bg-green-50 border-green-200">
                            <CardHeader>
                              <CardTitle className="text-lg text-green-900 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Matching Skills ({matchResults.skill_analysis.matching_skills.length})
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                {matchResults.skill_analysis.matching_skills.map((skill, i) => (
                                  <Badge key={i} className="bg-green-100 text-green-800">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          {/* Missing Skills */}
                          <Card className="bg-orange-50 border-orange-200">
                            <CardHeader>
                              <CardTitle className="text-lg text-orange-900 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                Missing Skills ({matchResults.skill_analysis.missing_skills.length})
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                {matchResults.skill_analysis.missing_skills.map((skill, i) => (
                                  <Badge key={i} variant="outline" className="border-orange-300 text-orange-700">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Skills to Add */}
                        {matchResults.skills_to_add.length > 0 && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Skills to Develop</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {matchResults.skills_to_add.map((item, i) => (
                                  <div key={i} className="p-3 bg-gray-50 rounded-lg border">
                                    <div className="flex items-start justify-between mb-2">
                                      <span className="font-semibold text-gray-900">{item.skill}</span>
                                      <Badge className={getImportanceColor(item.importance)}>
                                        {item.importance}
                                      </Badge>
                                    </div>
                                    {item.learning_resource && (
                                      <p className="text-xs text-gray-600">
                                        💡 {item.learning_resource}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>

                      {/* Sections Analysis */}
                      <TabsContent value="sections" className="space-y-4">
                        {/* Sections to Add */}
                        {matchResults.sections_to_add.length > 0 && (
                          <Card className="border-blue-200">
                            <CardHeader>
                              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                Sections to Add
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {matchResults.sections_to_add.map((item, i) => (
                                  <div key={i} className={`p-4 rounded-lg border-2 ${getPriorityColor(item.priority)}`}>
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-semibold">{item.section}</h4>
                                      <Badge variant="outline" className="text-xs">
                                        {item.priority} priority
                                      </Badge>
                                    </div>
                                    <p className="text-sm">{item.content_suggestion}</p>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* Sections to Modify */}
                        {matchResults.sections_to_modify.length > 0 && (
                          <Card className="border-yellow-200">
                            <CardHeader>
                              <CardTitle className="text-lg text-yellow-900 flex items-center gap-2">
                                <Minus className="w-5 h-5" />
                                Sections to Modify
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {matchResults.sections_to_modify.map((item, i) => (
                                  <div key={i} className={`p-4 rounded-lg border-2 ${getPriorityColor(item.priority)}`}>
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-semibold">{item.section}</h4>
                                      <Badge variant="outline" className="text-xs">
                                        {item.priority} priority
                                      </Badge>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <span className="font-medium text-red-700">Issue:</span>
                                        <p className="text-gray-700">{item.current_issue}</p>
                                      </div>
                                      <div>
                                        <span className="font-medium text-green-700">Suggestion:</span>
                                        <p className="text-gray-700">{item.suggested_change}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>

                      {/* Tailoring Suggestions */}
                      <TabsContent value="tailoring" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Lightbulb className="w-5 h-5 text-yellow-600" />
                              Specific Resume Tailoring
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {matchResults.tailoring_suggestions.length > 0 ? (
                              <div className="space-y-4">
                                {matchResults.tailoring_suggestions.map((suggestion, i) => (
                                  <div key={i} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                    <div className="text-xs text-purple-700 font-medium mb-2">
                                      📍 {suggestion.location}
                                    </div>
                                    <div className="space-y-3">
                                      <div>
                                        <Badge className="bg-red-100 text-red-800 mb-2 text-xs">Current</Badge>
                                        <p className="text-sm text-gray-700 bg-white p-2 rounded border">
                                          {suggestion.current_text}
                                        </p>
                                      </div>
                                      <ArrowRight className="w-5 h-5 text-purple-600 mx-auto" />
                                      <div>
                                        <Badge className="bg-green-100 text-green-800 mb-2 text-xs">Suggested</Badge>
                                        <p className="text-sm text-gray-900 bg-white p-2 rounded border font-medium">
                                          {suggestion.suggested_text}
                                        </p>
                                      </div>
                                      <p className="text-xs text-purple-700 italic">
                                        💡 {suggestion.reason}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-center py-8">
                                No specific tailoring suggestions at this time
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Application Readiness */}
                      <TabsContent value="readiness" className="space-y-4">
                        <Card className={
                          matchResults.application_readiness.ready_to_apply 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-orange-50 border-orange-200'
                        }>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {matchResults.application_readiness.ready_to_apply ? (
                                <>
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                  <span className="text-green-900">Ready to Apply</span>
                                </>
                              ) : (
                                <>
                                  <Clock className="w-5 h-5 text-orange-600" />
                                  <span className="text-orange-900">Not Quite Ready</span>
                                </>
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Confidence Level</span>
                                <Badge className={
                                  matchResults.application_readiness.confidence_level === 'high'
                                    ? 'bg-green-500'
                                    : matchResults.application_readiness.confidence_level === 'medium'
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }>
                                  {matchResults.application_readiness.confidence_level}
                                </Badge>
                              </div>
                              {matchResults.application_readiness.estimated_time_to_ready && (
                                <p className="text-sm text-gray-700">
                                  ⏱️ Estimated time to ready: {matchResults.application_readiness.estimated_time_to_ready}
                                </p>
                              )}
                            </div>

                            {matchResults.application_readiness.blockers.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Blockers to Address:</h4>
                                <ul className="space-y-2">
                                  {matchResults.application_readiness.blockers.map((blocker, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700">{blocker}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {matchResults.application_readiness.ready_to_apply && (
                              <div className="pt-4 border-t">
                                <p className="text-sm text-green-800 mb-3">
                                  ✅ Your resume is well-aligned with this job. You can apply with confidence!
                                </p>
                                <Button
                                  onClick={applyToJob}
                                  disabled={isApplying || hasApplied()}
                                  className="w-full bg-green-600 hover:bg-green-700"
                                  size="lg"
                                >
                                  {hasApplied() ? (
                                    <>
                                      <CheckCircle className="w-5 h-5 mr-2" />
                                      Already Applied
                                    </>
                                  ) : (
                                    <>
                                      <Send className="w-5 h-5 mr-2" />
                                      Apply to This Job
                                    </>
                                  )}
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}