import React from "react";

export default function Harbor({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#475569";
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
      className="w-[210mm] min-h-[297mm] mx-auto bg-gray-100 p-8" 
      style={{ fontFamily, lineHeight }}
    >
      <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg p-12">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal.full_name || "Your Name"}</h1>
          <p className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>
            {personal.professional_title || "Professional Title"}
          </p>
          
          <div className="flex justify-center gap-3 text-sm text-gray-600">
            {personal.email && <span>{personal.email}</span>}
            {personal.email && personal.phone && <span>•</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.phone && personal.location && <span>•</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </div>

        {/* Summary */}
        {personal.summary && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
              Work Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
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
                    <ul className="space-y-1.5 mt-2">
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
        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-sm" style={{ color: primaryColor }}>{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.graduation_year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                Key Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
                  return (
                    <div key={idx} className="bg-gray-50 px-3 py-2 rounded text-xs text-gray-700">
                      {skillName}
                    </div>
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