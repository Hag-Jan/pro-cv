import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Target, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp,
  Zap,
  Star,
  Award,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AIResumeReview() {
  const [userResumes, setUserResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadUserResumes();
  }, []);

  const loadUserResumes = async () => {
    try {
      const resumes = await base44.entities.Resume.list('-updated_date');
      setUserResumes(resumes);
    } catch (error) {
      console.error("Error loading resumes:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or DOCX file");
      return;
    }

    setIsUploading(true);
    try {
      const response = await base44.integrations.Core.UploadFile({ file });
      setUploadedFileUrl(response.file_url);
      setUploadedFile(file);
      setSelectedResume(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
    setIsUploading(false);
  };

  const analyzeResume = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }

    if (!uploadedFileUrl && !selectedResume) {
      alert("Please upload a resume or select one from your library");
      return;
    }

    setIsAnalyzing(true);
    try {
      let resumeContent = "";
      
      if (selectedResume) {
        // Use existing resume data
        resumeContent = `
          NAME: ${selectedResume.personal_info?.full_name}
          EMAIL: ${selectedResume.personal_info?.email}
          PHONE: ${selectedResume.personal_info?.phone}
          LOCATION: ${selectedResume.personal_info?.location}
          
          SUMMARY: ${selectedResume.personal_info?.summary}
          
          EXPERIENCE:
          ${selectedResume.experience?.map(exp => `
            ${exp.title} at ${exp.company} (${exp.start_date} - ${exp.current ? 'Present' : exp.end_date})
            ${exp.bullets?.join('\n')}
          `).join('\n')}
          
          EDUCATION:
          ${selectedResume.education?.map(edu => `
            ${edu.degree} from ${edu.institution} (${edu.graduation_year})
          `).join('\n')}
          
          SKILLS: ${selectedResume.skills?.join(', ')}
          
          PROJECTS:
          ${selectedResume.projects?.map(proj => `
            ${proj.name}: ${proj.description}
            Technologies: ${proj.technologies?.join(', ')}
          `).join('\n')}
        `;
      }

      const prompt = `You are an expert resume reviewer and ATS specialist. Analyze the following resume against the target job description and provide comprehensive feedback.

${uploadedFileUrl ? `RESUME FILE URL: ${uploadedFileUrl}` : `RESUME CONTENT:\n${resumeContent}`}

JOB DESCRIPTION:
${jobDescription}

Provide a detailed analysis with:

1. ATS COMPATIBILITY SCORE (0-100):
   - Formatting issues that could cause ATS failures
   - Specific suggestions to improve ATS compatibility
   - Font, spacing, and structure recommendations

2. KEYWORD MATCHING:
   - List of important keywords from job description that ARE present in resume
   - List of missing critical keywords that SHOULD be added
   - Keyword density and placement recommendations
   - Relevance score (0-100)

3. CLARITY & IMPACT:
   - Clarity score (0-100)
   - Analysis of bullet points for conciseness
   - Identify weak or vague statements
   - Suggest stronger action verbs and quantifiable achievements
   - Overall impact score (0-100)

4. STAR METHOD ADHERENCE:
   - Analyze experience bullets for STAR format (Situation, Task, Action, Result)
   - STAR adherence score (0-100)
   - List bullets that need improvement
   - Provide STAR-formatted examples for weak bullets

5. OVERALL RECOMMENDATIONS:
   - Top 5 priority improvements
   - Strengths to maintain
   - Red flags or concerns
   - Overall match score (0-100) for the job

Provide specific, actionable feedback with examples.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: false,
        file_urls: uploadedFileUrl ? [uploadedFileUrl] : undefined,
        response_json_schema: {
          type: "object",
          properties: {
            ats_compatibility: {
              type: "object",
              properties: {
                score: { type: "number", minimum: 0, maximum: 100 },
                issues: { type: "array", items: { type: "string" } },
                suggestions: { type: "array", items: { type: "string" } }
              }
            },
            keyword_matching: {
              type: "object",
              properties: {
                relevance_score: { type: "number", minimum: 0, maximum: 100 },
                present_keywords: { type: "array", items: { type: "string" } },
                missing_keywords: { type: "array", items: { type: "string" } },
                placement_tips: { type: "array", items: { type: "string" } }
              }
            },
            clarity_impact: {
              type: "object",
              properties: {
                clarity_score: { type: "number", minimum: 0, maximum: 100 },
                impact_score: { type: "number", minimum: 0, maximum: 100 },
                weak_statements: { type: "array", items: { type: "string" } },
                improvement_suggestions: { type: "array", items: { type: "string" } },
                action_verb_recommendations: { type: "array", items: { type: "string" } }
              }
            },
            star_method: {
              type: "object",
              properties: {
                adherence_score: { type: "number", minimum: 0, maximum: 100 },
                bullets_needing_improvement: { type: "array", items: { type: "string" } },
                star_examples: { type: "array", items: { 
                  type: "object",
                  properties: {
                    original: { type: "string" },
                    improved: { type: "string" }
                  }
                }}
              }
            },
            overall: {
              type: "object",
              properties: {
                match_score: { type: "number", minimum: 0, maximum: 100 },
                top_priorities: { type: "array", items: { type: "string" } },
                strengths: { type: "array", items: { type: "string" } },
                red_flags: { type: "array", items: { type: "string" } },
                summary: { type: "string" }
              }
            }
          }
        }
      });

      setAnalysisResults(response);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Failed to analyze resume. Please try again.");
    }
    setIsAnalyzing(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    if (score >= 60) return "Needs Work";
    return "Poor";
  };

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
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Resume Review</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Get instant AI-powered feedback on your resume with ATS compatibility analysis, keyword matching, and improvement recommendations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-purple-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Upload className="w-5 h-5" />
                  Upload Resume
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Select from existing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Existing Resume
                  </label>
                  <Select value={selectedResume?.id || ""} onValueChange={(id) => {
                    const resume = userResumes.find(r => r.id === id);
                    setSelectedResume(resume);
                    setUploadedFile(null);
                    setUploadedFileUrl(null);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose from your resumes" />
                    </SelectTrigger>
                    <SelectContent>
                      {userResumes.map((resume) => (
                        <SelectItem key={resume.id} value={resume.id}>
                          {resume.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span>OR</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Upload new file */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload PDF or DOCX
                  </label>
                  <Input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="cursor-pointer"
                  />
                  {uploadedFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>{uploadedFile.name}</span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  <Info className="w-4 h-4 inline mr-2" />
                  Upload a PDF or DOCX file, or select an existing resume
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-purple-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Target className="w-5 h-5" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
                  rows={12}
                  className="resize-none"
                />
                <Button
                  onClick={analyzeResume}
                  disabled={isAnalyzing || (!uploadedFileUrl && !selectedResume) || !jobDescription.trim()}
                  size="lg"
                  className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {!analysisResults && !isAnalyzing && (
              <Card className="bg-white/80 backdrop-blur-sm h-full flex items-center justify-center">
                <CardContent className="text-center p-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="text-gray-500">
                    Upload your resume and paste a job description to get instant AI-powered feedback
                  </p>
                </CardContent>
              </Card>
            )}

            {isAnalyzing && (
              <Card className="bg-white/80 backdrop-blur-sm h-full flex items-center justify-center">
                <CardContent className="text-center p-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Analyzing Your Resume...
                  </h3>
                  <p className="text-gray-500">
                    Our AI is reviewing your resume against the job description
                  </p>
                </CardContent>
              </Card>
            )}

            {analysisResults && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Overall Score Card */}
                <Card className={`${getScoreBgColor(analysisResults.overall.match_score)} border-2`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Overall Match Score
                        </h3>
                        <p className="text-sm text-gray-600">
                          {getScoreLabel(analysisResults.overall.match_score)}
                        </p>
                      </div>
                      <div className={`text-5xl font-bold ${getScoreColor(analysisResults.overall.match_score)}`}>
                        {analysisResults.overall.match_score}%
                      </div>
                    </div>
                    <Progress value={analysisResults.overall.match_score} className="mb-4" />
                    <p className="text-gray-700 text-sm">{analysisResults.overall.summary}</p>
                  </CardContent>
                </Card>

                {/* Detailed Analysis Tabs */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <Tabs defaultValue="ats" className="w-full">
                      <TabsList className="grid w-full grid-cols-5 mb-6">
                        <TabsTrigger value="ats">ATS</TabsTrigger>
                        <TabsTrigger value="keywords">Keywords</TabsTrigger>
                        <TabsTrigger value="clarity">Clarity</TabsTrigger>
                        <TabsTrigger value="star">STAR</TabsTrigger>
                        <TabsTrigger value="overall">Summary</TabsTrigger>
                      </TabsList>

                      {/* ATS Compatibility */}
                      <TabsContent value="ats" className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900">ATS Compatibility</h3>
                          <div className="flex items-center gap-2">
                            <span className={`text-3xl font-bold ${getScoreColor(analysisResults.ats_compatibility.score)}`}>
                              {analysisResults.ats_compatibility.score}%
                            </span>
                            <Target className="w-6 h-6 text-purple-600" />
                          </div>
                        </div>

                        {analysisResults.ats_compatibility.issues.length > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <AlertCircle className="w-5 h-5 text-red-600" />
                              <h4 className="font-semibold text-red-800">Issues Found</h4>
                            </div>
                            <ul className="space-y-2">
                              {analysisResults.ats_compatibility.issues.map((issue, i) => (
                                <li key={i} className="flex items-start gap-2 text-red-700 text-sm">
                                  <span className="text-red-500 mt-1">▪</span>
                                  <span>{issue}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <h4 className="font-semibold text-green-800">Suggestions</h4>
                          </div>
                          <ul className="space-y-2">
                            {analysisResults.ats_compatibility.suggestions.map((suggestion, i) => (
                              <li key={i} className="flex items-start gap-2 text-green-700 text-sm">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>

                      {/* Keyword Matching */}
                      <TabsContent value="keywords" className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900">Keyword Analysis</h3>
                          <div className="flex items-center gap-2">
                            <span className={`text-3xl font-bold ${getScoreColor(analysisResults.keyword_matching.relevance_score)}`}>
                              {analysisResults.keyword_matching.relevance_score}%
                            </span>
                            <Zap className="w-6 h-6 text-yellow-600" />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Present Keywords ({analysisResults.keyword_matching.present_keywords.length})
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {analysisResults.keyword_matching.present_keywords.map((keyword, i) => (
                                <Badge key={i} className="bg-green-100 text-green-800">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Missing Keywords ({analysisResults.keyword_matching.missing_keywords.length})
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {analysisResults.keyword_matching.missing_keywords.map((keyword, i) => (
                                <Badge key={i} variant="outline" className="border-orange-300 text-orange-700">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-3">Placement Tips</h4>
                          <ul className="space-y-2">
                            {analysisResults.keyword_matching.placement_tips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2 text-blue-700 text-sm">
                                <span className="text-blue-500 mt-1">→</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>

                      {/* Clarity & Impact */}
                      <TabsContent value="clarity" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <Card className={getScoreBgColor(analysisResults.clarity_impact.clarity_score)}>
                            <CardContent className="p-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Clarity Score</h4>
                              <div className={`text-3xl font-bold ${getScoreColor(analysisResults.clarity_impact.clarity_score)}`}>
                                {analysisResults.clarity_impact.clarity_score}%
                              </div>
                            </CardContent>
                          </Card>

                          <Card className={getScoreBgColor(analysisResults.clarity_impact.impact_score)}>
                            <CardContent className="p-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Impact Score</h4>
                              <div className={`text-3xl font-bold ${getScoreColor(analysisResults.clarity_impact.impact_score)}`}>
                                {analysisResults.clarity_impact.impact_score}%
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {analysisResults.clarity_impact.weak_statements.length > 0 && (
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-3">Weak Statements</h4>
                            <ul className="space-y-2">
                              {analysisResults.clarity_impact.weak_statements.map((statement, i) => (
                                <li key={i} className="text-orange-700 text-sm bg-white p-2 rounded border border-orange-200">
                                  {statement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-3">Improvement Suggestions</h4>
                          <ul className="space-y-2">
                            {analysisResults.clarity_impact.improvement_suggestions.map((suggestion, i) => (
                              <li key={i} className="flex items-start gap-2 text-blue-700 text-sm">
                                <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {analysisResults.clarity_impact.action_verb_recommendations.length > 0 && (
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-3">Recommended Action Verbs</h4>
                            <div className="flex flex-wrap gap-2">
                              {analysisResults.clarity_impact.action_verb_recommendations.map((verb, i) => (
                                <Badge key={i} className="bg-purple-100 text-purple-800">
                                  {verb}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </TabsContent>

                      {/* STAR Method */}
                      <TabsContent value="star" className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900">STAR Method Adherence</h3>
                          <div className="flex items-center gap-2">
                            <span className={`text-3xl font-bold ${getScoreColor(analysisResults.star_method.adherence_score)}`}>
                              {analysisResults.star_method.adherence_score}%
                            </span>
                            <Star className="w-6 h-6 text-yellow-600" />
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-blue-800 mb-2">What is STAR?</h4>
                          <p className="text-sm text-blue-700 mb-2">
                            STAR stands for Situation, Task, Action, Result - a format for writing impactful achievement statements.
                          </p>
                          <ul className="text-xs text-blue-600 space-y-1">
                            <li><strong>S</strong>ituation: Context/background</li>
                            <li><strong>T</strong>ask: Your responsibility/challenge</li>
                            <li><strong>A</strong>ction: What you did</li>
                            <li><strong>R</strong>esult: Measurable outcome/impact</li>
                          </ul>
                        </div>

                        {analysisResults.star_method.bullets_needing_improvement.length > 0 && (
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 className="font-semibold text-orange-800 mb-3">
                              Bullets Needing Improvement ({analysisResults.star_method.bullets_needing_improvement.length})
                            </h4>
                            <ul className="space-y-2">
                              {analysisResults.star_method.bullets_needing_improvement.map((bullet, i) => (
                                <li key={i} className="text-orange-700 text-sm bg-white p-2 rounded border border-orange-200">
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {analysisResults.star_method.star_examples.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800">STAR Format Examples</h4>
                            {analysisResults.star_method.star_examples.map((example, i) => (
                              <div key={i} className="border border-gray-200 rounded-lg p-4 bg-white">
                                <div className="mb-3">
                                  <Badge className="bg-red-100 text-red-800 mb-2">Before</Badge>
                                  <p className="text-sm text-gray-700">{example.original}</p>
                                </div>
                                <div>
                                  <Badge className="bg-green-100 text-green-800 mb-2">After (STAR)</Badge>
                                  <p className="text-sm text-gray-900 font-medium">{example.improved}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>

                      {/* Overall Summary */}
                      <TabsContent value="overall" className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Executive Summary</h3>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Award className="w-5 h-5 text-green-600" />
                            <h4 className="font-semibold text-green-800">Strengths</h4>
                          </div>
                          <ul className="space-y-2">
                            {analysisResults.overall.strengths.map((strength, i) => (
                              <li key={i} className="flex items-start gap-2 text-green-700 text-sm">
                                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold text-blue-800">Top 5 Priorities</h4>
                          </div>
                          <ol className="space-y-2">
                            {analysisResults.overall.top_priorities.map((priority, i) => (
                              <li key={i} className="flex items-start gap-3 text-blue-700 text-sm">
                                <span className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                  {i + 1}
                                </span>
                                <span className="pt-1">{priority}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {analysisResults.overall.red_flags.length > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <AlertCircle className="w-5 h-5 text-red-600" />
                              <h4 className="font-semibold text-red-800">Red Flags</h4>
                            </div>
                            <ul className="space-y-2">
                              {analysisResults.overall.red_flags.map((flag, i) => (
                                <li key={i} className="flex items-start gap-2 text-red-700 text-sm">
                                  <span className="text-red-500 mt-1">⚠</span>
                                  <span>{flag}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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