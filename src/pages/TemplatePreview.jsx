import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Plus, Palette, Type, Layout as LayoutIcon, RefreshCw, User } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import ResumeLoader from "@/components/common/ResumeLoader";

const sampleData = {
  personal_info: {
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.com",
    summary: "Experienced software engineer with a passion for building scalable web applications and leading high-performing teams. Proven track record of delivering innovative solutions and driving technical excellence."
  },
  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc",
      location: "San Francisco, CA",
      start_date: "2022-01",
      end_date: "",
      current: true,
      bullets: [
        "Led development of microservices architecture serving 1M+ daily users",
        "Improved application performance by 40% through code optimization",
        "Mentored 3 junior developers and established coding best practices"
      ]
    },
    {
      title: "Software Engineer",
      company: "StartupXYZ",
      location: "Palo Alto, CA", 
      start_date: "2020-06",
      end_date: "2021-12",
      current: false,
      bullets: [
        "Built RESTful APIs using Node.js and Express.js",
        "Implemented responsive front-end interfaces with React",
        "Collaborated with cross-functional teams in Agile environment"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      graduation_year: "2020",
      gpa: "3.8/4.0"
    }
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "Git", "MongoDB", "TypeScript", "PostgreSQL"],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Full-stack web application with user authentication, payment processing, and admin dashboard",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      link: "github.com/johndoe/ecommerce"
    }
  ]
};

const templates = {
  modern: { name: "Modern Professional", accent: "#3B82F6", secondary: "#2563EB", bgColor: "#EFF6FF" },
  creative: { name: "Creative Portfolio", accent: "#F59E0B", secondary: "#D97706", bgColor: "#FFFBEB" },
  executive: { name: "Executive Professional", accent: "#1E40AF", secondary: "#1E3A8A", bgColor: "#EFF6FF" },
  minimal: { name: "Minimal Clean", accent: "#6B7280", secondary: "#4B5563", bgColor: "#F9FAFB" },
  tech: { name: "Tech Innovator", accent: "#8B5CF6", secondary: "#7C3AED", bgColor: "#F5F3FF" },
  startup: { name: "Startup Founder", accent: "#EF4444", secondary: "#DC2626", bgColor: "#FEF2F2" },
  healthcare: { name: "Healthcare Pro", accent: "#06B6D4", secondary: "#0891B2", bgColor: "#ECFEFF" },
  academic: { name: "Academic Scholar", accent: "#7C3AED", secondary: "#6D28D9", bgColor: "#FAF5FF" },
  colorful: { name: "Colorful Impact", accent: "#EC4899", secondary: "#DB2777", bgColor: "#FDF2F8" },
  elegant: { name: "Elegant Classic", accent: "#059669", secondary: "#047857", bgColor: "#F0FDF4" },
  compact: { name: "Compact Efficient", accent: "#0891B2", secondary: "#0E7490", bgColor: "#ECFEFF" },
  sidebar: { name: "Sidebar Layout", accent: "#8B5CF6", secondary: "#7C3AED", bgColor: "#F5F3FF" }
};

export default function TemplatePreview() {
  const urlParams = new URLSearchParams(window.location.search);
  const templateId = urlParams.get('template') || 'modern';
  
  const template = templates[templateId] || templates.modern;
  
  const [resumeData, setResumeData] = useState(sampleData);
  const [isLoading, setIsLoading] = useState(true);
  const [usingUserData, setUsingUserData] = useState(false);
  const [currentAccent, setCurrentAccent] = useState(template.accent);
  const [currentSecondary, setCurrentSecondary] = useState(template.secondary);

  useEffect(() => {
    loadUserResume();
  }, []);

  const loadUserResume = async () => {
    setIsLoading(true);
    try {
      const resumes = await base44.entities.Resume.list('-updated_date', 1);
      if (resumes && resumes.length > 0) {
        const userResume = resumes[0];
        // Use user's data if available
        if (userResume.personal_info?.full_name || userResume.experience?.length > 0) {
          setResumeData({
            personal_info: userResume.personal_info || sampleData.personal_info,
            experience: userResume.experience || sampleData.experience,
            education: userResume.education || sampleData.education,
            skills: userResume.skills || sampleData.skills,
            projects: userResume.projects || sampleData.projects
          });
          setUsingUserData(true);
        }
      }
    } catch (error) {
      console.error("Error loading user resume:", error);
      // Use sample data
    }
    setIsLoading(false);
  };

  const createResumeWithTemplate = async () => {
    try {
      const newResume = await base44.entities.Resume.create({
        title: `My ${template.name} Resume`,
        template: templateId,
        customization: {
          color_scheme: currentAccent,
          secondary_color: currentSecondary,
          font_family: "inter",
          font_size: "medium",
          spacing: "comfortable",
          heading_style: "bold"
        },
        personal_info: {
          full_name: "",
          email: "",
          phone: "",
          location: "",
          summary: ""
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        sections_order: ["personal_info", "experience", "education", "skills", "projects"],
        enabled_sections: ["personal_info", "experience", "education", "skills", "projects"],
        ats_score: 0
      });
      
      window.location.href = createPageUrl(`Editor?id=${newResume.id}`);
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  const toggleDataSource = () => {
    if (usingUserData) {
      setResumeData(sampleData);
      setUsingUserData(false);
    } else {
      loadUserResume();
    }
  };

  if (isLoading) {
    return <ResumeLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-4 mb-4">
              <Link to={createPageUrl("Templates")}>
                <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{template.name}</h1>
                <p className="text-gray-600 text-sm">Live preview • Fully customizable</p>
              </div>
            </div>

            {usingUserData && (
              <div className="flex items-center gap-2 mb-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <User className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">
                  Previewing with your resume content
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleDataSource}
                  className="ml-auto text-green-700 hover:bg-green-100"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Use Sample Data
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-3 w-full lg:w-auto">
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 lg:flex-none border-blue-200 hover:bg-blue-50"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button 
                onClick={createResumeWithTemplate}
                className="flex-1 lg:flex-none bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Use Template
              </Button>
            </div>
            
            {!usingUserData && (
              <Button 
                variant="outline"
                onClick={toggleDataSource}
                className="text-sm border-blue-200 hover:bg-blue-50"
              >
                <User className="w-3 h-3 mr-2" />
                Preview with My Data
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <Card className="shadow-2xl">
              <CardContent className="p-0">
                <div 
                  className="min-h-[1000px] p-12 font-sans text-sm print:min-h-0"
                  style={{ backgroundColor: template.bgColor }}
                >
                  {/* Header */}
                  <div className="text-center mb-8 pb-6 border-b-3" style={{ borderColor: currentAccent }}>
                    <h1 className="text-4xl font-bold mb-3" style={{ color: currentAccent }}>
                      {resumeData.personal_info.full_name}
                    </h1>
                    <div className="text-gray-600 space-y-1.5 text-base">
                      <p className="flex items-center justify-center gap-2">
                        {resumeData.personal_info.email} • {resumeData.personal_info.phone}
                      </p>
                      <p>{resumeData.personal_info.location}</p>
                      <p className="text-sm">
                        {resumeData.personal_info.linkedin} • {resumeData.personal_info.website}
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: currentAccent }}>
                      <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: currentSecondary }}></div>
                      PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-[15px]">
                      {resumeData.personal_info.summary}
                    </p>
                  </section>

                  {/* Experience */}
                  <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: currentAccent }}>
                      <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: currentSecondary }}></div>
                      PROFESSIONAL EXPERIENCE
                    </h2>
                    {resumeData.experience.map((exp, i) => (
                      <div key={i} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="font-bold text-[17px]" style={{ color: currentSecondary }}>
                            {exp.title}
                          </h3>
                          <span className="text-gray-600 font-medium text-sm">
                            {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3 font-semibold text-[15px]">
                          {exp.company} • {exp.location}
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          {exp.bullets.map((bullet, bi) => (
                            <li key={bi} className="flex gap-3">
                              <span style={{ color: currentAccent }}>▪</span>
                              <span className="flex-1">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </section>

                  {/* Education */}
                  <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: currentAccent }}>
                      <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: currentSecondary }}></div>
                      EDUCATION
                    </h2>
                    {resumeData.education.map((edu, i) => (
                      <div key={i} className="mb-4 last:mb-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-[16px]" style={{ color: currentSecondary }}>
                            {edu.degree}
                          </h3>
                          <span className="text-gray-600 font-medium text-sm">{edu.graduation_year}</span>
                        </div>
                        <p className="text-gray-700">
                          {edu.institution} • {edu.location}
                        </p>
                        {edu.gpa && (
                          <p className="text-gray-600 text-sm mt-1">GPA: {edu.gpa}</p>
                        )}
                      </div>
                    ))}
                  </section>

                  {/* Skills */}
                  <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: currentAccent }}>
                      <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: currentSecondary }}></div>
                      TECHNICAL SKILLS
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-1.5 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: `${currentAccent}20`,
                            color: currentSecondary
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Projects */}
                  {resumeData.projects.length > 0 && (
                    <section>
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: currentAccent }}>
                        <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: currentSecondary }}></div>
                        PROJECTS
                      </h2>
                      {resumeData.projects.map((project, i) => (
                        <div key={i} className="mb-4 last:mb-0">
                          <h3 className="font-bold text-[16px] mb-2" style={{ color: currentSecondary }}>
                            {project.name}
                          </h3>
                          <p className="text-gray-700 mb-2">{project.description}</p>
                          <p className="text-gray-600 text-sm">
                            <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                          </p>
                        </div>
                      ))}
                    </section>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Customization Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  Quick Customize
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Primary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={currentAccent}
                        onChange={(e) => setCurrentAccent(e.target.value)}
                        className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={currentAccent}
                        onChange={(e) => setCurrentAccent(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Secondary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={currentSecondary}
                        onChange={(e) => setCurrentSecondary(e.target.value)}
                        className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={currentSecondary}
                        onChange={(e) => setCurrentSecondary(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCurrentAccent(template.accent);
                      setCurrentSecondary(template.secondary);
                    }}
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Colors
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-sm text-blue-900 mb-2">
                    💡 Customization Tip
                  </h4>
                  <p className="text-xs text-blue-700">
                    Colors are just the beginning! Once you create your resume, you'll have access to full customization: fonts, spacing, layouts, and more.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    Features
                  </Badge>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Palette className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">9 color presets + custom colors</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Type className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">6 professional font families</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <LayoutIcon className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">Flexible section ordering</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Download className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span className="text-gray-700">Export to PDF & DOCX</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}