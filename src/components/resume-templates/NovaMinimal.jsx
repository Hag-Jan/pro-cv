import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function NovaMinimal({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#374151";
  const fontFamily = customization.font_family || "Inter, system-ui, sans-serif";
  const lineHeight = customization.line_height || 1.7;

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
      className="w-[210mm] min-h-[297mm] mx-auto bg-white px-16 py-14" 
      style={{ fontFamily, lineHeight }}
    >
      {/* Header - Centered */}
      <div className="text-center mb-10 pb-8 border-b border-gray-200">
        <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
          {personal.full_name || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mb-4">{personal.professional_title || "Professional Title"}</p>
        
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          {personal.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{personal.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-10 pb-8 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-10 pb-8 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {formatDate(exp.start_date)} – {exp.current ? 'Present' : formatDate(exp.end_date)}
                  </span>
                </div>
                {exp.bullets?.length > 0 && (
                  <ul className="space-y-1.5 mt-3">
                    {exp.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="text-sm text-gray-700 leading-relaxed pl-4" style={{ textIndent: "-1rem" }}>
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-10 pb-8 border-b border-gray-200">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx}>
                <p className="text-base font-semibold text-gray-900">{edu.degree}</p>
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
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Skills</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {skills.map((skill, idx) => {
              const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
              return (
                <span key={idx} className="text-sm text-gray-700">
                  {skillName}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}