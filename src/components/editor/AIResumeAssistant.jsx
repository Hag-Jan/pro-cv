import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Sparkles, Wand2, RefreshCw, Copy, Check, Zap, Target, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIResumeAssistant({ 
  isOpen, 
  onClose, 
  onApply,
  currentSection,
  currentData,
  fullResume 
}) {
  const [mode, setMode] = useState('generate'); // generate, enhance, bullets
  const [jobDescription, setJobDescription] = useState('');
  const [experienceKeywords, setExperienceKeywords] = useState('');
  const [currentContent, setCurrentContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateCompleteResume = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description');
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `You are an expert resume writer. Based on the following job description, create a complete professional resume draft.

JOB DESCRIPTION:
${jobDescription}

ADDITIONAL CONTEXT:
${experienceKeywords ? `User's experience keywords: ${experienceKeywords}` : 'Create a general professional resume'}

Create a comprehensive resume with the following sections:

1. PROFESSIONAL SUMMARY: 3-4 sentences highlighting key strengths and achievements relevant to this role
2. WORK EXPERIENCE: 2-3 relevant positions with company names, job titles, dates (use realistic timeframes), and 4-5 bullet points each using STAR method (Situation, Task, Action, Result) with quantifiable achievements
3. EDUCATION: Relevant degree(s) with institution names and graduation years
4. SKILLS: 10-15 relevant technical and soft skills for this role
5. PROJECTS: 2-3 relevant projects with descriptions and technologies used

Make it ATS-optimized with keywords from the job description. Use strong action verbs and quantify achievements where possible.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: false,
        response_json_schema: {
          type: "object",
          properties: {
            personal_info: {
              type: "object",
              properties: {
                full_name: { type: "string" },
                professional_title: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                location: { type: "string" },
                summary: { type: "string" }
              }
            },
            experience: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  company: { type: "string" },
                  location: { type: "string" },
                  start_date: { type: "string" },
                  end_date: { type: "string" },
                  current: { type: "boolean" },
                  bullets: { type: "array", items: { type: "string" } }
                }
              }
            },
            education: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  degree: { type: "string" },
                  institution: { type: "string" },
                  location: { type: "string" },
                  graduation_year: { type: "string" },
                  gpa: { type: "string" }
                }
              }
            },
            skills: {
              type: "array",
              items: { type: "string" }
            },
            projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  technologies: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      });

      setGeneratedContent(response);
    } catch (error) {
      console.error("Error generating resume:", error);
      alert("Failed to generate resume. Please try again.");
    }
    setIsGenerating(false);
  };

  const enhanceContent = async () => {
    if (!currentContent.trim()) {
      alert('Please enter content to enhance');
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `You are an expert resume writer. Enhance the following resume content to make it more impactful, professional, and ATS-optimized.

CURRENT CONTENT:
${currentContent}

${jobDescription ? `TARGET JOB:\n${jobDescription}\n` : ''}

Improve this content by:
1. Using stronger action verbs (Led, Spearheaded, Implemented, Optimized, etc.)
2. Adding quantifiable achievements where possible (percentages, numbers, metrics)
3. Making it more concise and impactful
4. Ensuring it's ATS-friendly with relevant keywords
5. Following the STAR method for experience bullets (Situation, Task, Action, Result)

Return the enhanced version that's ready to use in a professional resume.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: false,
        response_json_schema: {
          type: "object",
          properties: {
            enhanced_content: { type: "string" },
            improvements_made: { 
              type: "array", 
              items: { type: "string" } 
            },
            keywords_added: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      setGeneratedContent(response);
    } catch (error) {
      console.error("Error enhancing content:", error);
      alert("Failed to enhance content. Please try again.");
    }
    setIsGenerating(false);
  };

  const generateBullets = async () => {
    if (!currentContent.trim()) {
      alert('Please describe your role or responsibilities');
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `You are an expert resume writer. Based on the following job role/responsibilities, create 5-7 powerful bullet points using the STAR method.

ROLE DESCRIPTION:
${currentContent}

${jobDescription ? `TARGET JOB:\n${jobDescription}\n` : ''}

Create bullet points that:
1. Start with strong action verbs (Led, Developed, Implemented, Achieved, etc.)
2. Include quantifiable results (%, $, numbers)
3. Follow STAR format (Situation, Task, Action, Result)
4. Are concise (1-2 lines each)
5. Highlight achievements, not just duties
6. Include relevant keywords for ATS

Each bullet should demonstrate impact and value.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: false,
        response_json_schema: {
          type: "object",
          properties: {
            bullets: {
              type: "array",
              items: { type: "string" }
            },
            impact_score: { type: "number" },
            tips: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      setGeneratedContent(response);
    } catch (error) {
      console.error("Error generating bullets:", error);
      alert("Failed to generate bullet points. Please try again.");
    }
    setIsGenerating(false);
  };

  const generateSummary = async () => {
    const experience = fullResume?.experience || [];
    const skills = fullResume?.skills || [];
    
    setIsGenerating(true);
    try {
      const prompt = `You are an expert resume writer. Create a compelling professional summary based on the following information.

${jobDescription ? `TARGET JOB:\n${jobDescription}\n` : ''}

${experience.length > 0 ? `EXPERIENCE:\n${experience.map(exp => `${exp.title} at ${exp.company}`).join('\n')}\n` : ''}

${skills.length > 0 ? `SKILLS:\n${skills.join(', ')}\n` : ''}

${experienceKeywords ? `KEYWORDS:\n${experienceKeywords}\n` : ''}

Create a professional summary that:
1. Is 3-4 sentences (60-80 words)
2. Highlights key strengths and years of experience
3. Includes relevant keywords for ATS
4. Shows unique value proposition
5. Is tailored to the target role
6. Uses active voice and strong descriptors

The summary should immediately grab attention and make the candidate stand out.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: false,
        response_json_schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            key_strengths: {
              type: "array",
              items: { type: "string" }
            },
            keywords_used: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      setGeneratedContent(response);
    } catch (error) {
      console.error("Error generating summary:", error);
      alert("Failed to generate summary. Please try again.");
    }
    setIsGenerating(false);
  };

  const generateSkills = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description to generate relevant skills');
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `You are an expert resume writer. Based on the following job description, suggest 15-20 relevant skills.

JOB DESCRIPTION:
${jobDescription}

EXISTING SKILLS:
${fullResume?.skills?.join(', ') || 'None'}

Suggest skills that:
1. Are directly relevant to the job requirements
2. Include both technical and soft skills
3. Are ATS-optimized (match job posting keywords)
4. Are commonly searched by recruiters
5. Range from core competencies to specialized tools
6. Include industry-standard technologies

Categorize them as: Technical Skills, Soft Skills, Tools & Technologies`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: false,
        response_json_schema: {
          type: "object",
          properties: {
            technical_skills: {
              type: "array",
              items: { type: "string" }
            },
            soft_skills: {
              type: "array",
              items: { type: "string" }
            },
            tools_technologies: {
              type: "array",
              items: { type: "string" }
            },
            priority_skills: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      setGeneratedContent(response);
    } catch (error) {
      console.error("Error generating skills:", error);
      alert("Failed to generate skills. Please try again.");
    }
    setIsGenerating(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyContent = () => {
    if (generatedContent) {
      onApply(generatedContent);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI Resume Assistant
          </DialogTitle>
          <DialogDescription>
            Generate professional resume content powered by AI
          </DialogDescription>
        </DialogHeader>

        <Tabs value={mode} onValueChange={setMode} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="generate" className="text-xs md:text-sm">
              <Zap className="w-4 h-4 mr-1" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="enhance" className="text-xs md:text-sm">
              <Wand2 className="w-4 h-4 mr-1" />
              Enhance
            </TabsTrigger>
            <TabsTrigger value="bullets" className="text-xs md:text-sm">
              <Target className="w-4 h-4 mr-1" />
              Bullets
            </TabsTrigger>
            <TabsTrigger value="sections" className="text-xs md:text-sm">
              <FileText className="w-4 h-4 mr-1" />
              Sections
            </TabsTrigger>
          </TabsList>

          {/* GENERATE COMPLETE RESUME */}
          <TabsContent value="generate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Complete Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Job Description *
                  </label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here...&#10;&#10;Include:&#10;• Job title and requirements&#10;• Required skills&#10;• Responsibilities&#10;• Qualifications"
                    rows={8}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your Experience Keywords (Optional)
                  </label>
                  <Input
                    value={experienceKeywords}
                    onChange={(e) => setExperienceKeywords(e.target.value)}
                    placeholder="e.g., Senior Developer, 5 years Python, Led team of 8, AWS, Machine Learning..."
                    className="text-sm"
                  />
                </div>

                <Button
                  onClick={generateCompleteResume}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Your Resume...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Complete Resume
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Display Generated Complete Resume */}
            {generatedContent && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700">
                      Generated Resume Draft
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Personal Info */}
                    {generatedContent.personal_info && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Personal Information</h3>
                        <p className="text-sm text-gray-700">
                          <strong>Name:</strong> {generatedContent.personal_info.full_name}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Title:</strong> {generatedContent.personal_info.professional_title}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">
                          <strong>Summary:</strong> {generatedContent.personal_info.summary}
                        </p>
                      </div>
                    )}

                    {/* Experience */}
                    {generatedContent.experience && generatedContent.experience.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Work Experience</h3>
                        <div className="space-y-3">
                          {generatedContent.experience.map((exp, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-medium">{exp.title} at {exp.company}</p>
                              <p className="text-xs text-gray-600">{exp.start_date} - {exp.end_date}</p>
                              <ul className="list-disc list-inside mt-2 space-y-1">
                                {exp.bullets.map((bullet, bidx) => (
                                  <li key={bidx} className="text-sm">{bullet}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {generatedContent.skills && generatedContent.skills.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleApplyContent} className="flex-1 bg-purple-600">
                        <Check className="w-4 h-4 mr-2" />
                        Apply to Resume
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setGeneratedContent(null)}
                      >
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* ENHANCE EXISTING CONTENT */}
          <TabsContent value="enhance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Enhance Existing Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Current Content *
                  </label>
                  <Textarea
                    value={currentContent}
                    onChange={(e) => setCurrentContent(e.target.value)}
                    placeholder="Paste the content you want to improve...&#10;&#10;Examples:&#10;• Job description&#10;• Bullet points&#10;• Professional summary&#10;• Project description"
                    rows={6}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Target Job (Optional)
                  </label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job description to tailor the enhancement..."
                    rows={4}
                    className="text-sm"
                  />
                </div>

                <Button
                  onClick={enhanceContent}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Enhancing Content...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Enhance Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Display Enhanced Content */}
            {generatedContent && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 flex items-center justify-between">
                      Enhanced Content
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(generatedContent.enhanced_content)}
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">
                        {generatedContent.enhanced_content}
                      </p>
                    </div>

                    {generatedContent.improvements_made && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Improvements Made:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {generatedContent.improvements_made.map((imp, idx) => (
                            <li key={idx} className="text-sm text-gray-700">{imp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {generatedContent.keywords_added && generatedContent.keywords_added.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Keywords Added:</h4>
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.keywords_added.map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedContent.enhanced_content);
                        onClose();
                      }}
                      className="w-full bg-blue-600"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy & Close
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* GENERATE BULLET POINTS */}
          <TabsContent value="bullets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Bullet Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Describe Your Role/Responsibilities *
                  </label>
                  <Textarea
                    value={currentContent}
                    onChange={(e) => setCurrentContent(e.target.value)}
                    placeholder="Describe what you did in this role...&#10;&#10;Example:&#10;• Managed a team of developers&#10;• Built web applications&#10;• Improved system performance&#10;• Collaborated with stakeholders"
                    rows={6}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Target Job (Optional)
                  </label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job description to align bullet points..."
                    rows={3}
                    className="text-sm"
                  />
                </div>

                <Button
                  onClick={generateBullets}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Bullets...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Generate Bullet Points
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Display Generated Bullets */}
            {generatedContent && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700">
                      Generated Bullet Points
                      {generatedContent.impact_score && (
                        <Badge className="ml-2 bg-green-600">
                          Impact Score: {generatedContent.impact_score}/10
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {generatedContent.bullets?.map((bullet, idx) => (
                        <li key={idx} className="bg-green-50 p-3 rounded-lg flex items-start gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span className="text-sm flex-1">{bullet}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopy(bullet)}
                          >
                            {copied ? (
                              <Check className="w-3 h-3 text-green-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </li>
                      ))}
                    </ul>

                    {generatedContent.tips && generatedContent.tips.length > 0 && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">💡 Tips:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {generatedContent.tips.map((tip, idx) => (
                            <li key={idx} className="text-xs text-gray-700">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button
                      onClick={() => {
                        const bulletsText = generatedContent.bullets.join('\n');
                        navigator.clipboard.writeText(bulletsText);
                        onClose();
                      }}
                      className="w-full bg-green-600"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy All & Close
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* GENERATE SPECIFIC SECTIONS */}
          <TabsContent value="sections" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-3">
              {/* Generate Summary */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={generateSummary}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Professional Summary</h3>
                      <p className="text-xs text-gray-600">Generate compelling summary</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Generate Skills */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={generateSkills}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Skills Suggestions</h3>
                      <p className="text-xs text-gray-600">Get relevant skills list</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Job Description Input for Sections */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <label className="text-sm font-medium block">
                  Job Description (for better results)
                </label>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job description..."
                  rows={4}
                  className="text-sm"
                />
                <Input
                  value={experienceKeywords}
                  onChange={(e) => setExperienceKeywords(e.target.value)}
                  placeholder="Your experience keywords..."
                  className="text-sm"
                />
              </CardContent>
            </Card>

            {/* Display Generated Section Content */}
            {generatedContent && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Generated Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Summary */}
                    {generatedContent.summary && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Professional Summary</h4>
                        <p className="text-sm">{generatedContent.summary}</p>
                        
                        {generatedContent.key_strengths && (
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-600 mb-1">Key Strengths:</p>
                            <div className="flex flex-wrap gap-1">
                              {generatedContent.key_strengths.map((strength, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {strength}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Skills */}
                    {generatedContent.technical_skills && (
                      <div>
                        <h4 className="font-semibold mb-3">Recommended Skills</h4>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-2">Technical Skills:</p>
                            <div className="flex flex-wrap gap-2">
                              {generatedContent.technical_skills.map((skill, idx) => (
                                <Badge key={idx} className="bg-blue-600">{skill}</Badge>
                              ))}
                            </div>
                          </div>

                          {generatedContent.soft_skills && (
                            <div>
                              <p className="text-xs font-medium text-gray-600 mb-2">Soft Skills:</p>
                              <div className="flex flex-wrap gap-2">
                                {generatedContent.soft_skills.map((skill, idx) => (
                                  <Badge key={idx} className="bg-green-600">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {generatedContent.tools_technologies && (
                            <div>
                              <p className="text-xs font-medium text-gray-600 mb-2">Tools & Technologies:</p>
                              <div className="flex flex-wrap gap-2">
                                {generatedContent.tools_technologies.map((skill, idx) => (
                                  <Badge key={idx} className="bg-purple-600">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => {
                        let textToCopy = '';
                        if (generatedContent.summary) {
                          textToCopy = generatedContent.summary;
                        } else if (generatedContent.technical_skills) {
                          textToCopy = [
                            ...generatedContent.technical_skills,
                            ...(generatedContent.soft_skills || []),
                            ...(generatedContent.tools_technologies || [])
                          ].join(', ');
                        }
                        navigator.clipboard.writeText(textToCopy);
                        onClose();
                      }}
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy & Close
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {isGenerating && (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}