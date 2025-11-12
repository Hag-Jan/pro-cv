
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Sparkles,
  FileText,
  Zap,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Info,
  Plus,
  Minus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Keyword extraction utility
const extractKeywords = (text) => {
  if (!text) return [];
  
  // Common stop words to ignore
  const stopWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
    'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go',
    'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
    'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them',
    'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
    'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first',
    'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day',
    'most', 'us', 'is', 'was', 'are', 'been', 'has', 'had', 'were', 'said', 'did',
    'having', 'may', 'should', 'must', 'might', 'shall', 'can', 'could', 'would'
  ]);
  
  // Extract words (alphanumeric, including +, #, .)
  const words = text.toLowerCase()
    .replace(/[^\w\s+#.]/g, ' ')
    .split(/\s+/)
    .filter(word => 
      word.length > 2 && 
      !stopWords.has(word) &&
      !/^\d+$/.test(word) // Not just numbers
    );
  
  // Count frequency
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([word]) => word);
};

// Extract resume text
const extractResumeText = (resume) => {
  let text = '';
  
  // Personal info
  if (resume.personal_info) {
    text += `${resume.personal_info.full_name || ''} `;
    text += `${resume.personal_info.professional_title || ''} `;
    text += `${resume.personal_info.summary || ''} `;
  }
  
  // Experience
  if (resume.experience) {
    resume.experience.forEach(exp => {
      text += `${exp.title || ''} `;
      text += `${exp.company || ''} `;
      if (exp.bullets) {
        text += exp.bullets.join(' ') + ' ';
      }
    });
  }
  
  // Education
  if (resume.education) {
    resume.education.forEach(edu => {
      text += `${edu.degree || ''} `;
      text += `${edu.institution || ''} `;
    });
  }
  
  // Skills
  if (resume.skills) {
    text += resume.skills.join(' ') + ' ';
  }
  
  // Projects
  if (resume.projects) {
    resume.projects.forEach(proj => {
      text += `${proj.name || ''} `;
      text += `${proj.description || ''} `;
      if (proj.technologies) {
        text += proj.technologies.join(' ') + ' ';
      }
    });
  }
  
  // Certificates
  if (resume.certificates) {
    resume.certificates.forEach(cert => {
      text += `${cert.name || ''} `;
    });
  }
  
  return text;
};

// Calculate ATS score
const calculateATSScore = (resumeKeywords, jobKeywords) => {
  if (!jobKeywords || jobKeywords.length === 0) return 0;
  
  const resumeSet = new Set(resumeKeywords.map(k => k.toLowerCase()));
  const matchedKeywords = jobKeywords.filter(keyword => 
    resumeSet.has(keyword.toLowerCase())
  );
  
  const matchRate = matchedKeywords.length / jobKeywords.length;
  
  // Score calculation: 
  // - Base score from keyword match (0-70%)
  // - Bonus for high match rate (0-30%)
  const baseScore = Math.round(matchRate * 70);
  const bonusScore = matchRate > 0.7 ? Math.round((matchRate - 0.7) * 100) : 0;
  
  return Math.min(baseScore + bonusScore, 100);
};

export default function ATSAnalyzer({ resume, onUpdateResume }) {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showJobInput, setShowJobInput] = useState(true);
  const [showMatched, setShowMatched] = useState(true);
  const [showMissing, setShowMissing] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Auto-analyze when resume changes (debounced)
  useEffect(() => {
    if (jobDescription && analysisResult) {
      const timer = setTimeout(() => {
        analyzeResume();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resume]);

  const analyzeResume = async () => {
    if (!jobDescription.trim()) {
      alert('Please paste a job description first.');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Extract keywords from job description and resume
      const jobKeywords = extractKeywords(jobDescription);
      const resumeText = extractResumeText(resume);
      const resumeKeywords = extractKeywords(resumeText);
      
      // Calculate basic score
      const score = calculateATSScore(resumeKeywords, jobKeywords);
      
      // Find matched and missing keywords
      const resumeSet = new Set(resumeKeywords.map(k => k.toLowerCase()));
      const matchedKeywords = jobKeywords.filter(keyword => 
        resumeSet.has(keyword.toLowerCase())
      );
      const missingKeywords = jobKeywords
        .filter(keyword => !resumeSet.has(keyword.toLowerCase()))
        .slice(0, 20); // Top 20 missing
      
      // Get AI-powered suggestions
      const aiAnalysis = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze this resume against the job description and provide specific, actionable suggestions to improve ATS compatibility.

Job Description:
${jobDescription.substring(0, 2000)}

Resume Summary:
- Name: ${resume.personal_info?.full_name || 'Not provided'}
- Current Title: ${resume.personal_info?.professional_title || 'Not provided'}
- Summary: ${resume.personal_info?.summary || 'Not provided'}
- Skills: ${resume.skills?.join(', ') || 'Not provided'}
- Experience: ${resume.experience?.length || 0} positions
- Education: ${resume.education?.length || 0} degrees

Current ATS Score: ${score}/100
Missing Keywords: ${missingKeywords.slice(0, 10).join(', ')}

Provide 5-7 specific, actionable suggestions to improve the ATS score. Focus on:
1. Keywords to add
2. Skills to highlight
3. Experience bullets to strengthen
4. Summary improvements
5. Formatting recommendations`,
        response_json_schema: {
          type: "object",
          properties: {
            suggestions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  priority: { type: "string", enum: ["high", "medium", "low"] },
                  section: { type: "string" }
                }
              }
            },
            overall_feedback: { type: "string" }
          }
        }
      });
      
      setAnalysisResult({
        score,
        matchedKeywords: matchedKeywords.slice(0, 30),
        missingKeywords,
        suggestions: aiAnalysis.suggestions || [],
        overallFeedback: aiAnalysis.overall_feedback || '',
        timestamp: Date.now()
      });
      
      setShowJobInput(false);
      
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback to basic analysis without AI
      const jobKeywords = extractKeywords(jobDescription);
      const resumeText = extractResumeText(resume);
      const resumeKeywords = extractKeywords(resumeText);
      const score = calculateATSScore(resumeKeywords, jobKeywords);
      
      const resumeSet = new Set(resumeKeywords.map(k => k.toLowerCase()));
      const matchedKeywords = jobKeywords.filter(keyword => 
        resumeSet.has(keyword.toLowerCase())
      );
      const missingKeywords = jobKeywords
        .filter(keyword => !resumeSet.has(keyword.toLowerCase()))
        .slice(0, 20);
      
      setAnalysisResult({
        score,
        matchedKeywords: matchedKeywords.slice(0, 30),
        missingKeywords,
        suggestions: [
          {
            title: "Add Missing Keywords",
            description: `Include these important keywords from the job description: ${missingKeywords.slice(0, 5).join(', ')}`,
            priority: "high",
            section: "skills"
          },
          {
            title: "Strengthen Your Summary",
            description: "Update your professional summary to include key terms from the job description.",
            priority: "high",
            section: "personal_info"
          },
          {
            title: "Quantify Achievements",
            description: "Add specific numbers and metrics to your experience bullets (e.g., 'increased by 40%', 'managed team of 10').",
            priority: "medium",
            section: "experience"
          }
        ],
        overallFeedback: score >= 80 ? 'Great match! Your resume aligns well with this job description.' : score >= 60 ? 'Good foundation, but needs some improvements to better match the job requirements.' : 'Significant improvements needed to match this job description.',
        timestamp: Date.now()
      });
      
      setShowJobInput(false);
    }
    
    setIsAnalyzing(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Needs Improvement';
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const addKeywordToSkills = (keyword) => {
    if (!resume.skills) return;
    const skills = [...resume.skills];
    const formattedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    if (!skills.some(s => s.toLowerCase() === keyword.toLowerCase())) {
      skills.push(formattedKeyword);
      onUpdateResume('skills', skills);
    }
  };

  return (
    <div className="space-y-3">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none">
        <CardHeader className="pb-3 p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">ATS Compatibility Analyzer</CardTitle>
              <p className="text-blue-100 text-sm mt-1">
                Optimize your resume for Applicant Tracking Systems
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Job Description Input */}
      <AnimatePresence>
        {showJobInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Paste Job Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4 md:p-6 pt-0">
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here...&#10;&#10;Include:&#10;• Job title&#10;• Required skills&#10;• Responsibilities&#10;• Qualifications&#10;• Experience requirements"
                  className="min-h-[200px] text-sm"
                />
                
                <div className="flex gap-2">
                  <Button
                    onClick={analyzeResume}
                    disabled={isAnalyzing || !jobDescription.trim()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze Resume
                      </>
                    )}
                  </Button>
                  
                  {analysisResult && (
                    <Button
                      variant="outline"
                      onClick={() => setShowJobInput(false)}
                    >
                      Show Results
                    </Button>
                  )}
                </div>
                
                {jobDescription && (
                  <p className="text-xs text-gray-500">
                    {jobDescription.length} characters • {jobDescription.split(/\s+/).length} words
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Results */}
      {analysisResult && !showJobInput && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {/* Score Card */}
          <Card className="border-2" style={{ borderColor: getScoreColor(analysisResult.score) }}>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {analysisResult.score}%
                  </h3>
                  <p className="text-sm font-medium" style={{ color: getScoreColor(analysisResult.score) }}>
                    {getScoreLabel(analysisResult.score)}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowJobInput(true)}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Edit Job
                  </Button>
                  <Button
                    size="sm"
                    onClick={analyzeResume}
                    disabled={isAnalyzing}
                    className="bg-blue-600"
                  >
                    {isAnalyzing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Progress 
                value={analysisResult.score} 
                className="h-3 mb-3"
                style={{
                  '--progress-background': getScoreColor(analysisResult.score)
                }}
              />
              
              {analysisResult.overallFeedback && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <p className="text-sm text-blue-900">{analysisResult.overallFeedback}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Matched Keywords */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors p-4 md:p-6"
              onClick={() => setShowMatched(!showMatched)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Matched Keywords ({analysisResult.matchedKeywords.length})
                </CardTitle>
                {showMatched ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </CardHeader>
            
            <AnimatePresence>
              {showMatched && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <CardContent className="p-4 md:p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.matchedKeywords.map((keyword, idx) => (
                        <Badge key={idx} className="bg-green-100 text-green-800 border border-green-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    {analysisResult.matchedKeywords.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No keywords matched. Add relevant skills and experience from the job description.
                      </p>
                    )}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Missing Keywords */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors p-4 md:p-6"
              onClick={() => setShowMissing(!showMissing)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Missing Keywords ({analysisResult.missingKeywords.length})
                </CardTitle>
                {showMissing ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </CardHeader>
            
            <AnimatePresence>
              {showMissing && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <CardContent className="p-4 md:p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.missingKeywords.map((keyword, idx) => (
                        <Badge 
                          key={idx} 
                          className="bg-orange-100 text-orange-800 border border-orange-200 cursor-pointer hover:bg-orange-200 transition-colors"
                          onClick={() => addKeywordToSkills(keyword)}
                          title="Click to add to skills"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    {analysisResult.missingKeywords.length > 0 && (
                      <p className="text-xs text-gray-500 mt-3 flex items-start gap-1">
                        <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>Click a keyword to quickly add it to your skills section.</span>
                      </p>
                    )}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* AI Suggestions */}
          {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
            <Card>
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors p-4 md:p-6"
                onClick={() => setShowSuggestions(!showSuggestions)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    AI-Powered Suggestions ({analysisResult.suggestions.length})
                  </CardTitle>
                  {showSuggestions ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent className="p-4 md:p-6 pt-0">
                      <div className="space-y-3">
                        {analysisResult.suggestions.map((suggestion, idx) => (
                          <div
                            key={idx}
                            className="border rounded-lg p-3 hover:border-blue-300 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-sm text-gray-900">
                                    {suggestion.title}
                                  </h4>
                                  <Badge className={`text-xs ${getPriorityColor(suggestion.priority)}`}>
                                    {suggestion.priority}
                                  </Badge>
                                  {suggestion.section && (
                                    <Badge variant="outline" className="text-xs">
                                      {suggestion.section}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {suggestion.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          )}
        </motion.div>
      )}

      {/* Empty State */}
      {!analysisResult && !showJobInput && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="p-4 md:p-8 text-center">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Analysis Yet
            </h3>
            <p className="text-sm text-gray-600 mb-3 md:mb-4">
              Paste a job description to see how well your resume matches
            </p>
            <Button onClick={() => setShowJobInput(true)}>
              <FileText className="w-4 h-4 mr-2" />
              Add Job Description
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
