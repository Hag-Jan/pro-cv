import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Sparkles, Download, Save, RefreshCw, Copy, Check, Zap, Target, Mail, Eye, Wand2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeLoader from "@/components/common/ResumeLoader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tones = [
  { 
    value: "professional", 
    label: "Professional", 
    desc: "Balanced and business-appropriate",
    icon: "💼",
    example: "Formal yet personable, suitable for most industries"
  },
  { 
    value: "enthusiastic", 
    label: "Enthusiastic", 
    desc: "Shows excitement and passion",
    icon: "🚀",
    example: "Energetic and motivated, great for startups"
  },
  { 
    value: "confident", 
    label: "Confident", 
    desc: "Assertive and self-assured",
    icon: "💪",
    example: "Strong and bold, ideal for leadership roles"
  },
  { 
    value: "friendly", 
    label: "Friendly", 
    desc: "Warm and approachable",
    icon: "😊",
    example: "Personable and engaging, good for creative fields"
  },
  { 
    value: "formal", 
    label: "Formal", 
    desc: "Traditional and conservative",
    icon: "🎩",
    example: "Highly professional, perfect for corporate/legal"
  }
];

export default function CoverLetterGenerator() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedTone, setSelectedTone] = useState("professional");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [highlightedSkills, setHighlightedSkills] = useState([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);
  const [usedKeywords, setUsedKeywords] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedLetterId, setSavedLetterId] = useState(null);
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);
  const [activeTab, setActiveTab] = useState("generate");
  const [aiInsights, setAiInsights] = useState(null);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    setIsLoadingResumes(true);
    try {
      const data = await base44.entities.Resume.list("-updated_date");
      setResumes(data);
      if (data.length > 0) {
        setSelectedResume(data[0].id);
      }
    } catch (error) {
      console.error("Error loading resumes:", error);
    }
    setIsLoadingResumes(false);
  };

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description first");
      return;
    }

    setIsAnalyzing(true);
    try {
      const prompt = `Analyze this job description and extract:
1. Key required skills and qualifications
2. Important keywords and phrases that should appear in a cover letter
3. Company culture indicators
4. Main responsibilities
5. Soft skills mentioned or implied

JOB DESCRIPTION:
${jobDescription}

Provide structured analysis.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            keywords: { 
              type: "array", 
              items: { type: "string" },
              description: "Key terms and phrases to include"
            },
            required_skills: { 
              type: "array", 
              items: { type: "string" },
              description: "Must-have skills"
            },
            soft_skills: { 
              type: "array", 
              items: { type: "string" },
              description: "Soft skills and attributes"
            },
            company_culture: { 
              type: "string",
              description: "Insight into company culture"
            },
            focus_areas: { 
              type: "array", 
              items: { type: "string" },
              description: "Main focus areas for the cover letter"
            }
          }
        }
      });

      setSuggestedKeywords(response.keywords || []);
      setAiInsights(response);
      setActiveTab("insights");
    } catch (error) {
      console.error("Error analyzing job:", error);
      alert("Failed to analyze job description. Please try again.");
    }
    setIsAnalyzing(false);
  };

  const generateCoverLetter = async () => {
    if (!selectedResume || !jobTitle || !companyName || !jobDescription.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    try {
      const resume = resumes.find(r => r.id === selectedResume);
      
      const toneDescriptions = {
        professional: "professional and business-appropriate, balanced between formal and personable",
        enthusiastic: "enthusiastic and passionate, showing genuine excitement and energy",
        confident: "confident and assertive, emphasizing achievements with strong language",
        friendly: "warm, approachable, and personable while maintaining professionalism",
        formal: "traditional, formal, and conservative with elevated language"
      };

      const keywordInstructions = suggestedKeywords.length > 0 
        ? `\n\nIMPORTANT KEYWORDS TO NATURALLY INCORPORATE:
${suggestedKeywords.join(", ")}

Weave these keywords naturally throughout the cover letter, especially in context of the candidate's experience.`
        : "";

      const prompt = `Generate a personalized, compelling cover letter with the following details:

JOB INFORMATION:
- Position: ${jobTitle}
- Company: ${companyName}
- Job Description: ${jobDescription}

CANDIDATE INFORMATION:
- Name: ${resume.personal_info?.full_name || ""}
- Email: ${resume.personal_info?.email || ""}
- Phone: ${resume.personal_info?.phone || ""}
- Summary: ${resume.personal_info?.summary || ""}
- Skills: ${resume.skills?.join(", ") || ""}
- Experience: ${resume.experience?.map(exp => `${exp.title} at ${exp.company} (${exp.start_date} - ${exp.current ? 'Present' : exp.end_date}): ${exp.bullets?.join('; ')}`).join(" | ") || ""}
- Education: ${resume.education?.map(edu => `${edu.degree} from ${edu.institution} (${edu.graduation_year})`).join(" | ") || ""}
- Projects: ${resume.projects?.map(proj => `${proj.name}: ${proj.description}`).join(" | ") || ""}
${keywordInstructions}

REQUIREMENTS:
1. Write in a ${toneDescriptions[selectedTone]} tone
2. Address it to "Dear Hiring Manager" (or specific name if provided)
3. Open with a compelling hook that shows you researched the company and role
4. First paragraph: Why you're excited about THIS role at THIS company
5. Second paragraph: 2-3 most relevant experiences with specific achievements
6. Third paragraph: How your skills directly address their needs
7. Closing paragraph: Express enthusiasm and request next steps
8. Keep it to 3-4 paragraphs, 300-400 words maximum
9. Make it personal and authentic - avoid generic phrases
10. Use strong action verbs and quantifiable results
11. Show cultural fit and understanding of company values
12. End with a professional sign-off

Format:
[Date]
[Your Name]
[Your Contact Info]

Dear Hiring Manager,

[Body paragraphs]

Sincerely,
[Your Name]`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            cover_letter: { type: "string" },
            highlighted_skills: { 
              type: "array", 
              items: { type: "string" },
              description: "Key skills emphasized in the letter"
            },
            keywords_used: {
              type: "array",
              items: { type: "string" },
              description: "Keywords from job description that were incorporated"
            },
            match_score: {
              type: "number",
              description: "How well this letter matches the job (0-100)"
            }
          }
        }
      });

      if (response.cover_letter) {
        setGeneratedLetter(response.cover_letter);
        setHighlightedSkills(response.highlighted_skills || []);
        setUsedKeywords(response.keywords_used || []);
        setActiveTab("letter");
      }
    } catch (error) {
      console.error("Error generating cover letter:", error);
      alert("Failed to generate cover letter. Please try again.");
    }
    setIsGenerating(false);
  };

  const adjustTone = async (newTone) => {
    if (!generatedLetter) return;

    setIsAdjusting(true);
    setSelectedTone(newTone);

    try {
      const toneDescriptions = {
        professional: "professional and business-appropriate, balanced between formal and personable",
        enthusiastic: "enthusiastic and passionate, showing genuine excitement and energy",
        confident: "confident and assertive, emphasizing achievements with strong language",
        friendly: "warm, approachable, and personable while maintaining professionalism",
        formal: "traditional, formal, and conservative with elevated language"
      };

      const prompt = `Rewrite this cover letter in a ${toneDescriptions[newTone]} tone.

ORIGINAL COVER LETTER:
${generatedLetter}

REQUIREMENTS:
1. Maintain all the same key information and achievements
2. Keep the same structure and length
3. Adjust the language, word choice, and phrasing to match the ${newTone} tone
4. Preserve all specific details, numbers, and company references
5. Keep the professional format intact
6. Make sure it still sounds natural and authentic

Provide the rewritten cover letter maintaining the same format.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            cover_letter: { type: "string" }
          }
        }
      });

      if (response.cover_letter) {
        setGeneratedLetter(response.cover_letter);
      }
    } catch (error) {
      console.error("Error adjusting tone:", error);
      alert("Failed to adjust tone. Please try again.");
    }
    setIsAdjusting(false);
  };

  const saveCoverLetter = async () => {
    if (!generatedLetter) return;

    setIsSaving(true);
    try {
      const coverLetter = await base44.entities.CoverLetter.create({
        title: `${jobTitle} at ${companyName}`,
        job_title: jobTitle,
        company_name: companyName,
        job_description: jobDescription,
        resume_used: selectedResume,
        content: generatedLetter,
        tone: selectedTone,
        highlighted_skills: highlightedSkills,
        generation_date: new Date().toISOString(),
        last_edited: new Date().toISOString()
      });

      setSavedLetterId(coverLetter.id);
      alert("Cover letter saved successfully!");
    } catch (error) {
      console.error("Error saving cover letter:", error);
      alert("Failed to save cover letter. Please try again.");
    }
    setIsSaving(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const downloadLetter = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cover_Letter_${companyName}_${jobTitle}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoadingResumes) {
    return <ResumeLoader />;
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Cover Letter Generator</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Create personalized, compelling cover letters with AI analysis of your resume and target job description
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-blue-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Target className="w-5 h-5" />
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Select Resume *
                </Label>
                <Select value={selectedResume} onValueChange={setSelectedResume}>
                  <SelectTrigger className="mt-1">
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
                <p className="text-xs text-gray-500 mt-1">
                  Your experience and skills will be analyzed
                </p>
              </div>

              <div>
                <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                  Job Title *
                </Label>
                <Input
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Google Inc."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="jobDescription" className="text-sm font-medium text-gray-700">
                  Job Description *
                </Label>
                <Textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here, including requirements, responsibilities, and qualifications..."
                  rows={10}
                  className="mt-1 resize-none"
                />
              </div>

              <Button
                onClick={analyzeJobDescription}
                variant="outline"
                disabled={isAnalyzing || !jobDescription.trim()}
                className="w-full border-2 border-purple-200 hover:bg-purple-50"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Analyze Job & Get Keyword Suggestions
                  </>
                )}
              </Button>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tone & Style
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone.value}
                      onClick={() => setSelectedTone(tone.value)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedTone === tone.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{tone.icon}</span>
                        <span className="font-medium text-sm">{tone.label}</span>
                      </div>
                      <p className="text-xs text-gray-500">{tone.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={generateCoverLetter}
                disabled={isGenerating || !selectedResume || !jobTitle || !companyName || !jobDescription.trim()}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Cover Letter
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI-Powered Features
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Analyzes your resume and job description</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Extracts and incorporates key keywords</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Adjusts tone to match company culture</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Highlights your most relevant achievements</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Provides keyword suggestions before writing</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-3">
          <Card className="bg-white/80 backdrop-blur-sm border border-blue-200/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <FileText className="w-5 h-5" />
                  Your Cover Letter
                </CardTitle>
                {generatedLetter && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="border-blue-200"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadLetter}
                      className="border-blue-200"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      onClick={saveCoverLetter}
                      disabled={isSaving}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="generate">Generate</TabsTrigger>
                  <TabsTrigger value="insights" disabled={!aiInsights}>
                    AI Insights {aiInsights && <Badge className="ml-2 bg-purple-500">Ready</Badge>}
                  </TabsTrigger>
                  <TabsTrigger value="letter" disabled={!generatedLetter}>
                    Letter {generatedLetter && <Badge className="ml-2 bg-green-500">Ready</Badge>}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="generate" className="space-y-4">
                  <div className="text-center py-12">
                    <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Ready to Create
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Fill in the job details and click "Generate Cover Letter"
                    </p>
                    <div className="flex flex-col gap-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">1</div>
                        <span>Optional: Analyze job for keyword suggestions</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">2</div>
                        <span>Select tone and style</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">3</div>
                        <span>Generate personalized cover letter</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="space-y-4">
                  {aiInsights && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* Suggested Keywords */}
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Suggested Keywords ({suggestedKeywords.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {suggestedKeywords.map((keyword, index) => (
                            <Badge key={index} className="bg-purple-100 text-purple-800 border border-purple-300">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-purple-700 mt-3">
                          These keywords will be naturally incorporated into your cover letter
                        </p>
                      </div>

                      {/* Required Skills */}
                      {aiInsights.required_skills && aiInsights.required_skills.length > 0 && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-3">Required Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {aiInsights.required_skills.map((skill, index) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Soft Skills */}
                      {aiInsights.soft_skills && aiInsights.soft_skills.length > 0 && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-semibold text-green-900 mb-3">Soft Skills to Emphasize</h4>
                          <div className="flex flex-wrap gap-2">
                            {aiInsights.soft_skills.map((skill, index) => (
                              <Badge key={index} className="bg-green-100 text-green-800">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Company Culture */}
                      {aiInsights.company_culture && (
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <h4 className="font-semibold text-orange-900 mb-2">Company Culture Insight</h4>
                          <p className="text-sm text-orange-800">{aiInsights.company_culture}</p>
                        </div>
                      )}

                      {/* Focus Areas */}
                      {aiInsights.focus_areas && aiInsights.focus_areas.length > 0 && (
                        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                          <h4 className="font-semibold text-indigo-900 mb-3">Cover Letter Focus Areas</h4>
                          <ul className="space-y-2">
                            {aiInsights.focus_areas.map((area, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-indigo-800">
                                <span className="text-indigo-600 mt-0.5">•</span>
                                <span>{area}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-yellow-700" />
                        <p className="text-sm text-yellow-800">
                          These insights will be used to create a highly targeted cover letter
                        </p>
                      </div>
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="letter" className="space-y-4">
                  <AnimatePresence>
                    {generatedLetter && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-xs text-blue-600 mb-1">Skills Highlighted</div>
                            <div className="text-2xl font-bold text-blue-700">{highlightedSkills.length}</div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="text-xs text-green-600 mb-1">Keywords Used</div>
                            <div className="text-2xl font-bold text-green-700">{usedKeywords.length}</div>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="text-xs text-purple-600 mb-1">Current Tone</div>
                            <div className="text-sm font-bold text-purple-700">{tones.find(t => t.value === selectedTone)?.label}</div>
                          </div>
                        </div>

                        {/* Skills & Keywords */}
                        <div className="grid md:grid-cols-2 gap-4">
                          {highlightedSkills.length > 0 && (
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                                Highlighted Skills:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {highlightedSkills.map((skill, index) => (
                                  <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {usedKeywords.length > 0 && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <h4 className="text-sm font-semibold text-green-900 mb-2">
                                Keywords Incorporated:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {usedKeywords.map((keyword, index) => (
                                  <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Tone Adjustment */}
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Wand2 className="w-5 h-5 text-purple-600" />
                            <h4 className="font-semibold text-purple-900">
                              Adjust Tone
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {tones.map((tone) => (
                              <button
                                key={tone.value}
                                onClick={() => adjustTone(tone.value)}
                                disabled={isAdjusting || tone.value === selectedTone}
                                className={`px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                                  tone.value === selectedTone
                                    ? 'border-purple-500 bg-purple-100 text-purple-900 font-semibold'
                                    : 'border-purple-200 hover:border-purple-400 text-purple-700'
                                } ${isAdjusting ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                <span className="mr-1">{tone.icon}</span>
                                {tone.label}
                              </button>
                            ))}
                          </div>
                          {isAdjusting && (
                            <div className="mt-3 flex items-center gap-2 text-sm text-purple-700">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                              <span>Adjusting tone...</span>
                            </div>
                          )}
                        </div>

                        {/* Cover Letter Text */}
                        <div>
                          <Textarea
                            value={generatedLetter}
                            onChange={(e) => setGeneratedLetter(e.target.value)}
                            rows={28}
                            className="font-serif text-[15px] leading-relaxed resize-none"
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            onClick={generateCoverLetter}
                            className="border-blue-200 hover:bg-blue-50"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Regenerate
                          </Button>
                          <p className="text-sm text-gray-600">
                            Not happy with the result? Try regenerating or changing the tone.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}