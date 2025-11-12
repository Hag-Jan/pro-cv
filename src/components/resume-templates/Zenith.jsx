import React from "react";

export default function Zenith({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#64748B";
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
      className="w-[210mm] min-h-[297mm] mx-auto bg-gray-50 px-14 py-12" 
      style={{ fontFamily, lineHeight }}
    >
      <div className="bg-white rounded-lg shadow-sm p-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-light text-gray-900 mb-2">{personal.full_name || "Your Name"}</h1>
          <p className="text-lg text-gray-600 mb-4">{personal.professional_title || "Professional Title"}</p>
          
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {personal.email && <span>{personal.email}</span>}
            {personal.email && personal.phone && <span className="text-gray-400">•</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.phone && personal.location && <span className="text-gray-400">•</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </div>

        {/* Summary */}
        {personal.summary && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide" style={{ color: primaryColor }}>
              ABOUT
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide" style={{ color: primaryColor }}>
              EXPERIENCE
            </h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(exp.start_date)} - {exp.current ? 'Present' : formatDate(exp.end_date)}
                    </span>
                  </div>
                  {exp.bullets?.length > 0 && (
                    <ul className="space-y-1.5 mt-2">
                      {exp.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="text-sm text-gray-700 leading-relaxed pl-4" style={{ textIndent: "-1rem" }}>
                          — {bullet}
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
        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide" style={{ color: primaryColor }}>
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-sm font-semibold text-gray-900">{edu.degree}</p>
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
              <h2 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide" style={{ color: primaryColor }}>
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
                  return (
                    <span 
                      key={idx} 
                      className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700"
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