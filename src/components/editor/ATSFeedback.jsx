import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  FileText,
  Zap,
  Award,
  Lightbulb,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

export default function ATSFeedback({ resume, onUpdateResume }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsAnalysis, setAtsAnalysis] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showJobInput, setShowJobInput] = useState(false);

  const analyzeATS = async (withJobDescription = false) => {
    setIsAnalyzing(true);
    
    try {
      const prompt = withJobDescription && jobDescription.trim() ? `
        Analyze this resume for ATS optimization and provide detailed, actionable feedback.
        
        RESUME DATA:
        Name: ${resume.personal_info?.full_name || 'Not provided'}
        Email: ${resume.personal_info?.email || 'Not provided'}
        Phone: ${resume.personal_info?.phone || 'Not provided'}
        Location: ${resume.personal_info?.location || 'Not provided'}
        Summary: ${resume.personal_info?.summary || 'Not provided'}
        
        Experience: ${JSON.stringify(resume.experience || [])}
        Education: ${JSON.stringify(resume.education || [])}
        Skills: ${resume.skills?.join(', ') || 'None listed'}
        Projects: ${JSON.stringify(resume.projects || [])}
        Certificates: ${JSON.stringify(resume.certificates || [])}
        
        TARGET JOB DESCRIPTION:
        ${jobDescription}
        
        Provide comprehensive analysis including:
        1. Overall ATS score (0-100)
        2. Category scores: contact_info, keywords, experience, formatting, skills
        3. Missing keywords from job description
        4. Suggested keywords to add
        5. Bullet point improvements (provide 3 specific examples with before/after)
        6. Structure improvements (specific actionable items)
        7. Strong points (what's working well)
        8. Critical issues (must-fix problems)
        9. Quick wins (easy improvements with high impact)
      ` : `
        Analyze this resume for ATS optimization and provide detailed, actionable feedback.
        
        RESUME DATA:
        Name: ${resume.personal_info?.full_name || 'Not provided'}
        Email: ${resume.personal_info?.email || 'Not provided'}
        Phone: ${resume.personal_info?.phone || 'Not provided'}
        Location: ${resume.personal_info?.location || 'Not provided'}
        Summary: ${resume.personal_info?.summary || 'Not provided'}
        
        Experience: ${JSON.stringify(resume.experience || [])}
        Education: ${JSON.stringify(resume.education || [])}
        Skills: ${resume.skills?.join(', ') || 'None listed'}
        Projects: ${JSON.stringify(resume.projects || [])}
        Certificates: ${JSON.stringify(resume.certificates || [])}
        
        Evaluate based on general ATS best practices including:
        1. Overall ATS score (0-100)
        2. Category scores: contact_info, keywords, experience, formatting, skills
        3. Industry-standard keywords (based on resume content)
        4. Suggested keywords to add
        5. Bullet point improvements (provide 3 specific examples with before/after)
        6. Structure improvements (specific actionable items)
        7. Strong points (what's working well)
        8. Critical issues (must-fix problems)
        9. Quick wins (easy improvements with high impact)
      `;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            overall_score: { type: "number", minimum: 0, maximum: 100 },
            category_scores: {
              type: "object",
              properties: {
                contact_info: { type: "number", minimum: 0, maximum: 100 },
                keywords: { type: "number", minimum: 0, maximum: 100 },
                experience: { type: "number", minimum: 0, maximum: 100 },
                formatting: { type: "number", minimum: 0, maximum: 100 },
                skills: { type: "number", minimum: 0, maximum: 100 }
              }
            },
            missing_keywords: { type: "array", items: { type: "string" } },
            suggested_keywords: { type: "array", items: { type: "string" } },
            bullet_improvements: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  before: { type: "string" },
                  after: { type: "string" },
                  reason: { type: "string" }
                }
              }
            },
            structure_improvements: { type: "array", items: { type: "string" } },
            strong_points: { type: "array", items: { type: "string" } },
            critical_issues: { type: "array", items: { type: "string" } },
            quick_wins: { type: "array", items: { type: "string" } }
          }
        }
      });

      setAtsAnalysis(response);
      
      // Update resume with new ATS score
      const updatedResume = { ...resume, ats_score: response.overall_score };
      onUpdateResume(updatedResume);
      
    } catch (error) {
      console.error("Error analyzing ATS:", error);
    }
    
    setIsAnalyzing(false);
  };

  const applyKeywordSuggestion = (keyword) => {
    const currentSkills = resume.skills || [];
    if (!currentSkills.includes(keyword)) {
      onUpdateResume({
        ...resume,
        skills: [...currentSkills, keyword]
      });
    }
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

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-blue-200/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Target className="w-5 h-5 text-blue-600" />
          ATS Score Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Analysis Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => analyzeATS(false)}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Target className="w-4 h-4 mr-2" />
                Analyze ATS Score
              </>
            )}
          </Button>

          <Button
            onClick={() => setShowJobInput(!showJobInput)}
            variant="outline"
            className="w-full border-blue-200 hover:bg-blue-50"
          >
            <FileText className="w-4 h-4 mr-2" />
            {showJobInput ? 'Hide' : 'Analyze Against'} Job Description
          </Button>

          {showJobInput && (
            <div className="space-y-2">
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here for targeted optimization..."
                rows={6}
                className="text-sm"
              />
              <Button
                onClick={() => analyzeATS(true)}
                disabled={isAnalyzing || !jobDescription.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze for This Job'}
              </Button>
            </div>
          )}
        </div>

        {/* Analysis Results */}
        {atsAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mt-6"
          >
            {/* Overall Score */}
            <div className={`p-4 rounded-lg ${getScoreBgColor(atsAnalysis.overall_score)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">Overall ATS Score</span>
                <span className={`text-2xl font-bold ${getScoreColor(atsAnalysis.overall_score)}`}>
                  {atsAnalysis.overall_score}%
                </span>
              </div>
              <Progress value={atsAnalysis.overall_score} className="h-2" />
            </div>

            {/* Category Scores */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 text-sm">Category Breakdown</h4>
              {Object.entries(atsAnalysis.category_scores || {}).map(([category, score]) => (
                <div key={category} className="flex items-center justify-between text-sm">
                  <span className="capitalize text-gray-700">
                    {category.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Progress value={score} className="w-24 h-1.5" />
                    <span className={`font-medium ${getScoreColor(score)} w-10 text-right`}>
                      {score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Critical Issues */}
            {atsAnalysis.critical_issues?.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900">Critical Issues</h4>
                    <p className="text-xs text-red-700">Fix these immediately for better ATS performance</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {atsAnalysis.critical_issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-red-800">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Wins */}
            {atsAnalysis.quick_wins?.length > 0 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Zap className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">Quick Wins</h4>
                    <p className="text-xs text-green-700">Easy improvements with high impact</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {atsAnalysis.quick_wins.map((win, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-green-800">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {win}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Keyword Suggestions */}
            {atsAnalysis.suggested_keywords?.length > 0 && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900">Suggested Keywords</h4>
                    <p className="text-xs text-blue-700">Add these to improve keyword match</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {atsAnalysis.suggested_keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors"
                      onClick={() => applyKeywordSuggestion(keyword)}
                    >
                      {keyword}
                      <span className="ml-1 text-xs">+</span>
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-blue-600 mt-2">Click to add to skills section</p>
              </div>
            )}

            {/* Missing Keywords */}
            {atsAnalysis.missing_keywords?.length > 0 && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-orange-900">Missing Keywords</h4>
                    <p className="text-xs text-orange-700">From job description</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {atsAnalysis.missing_keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-orange-300 text-orange-700"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Bullet Point Improvements */}
            {atsAnalysis.bullet_improvements?.length > 0 && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-purple-900">Bullet Point Improvements</h4>
                    <p className="text-xs text-purple-700">Rephrase for better impact</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {atsAnalysis.bullet_improvements.map((improvement, index) => (
                    <div key={index} className="space-y-2">
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="text-xs text-gray-500 mb-1">❌ Before:</p>
                        <p className="text-sm text-gray-700">{improvement.before}</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-purple-300">
                        <p className="text-xs text-green-600 mb-1">✅ After:</p>
                        <p className="text-sm text-gray-900 font-medium">{improvement.after}</p>
                      </div>
                      <p className="text-xs text-purple-700 italic">
                        💡 {improvement.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Structure Improvements */}
            {atsAnalysis.structure_improvements?.length > 0 && (
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-indigo-900">Structure Improvements</h4>
                    <p className="text-xs text-indigo-700">Optimize resume organization</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {atsAnalysis.structure_improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-indigo-800">
                      <span className="text-indigo-600 font-bold">•</span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Strong Points */}
            {atsAnalysis.strong_points?.length > 0 && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Award className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-emerald-900">Strong Points</h4>
                    <p className="text-xs text-emerald-700">What you're doing well</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {atsAnalysis.strong_points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-emerald-800">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}