import React from "react";
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react";

export default function HorizonExecutive({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#3B82F6";
  const secondaryColor = customization.secondary_color || "#8B5CF6";
  const fontFamily = customization.font_family || "Georgia, serif";
  const lineHeight = customization.line_height || 1.6;

  const personal = resume.personal_info || {};
  const experience = resume.experience || [];
  const education = resume.education || [];
  const skills = resume.skills || [];
  const languages = resume.languages || [];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div 
      className="w-[210mm] min-h-[297mm] mx-auto bg-white" 
      style={{ fontFamily, lineHeight }}
    >
      {/* Gradient Header */}
      <div 
        className="px-12 py-10"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
        }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">{personal.full_name || "Your Name"}</h1>
        <p className="text-xl text-white/90 mb-6">{personal.professional_title || "Professional Title"}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-white/90">
          {personal.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{personal.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-12 py-10">
        {/* Summary */}
        {personal.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
              Executive Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 pl-6" style={{ borderColor: primaryColor }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-sm font-semibold text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(exp.start_date)} - {exp.current ? 'Present' : formatDate(exp.end_date)}
                    </span>
                  </div>
                  {exp.bullets?.length > 0 && (
                    <ul className="space-y-1.5">
                      {exp.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                          <span className="text-gray-400">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.graduation_year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                Core Competencies
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
                  return (
                    <span 
                      key={idx} 
                      className="text-xs px-3 py-1.5 rounded-full text-white font-medium"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {skillName}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}