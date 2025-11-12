import React from "react";
import { Mail, Phone, MapPin, Globe, Briefcase, Award, GraduationCap } from "lucide-react";

export default function DoubleColumnPro({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#3B82F6";
  const secondaryColor = customization.secondary_color || "#2563EB";
  const backgroundColor = customization.background_color || "#FFFFFF";
  const fontFamily = customization.font_family || "Inter, system-ui, sans-serif";
  const lineHeight = customization.line_height || 1.6;

  const personal = resume.personal_info || {
    full_name: "Ethan Smith",
    professional_title: "Chief Experience Officer",
    email: "ethan.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/ethansmith",
    summary: "Accomplished Chief Experience Officer with 15+ years driving customer-centric transformation."
  };

  const experience = resume.experience?.length > 0 ? resume.experience : [
    {
      title: "Chief Experience Officer",
      company: "TerraInnovate Solutions",
      location: "San Francisco, CA",
      start_date: "2020-01",
      current: true,
      bullets: [
        "Led company-wide digital transformation initiative, resulting in 40% improvement in customer satisfaction scores",
        "Managed cross-functional team of 35+ professionals across customer service, product, and marketing departments"
      ]
    }
  ];

  const education = resume.education?.length > 0 ? resume.education : [
    {
      degree: "MBA, Marketing & Strategy",
      institution: "Stanford Graduate School of Business",
      location: "Stanford, CA",
      graduation_year: "2012"
    }
  ];

  const skills = resume.skills?.length > 0 ? resume.skills.map(s => typeof s === 'string' ? s : (s.name || s.skill || 'Skill')) : [
    "Customer Experience Strategy",
    "Digital Transformation",
    "Voice of Customer (VoC)",
    "Journey Mapping"
  ];

  const achievements = [
    { icon: Award, text: "Increased Customer Retention", detail: "+14% YoY" },
    { icon: Briefcase, text: "Managed Cross-Functional Teams", detail: "35+ Members" },
    { icon: Award, text: "Customer Satisfaction", detail: "92 NPS Score" }
  ];

  const languages = resume.languages?.length > 0 ? resume.languages : [
    { language: "English", proficiency: 100 },
    { language: "Spanish", proficiency: 75 }
  ];

  const interests = resume.interests?.length > 0 ? resume.interests.map(i => typeof i === 'string' ? i : (i.name || i.interest || 'Interest')) : ["Customer Psychology", "Innovation", "Public Speaking"];

  const training = resume.certificates?.length > 0 
    ? resume.certificates.map(c => typeof c === 'string' ? c : (c.name || c.title || c.certificate || 'Certificate'))
    : ["Certified Customer Experience Professional (CCXP) - 2019"];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div 
      className="w-[210mm] min-h-[297mm] mx-auto" 
      style={{ 
        fontFamily, 
        lineHeight,
        backgroundColor
      }}
    >
      <div className="flex h-full">
        {/* LEFT COLUMN - 65% */}
        <div className="w-[65%] px-10 py-10 pr-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1.5">{personal.full_name}</h1>
            <p 
              className="text-lg font-semibold mb-3"
              style={{ color: primaryColor }}
            >
              {personal.professional_title}
            </p>
            
            <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-4">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{personal.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>{personal.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{personal.location}</span>
              </div>
              {personal.linkedin && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{personal.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          {personal.summary && (
            <div className="mb-6">
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide">Professional Summary</h2>
              <p className="text-xs text-gray-700 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wide">Work Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                        <p className="text-xs font-semibold" style={{ color: primaryColor }}>{exp.company}</p>
                      </div>
                      <span className="text-[10px] text-gray-500 whitespace-nowrap ml-3">
                        {formatDate(exp.start_date)} - {exp.current ? 'Present' : formatDate(exp.end_date)}
                      </span>
                    </div>
                    {exp.bullets?.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-xs text-gray-700">
                        {exp.bullets.map((bullet, bidx) => (
                          <li key={bidx} className="leading-relaxed">{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wide">Languages</h2>
              <div className="space-y-2.5">
                {languages.map((lang, idx) => {
                  const langName = typeof lang === 'string' ? lang : (lang.language || 'Language');
                  const langProf = typeof lang === 'object' ? (lang.proficiency || 50) : 50;
                  return (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-xs font-semibold text-gray-900">{langName}</span>
                        <span className="text-[10px] text-gray-500">{langProf}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ 
                            width: `${langProf}%`,
                            backgroundColor: primaryColor
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - 35% */}
        <div className="w-[35%] bg-gray-50 px-6 py-10 pl-6">
          {/* Key Achievements */}
          <div className="mb-6 bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Key Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <achievement.icon className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{achievement.text}</p>
                    <p className="text-[10px] font-bold" style={{ color: primaryColor }}>{achievement.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 mb-2.5 uppercase tracking-wide">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] px-2.5 py-1 bg-white rounded-full text-gray-700 font-medium shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 mb-2.5 uppercase tracking-wide">Education</h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-xs font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-xs font-semibold" style={{ color: primaryColor }}>{edu.institution}</p>
                    <p className="text-[10px] text-gray-500">{edu.graduation_year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Training & Courses */}
          {training.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 mb-2.5 uppercase tracking-wide">Training & Courses</h2>
              <ul className="space-y-1.5">
                {training.map((course, idx) => (
                  <li key={idx} className="text-[10px] text-gray-700 leading-relaxed">{course}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-2.5 uppercase tracking-wide">Interests</h2>
              <div className="flex flex-wrap gap-1.5">
                {interests.map((interest, idx) => (
                  <span 
                    key={idx} 
                    className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                    style={{ 
                      backgroundColor: `${primaryColor}20`,
                      color: primaryColor
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}