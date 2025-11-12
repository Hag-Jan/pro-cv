import React from "react";
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react";

export default function SummitProfessional({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#2563EB";
  const fontFamily = customization.font_family || "Inter, system-ui, sans-serif";
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
      className="w-[210mm] min-h-[297mm] mx-auto bg-gray-50 p-10" 
      style={{ fontFamily, lineHeight }}
    >
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal.full_name || "Your Name"}</h1>
        <p className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
          {personal.professional_title || "Professional Title"}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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

      {/* Summary Card */}
      {personal.summary && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
        </div>
      )}

      {/* Experience Card */}
      {experience.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Briefcase className="w-5 h-5" style={{ color: primaryColor }} />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Work Experience
            </h2>
          </div>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-sm font-semibold" style={{ color: primaryColor }}>{exp.company}</p>
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

      {/* Two Column Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Education Card */}
        {education.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5" style={{ color: primaryColor }} />
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Education
              </h2>
            </div>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-sm" style={{ color: primaryColor }}>{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.graduation_year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Card */}
        {skills.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => {
                const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
                return (
                  <span 
                    key={idx} 
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
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
  );
}